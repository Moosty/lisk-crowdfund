import { Avatar, CardHeader } from "@material-ui/core";
import React from "react";

export const Comment = (props) => {
  return (
    <div>
      <div className="rounded-lg bg-white w-full p-4 fex flex-col my-2">
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          title="Henkie Botsie"
          subheader="September 14, 2016"
        />
        <span className="ml-4">
          Hallo , wat een verdomd lekkere comment is dit dan !
        </span>
      </div>
    </div>
  );
};
