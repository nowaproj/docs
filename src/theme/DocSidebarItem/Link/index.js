import React from "react";
import OriginalLink from "@theme-original/DocSidebarItem/Link";

export default function DocSidebarItemLink(props) {
  const { item } = props;

  // label + ikon egymás mellett
  const label = (
    <>
      {item.label}
      {item?.customProps?.icon && (
        <i
          className={item.customProps.icon}
          style={{
            marginLeft: 6,
            fontSize: "0.9em",
            color: item.customProps.color || "#3FCF8E",
            verticalAlign: "middle",
          }}
          aria-hidden="true"
        />
      )}
    </>
  );

  return <OriginalLink {...props} label={label} />;
}
