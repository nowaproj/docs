import React from "react";
import OriginalCategory from "@theme-original/DocSidebarItem/Category";

export default function DocSidebarItemCategory(props) {
  const { item } = props;

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

  return <OriginalCategory {...props} label={label} />;
}
