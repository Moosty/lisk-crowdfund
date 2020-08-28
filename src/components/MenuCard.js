import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { CrowdfundStatus } from "app/components/card/crowdfund/Status";
import { utils } from '@liskhq/lisk-transactions';
const { convertBeddowsToLSK, convertLSKToBeddows } = utils;

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    backgroundColor: "#edf2f7",
  }),
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    marginTop: 8,
    marginBottom: 8,
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

export const MenuCard = (props) => {
  const classes = useStyles(props);
  return (
    <div className="px-4 py-2">
      {props.type === "investment" && (
        <div>
          <div className="flex flex-row w-full  items-center">
            <div className="w-full flex flex-row h-full items-center	">
              <Avatar
                className="mr-4"
                alt="Remy Sharp"
                src="/images/pexels-photo-3951901.jpeg"
              />
              <div className="flex flex-col">
                <span style={{color: "#f50057", fontWeight: "bold"}}>
                  {props.title}
                </span>
                <span style={{color: "#9a9a9a", fontSize: "14px"}}>
                  {props.investment && convertBeddowsToLSK(props.investment)}CFT
                </span>
              </div>
            </div>

          </div>
          <div className="">
            <CrowdfundStatus sidebar wallet={props.wallet} crowdfund={props.crowdfund}/>
          </div>
          <Divider/>
        </div>
      )}

      {props.type === "crowdfund" && (
        <div>
          <div className="flex flex-row w-full  items-center">
            <div className="w-full flex flex-row h-full items-center	">
              <Avatar
                className="mr-4"
                alt="Remy Sharp"
                src="/images/pexels-photo-3951901.jpeg"
              />
              <div className="flex flex-col">
                <span style={{color: "#f50057", fontWeight: "bold"}}>
                  {props.title}
                </span>
              </div>
            </div>

          </div>
          <div className="">
            <CrowdfundStatus sidebar wallet={props.wallet} crowdfund={props.crowdfund}/>
          </div>
          <Divider/>
        </div>
      )}

      {props.type === "voteItem" && (
        <div>
          <div className="flex flex-row w-full  items-center">
            <div className="w-full flex flex-row h-full items-center	">
              <Avatar
                className="mr-4"
                alt="Remy Sharp"
                src="/images/pexels-photo-3951901.jpeg"
              />
              <div className="flex flex-col">
                <span style={{color: "#f50057", fontWeight: "bold"}}>
                  {props.title}
                </span>
                <span style={{color: "#9a9a9a", fontSize: "12px"}}>
                  Current moment: 2/12 Months
                </span>
              </div>
            </div>
            <div className=" w-1/4 flex flex-col justify-end px-4"/>
          </div>
          <span
            className="text-center"
            style={{color: "#9a9a9a", fontSize: "12px"}}
          />
          <BorderLinearProgress my-variant="determinate" value={15}/>
          <Divider/>
        </div>
      )}

      {props.type === "project" && (
        <div>
          <div className="flex flex-row w-full  items-center">
            <div className="w-full flex flex-row h-full items-center	">
              <Avatar
                className="mr-4"
                alt="Remy Sharp"
                src="/images/pexels-photo-3951901.jpeg"
              />
              <div className="flex flex-col">
                <span style={{color: "#f50057", fontWeight: "bold"}}>
                  {props.title}
                </span>
                <span style={{color: "#9a9a9a", fontSize: "12px"}}>
                  {props.month}
                </span>
              </div>
            </div>
            <div className=" w-1/4 flex flex-col justify-end px-4">
              <Button size="small" variant="contained" color="secondary">
                Vote
              </Button>
            </div>
          </div>
          <BorderLinearProgress my-variant="determinate" value={50}/>
          <Divider/>
        </div>
      )}
    </div>
  );
};
