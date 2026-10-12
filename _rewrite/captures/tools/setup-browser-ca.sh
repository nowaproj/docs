#!/usr/bin/env bash
# Makes Chromium trust the session's HTTPS proxy CA, so pages that load fonts
# from fonts.gstatic.com work without disabling TLS verification.
#
# Chromium on Linux reads extra trust anchors from the user NSS database
# ($HOME/.pki/nssdb). This imports every certificate in the proxy CA bundle
# into it with the "trusted CA for TLS" flag. Safe to run more than once.
set -euo pipefail

CA_FILE="${1:-/root/.ccr/agent-proxy-ca.crt}"
NSSDB="sql:${HOME}/.pki/nssdb"

if [ ! -f "$CA_FILE" ]; then
  echo "No proxy CA at $CA_FILE: nothing to import (no intercepting proxy in this session?)."
  exit 0
fi

if ! command -v certutil >/dev/null 2>&1; then
  echo "certutil missing, installing libnss3-tools..."
  apt-get install -y --no-install-recommends libnss3-tools >/dev/null 2>&1 \
    || { apt-get update >/dev/null 2>&1 && apt-get install -y --no-install-recommends libnss3-tools >/dev/null; }
fi

mkdir -p "${HOME}/.pki/nssdb"
if [ ! -f "${HOME}/.pki/nssdb/cert9.db" ]; then
  certutil -N -d "$NSSDB" --empty-password
fi

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
# Split the bundle into one PEM file per certificate.
awk -v dir="$tmp" '/BEGIN CERTIFICATE/{n++} n{print > (dir "/cert" n ".pem")}' "$CA_FILE"

i=0
for pem in "$tmp"/cert*.pem; do
  i=$((i + 1))
  nick="ccr-agent-proxy-ca-$i"
  certutil -D -d "$NSSDB" -n "$nick" >/dev/null 2>&1 || true
  certutil -A -d "$NSSDB" -t "C,," -n "$nick" -i "$pem"
done

echo "Imported $i proxy CA certificate(s) into ${HOME}/.pki/nssdb:"
certutil -L -d "$NSSDB" | grep ccr-agent-proxy-ca || true
