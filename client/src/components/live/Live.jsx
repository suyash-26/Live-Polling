import React from "react";
import ControlFlow from "./ControlFlow";
import Preview from "./Preview";

export default function Live() {
  return (
    <div className="">
      <div className="live-header bg-[#1D2432] p-2 md:p-8 mt-5">
        <div className="join-options-tab">
          <p className="title text-[8px] md:text-xs">QR Code</p>
          <button className="p-1 md:p-3 bg-[#282F3C] mt-1 text-xs md:text-base rounded">Download QR</button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1">
          <ControlFlow />
        </div>
        <div className="flex-1">
          <Preview />
        </div>
      </div>
    </div>
  );
}
