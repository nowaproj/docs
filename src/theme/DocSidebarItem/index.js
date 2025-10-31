import React from "react";
import OriginalDocSidebarItem from "@theme-original/DocSidebarItem";

export default function DocSidebarItem(props) {
  const { item } = props;

  if (item?.customProps?.icon) {
    return (
      <OriginalDocSidebarItem
        {...props}
        label={
          <>
            {item.label}
            <i
              className={item.customProps.icon}
              style={{
                color: item.customProps.color || "#3FCF8E",
                fontSize: "0.9em",
                marginLeft: "6px",
              }}
              aria-hidden="true"
            />
          </>
        }
      />
    );
  }

  return <OriginalDocSidebarItem {...props} />;
}
