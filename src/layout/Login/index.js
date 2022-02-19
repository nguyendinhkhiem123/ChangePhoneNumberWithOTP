import React from "react";

export default function LayoutLogin({children}) {
  return (
    <div className="grid grid-cols-2 h-full w-full">
      <img
        src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
        alt="img"
        className="h-full"
      />
      <div className="px-10 flex justify-center items-center">
          {children}
      </div>
    </div>
  );
}
