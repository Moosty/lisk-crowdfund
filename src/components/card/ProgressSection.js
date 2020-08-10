import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 20,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);
export const ProgressSection = (props) => {
  return (
    <div className="flex flex-col w-full mt-4 content-end">
      <div className="w-full flex flex-row space justify-between">
        <div className="flex flex-row">
          <h1>€307,409 EUR /</h1>
          <h1 className="font-bold">€700,000 EUR</h1>
        </div>

        <div>755 Backers</div>
      </div>
      <div className="mt-2">
        <BorderLinearProgress variant="determinate" value={50} />
      </div>
      <div className="flex lg:flex-row mt-4">
        <div className="flex flex-row w-full">
          <Button
            className=" "
            size="small"
            variant="contained"
            color="primary"
            style={{ marginRight: 10 }}
          >
            Back it
          </Button>
          <Button
            className=""
            size="small"
            variant="contained"
            color="secondary"
          >
            Follow
          </Button>
        </div>
        <div className="flex flex-row w-full">
          <span className="font-bold p-2 text-right w-full ">
            {" "}
            <AccessTimeIcon style={{ fontSize: "18px" }} /> 40 days left
          </span>
        </div>
      </div>
    </div>
  );
};
