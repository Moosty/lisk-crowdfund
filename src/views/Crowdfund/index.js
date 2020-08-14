import React from "react";

import { TopBar, TimelineVertical, ProjectInfo } from "../../components";

export const Crowdfund = (props) => {
  return (
    <div>
      <TopBar />
      <div className="bg-fixed sm:bg-scroll lg:m-5 pt-10">
        <div className="w-full mx-auto px-5 h-full flex flex-col lg:px-0 lg:w-4/6 lg:flex-row">
          <div
            className="w-full bg-contain lg:w-3/4  lg:bg-cover"
            style={{
              backgroundImage: "url(/images/pexels-photo-3951901.jpeg)",
            }}
          ></div>
          <img
            src="/images/pexels-photo-3951901.jpeg"
            className="w-full my-5 lg:hidden"
          />
          <div
            className="w-full lg:w-3/4 lg:pt-0 lg:px-12 lg:p-10"
            style={{ backgroundColor: "white" }}
          >
            <h1 className="my-8"> Project Timeline </h1>
            <ProjectInfo />
          </div>
        </div>

        <div className=" w-full px-5 lg:px-0 lg:w-4/6 mx-auto h-full flex flex-col lg:flex-row">
          <TimelineVertical />
        </div>
      </div>
    </div>
  );
};
