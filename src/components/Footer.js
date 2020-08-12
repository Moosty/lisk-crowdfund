import React from "react";

export const Footer = (props) => {
  return (
    <div>
      <div
        className="w-full flex-auto h-full"
        style={{ backgroundColor: "#262b38" }}
      >
        <div className="flex flex-row p-4">
          <div className="flex w-1/3 text-white">column 1</div>
          <div className="flex w-1/3 text-white">column 2</div>
          <div className="flex w-1/3 text-white">column 3</div>
        </div>
      </div>
    </div>
  );
};
