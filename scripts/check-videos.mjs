import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const docsDirectory = path.join(repositoryRoot, 'docs');
const staticDirectory = path.join(repositoryRoot, 'static');
const errors = [];

function walk(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function lineNumber(content, index) {
  return content.slice(0, index).split('\n').length;
}

function attribute(markup, name) {
  return markup.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`, 'i'))?.[1];
}

function report(location, message) {
  errors.push(`${location}: ${message}`);
}

function frameRate(value) {
  const [numerator, denominator = '1'] = value.split('/').map(Number);
  return denominator === 0 ? Number.POSITIVE_INFINITY : numerator / denominator;
}

function mp4HasFastStart(filePath) {
  const file = fs.openSync(filePath, 'r');
  const fileSize = fs.fstatSync(file).size;
  let offset = 0;
  let moovOffset;
  let mdatOffset;

  try {
    while (offset + 8 <= fileSize) {
      const header = Buffer.alloc(16);
      const bytesRead = fs.readSync(file, header, 0, 16, offset);
      if (bytesRead < 8) break;

      let boxSize = header.readUInt32BE(0);
      const boxType = header.toString('ascii', 4, 8);
      let headerSize = 8;

      if (boxSize === 1) {
        if (bytesRead < 16) break;
        boxSize = Number(header.readBigUInt64BE(8));
        headerSize = 16;
      } else if (boxSize === 0) {
        boxSize = fileSize - offset;
      }

      if (boxSize < headerSize || offset + boxSize > fileSize) break;
      if (boxType === 'moov') moovOffset = offset;
      if (boxType === 'mdat') mdatOffset = offset;
      if (moovOffset !== undefined && mdatOffset !== undefined) break;
      offset += boxSize;
    }
  } finally {
    fs.closeSync(file);
  }

  return moovOffset !== undefined && mdatOffset !== undefined && moovOffset < mdatOffset;
}

try {
  execFileSync('ffprobe', ['-version'], {stdio: 'ignore'});
} catch {
  console.error('Video validation requires ffprobe. Install FFmpeg and try again.');
  process.exit(1);
}

const staticFiles = walk(staticDirectory).map((filePath) =>
  toPosix(path.relative(staticDirectory, filePath)),
);
const exactStaticFiles = new Set(staticFiles);
const staticFilesByLowercase = new Map(
  staticFiles.map((filePath) => [filePath.toLowerCase(), filePath]),
);
const referencedVideos = new Map();
let videoEmbedCount = 0;

for (const documentPath of walk(docsDirectory).filter((filePath) => /\.mdx?$/.test(filePath))) {
  const content = fs.readFileSync(documentPath, 'utf8');
  const relativeDocumentPath = toPosix(path.relative(repositoryRoot, documentPath));
  const videoPattern = /<video\b([^>]*?)(?:\/>|>([\s\S]*?)<\/video>)/gi;
  let parsedVideoCount = 0;

  for (const match of content.matchAll(videoPattern)) {
    parsedVideoCount += 1;
    videoEmbedCount += 1;
    const location = `${relativeDocumentPath}:${lineNumber(content, match.index)}`;
    const videoAttributes = match[1];
    const videoBody = match[2] ?? '';

    if (attribute(videoAttributes, 'src')) {
      report(location, 'put the media URL in one nested <source> element, not on <video>');
    }
    if (!/\bcontrols\b/i.test(videoAttributes)) {
      report(location, 'the <video> element must include controls');
    }
    if (!/\bplaysInline\b/i.test(videoAttributes)) {
      report(location, 'the <video> element must include playsInline');
    }
    if (attribute(videoAttributes, 'preload') !== 'metadata') {
      report(location, 'the <video> element must use preload="metadata"');
    }

    const sources = [...videoBody.matchAll(/<source\b[^>]*>/gi)];
    if (sources.length !== 1) {
      report(location, `expected exactly one <source> element, found ${sources.length}`);
      continue;
    }

    const sourceMarkup = sources[0][0];
    const sourcePath = attribute(sourceMarkup, 'src');
    const sourceType = attribute(sourceMarkup, 'type');

    if (!sourcePath) {
      report(location, 'the <source> element is missing src');
      continue;
    }
    if (sourcePath.includes('\\')) {
      report(location, `use forward slashes in video URL ${sourcePath}`);
      continue;
    }
    if (!sourcePath.startsWith('/')) {
      report(location, `video URL must be root-relative: ${sourcePath}`);
      continue;
    }
    if (!sourcePath.toLowerCase().endsWith('.mp4')) {
      report(location, `only MP4 video sources are supported: ${sourcePath}`);
    }
    if (sourceType !== 'video/mp4') {
      report(location, `expected type="video/mp4" for ${sourcePath}`);
    }

    const staticPath = sourcePath.slice(1);
    if (!exactStaticFiles.has(staticPath)) {
      const caseMatch = staticFilesByLowercase.get(staticPath.toLowerCase());
      report(
        location,
        caseMatch
          ? `filename case does not match: ${sourcePath} (actual: /${caseMatch})`
          : `video file does not exist: ${sourcePath}`,
      );
      continue;
    }

    referencedVideos.set(staticPath, location);
  }

  const declaredVideoCount = (content.match(/<video\b/gi) ?? []).length;
  if (declaredVideoCount !== parsedVideoCount) {
    report(relativeDocumentPath, 'contains an unclosed or malformed <video> element');
  }
}

for (const [staticPath, location] of referencedVideos) {
  const filePath = path.join(staticDirectory, staticPath);
  let media;

  try {
    media = JSON.parse(
      execFileSync(
        'ffprobe',
        [
          '-v',
          'error',
          '-show_entries',
          'format=format_name:stream=codec_type,codec_name,profile,pix_fmt,level,width,height,r_frame_rate',
          '-of',
          'json',
          filePath,
        ],
        {encoding: 'utf8'},
      ),
    );
  } catch (error) {
    report(location, `ffprobe could not read /${staticPath}: ${error.message}`);
    continue;
  }

  if (!media.format?.format_name?.split(',').includes('mp4')) {
    report(location, `/${staticPath} is not an MP4 container`);
  }

  const videoStreams = media.streams.filter((stream) => stream.codec_type === 'video');
  const audioStreams = media.streams.filter((stream) => stream.codec_type === 'audio');
  if (videoStreams.length !== 1) {
    report(location, `/${staticPath} must contain exactly one video stream`);
    continue;
  }

  const video = videoStreams[0];
  if (video.codec_name !== 'h264') report(location, `/${staticPath} must use H.264 video`);
  if (video.profile !== 'High') report(location, `/${staticPath} must use H.264 High Profile`);
  if (video.level > 41) report(location, `/${staticPath} exceeds H.264 Level 4.1`);
  if (video.pix_fmt !== 'yuv420p') report(location, `/${staticPath} must use yuv420p pixel format`);
  if (video.width > 1920 || video.height > 1080) {
    report(location, `/${staticPath} exceeds 1920x1080`);
  }
  if (frameRate(video.r_frame_rate) > 30.01) {
    report(location, `/${staticPath} exceeds 30 fps`);
  }

  for (const audio of audioStreams) {
    if (audio.codec_name !== 'aac' || audio.profile !== 'LC') {
      report(location, `/${staticPath} audio must use AAC-LC`);
    }
  }

  if (!mp4HasFastStart(filePath)) {
    report(location, `/${staticPath} is not optimized for fast start`);
  }
}

if (errors.length > 0) {
  console.error(`Video validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated ${videoEmbedCount} video embed(s) and ${referencedVideos.size} unique MP4 file(s).`,
);
