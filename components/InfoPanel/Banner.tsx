import React from "react";

export default function Banner(props: any) {
  return (
    <div className={props.className}>
      <p>
        <strong>{props.title}:</strong> <span>{props.value}</span>
      </p>
    </div>
  );
}
