import React, { useContext } from "react";
import moment from 'moment';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { withRouter } from 'react-router-dom'

import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { ProgressSection } from "..";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { ProjectImage } from "../ProjectImage";
import AppContext from "../../AppContext";
import { fromTimeStamp } from "../../utils/time";
import { config } from "../../config";
import { getNow } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 380,
    margin: 10,
    minWidth: 380,
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#fff",
  },
  title: {
    color: "#f50057",
  },
}));

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

export const SingleCard = withRouter((props) => {
  const classes = useStyles();

  const {epoch} = useContext(AppContext);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img src="https://avatar.lisk.ws/1234567890L"/>
          </Avatar>
        }
        title={props.username ? props.username : ""}
        subheader={moment(fromTimeStamp(epoch, props.start)).fromNow()}
      />
      <ProjectImage
        onClick={() => props.history.push(`/crowdfund/${props.publicKey}`)}
        height='300px'
        width='100%'
        image={props.image.type}
        className="" style={{backgroundColor: props.image.color}}/>
      <CardContent>
        <Chip
          className="mb-4"
          variant="outlined"
          size="small"
          style={{letterSpacing: 2}}
          color="primary"
          label={props.category.toUpperCase()}
        />
        <h1 className="font-medium">{props.title}</h1>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.text && props.text.length > 100 ? `${props.text.substr(0, 100)}...` : props.text}
        </Typography>
        {props.state !== 'funded' && props.state !== "failed" && props.start <= getNow(epoch) && props.start + config.periodLength > getNow(epoch) && (
          <div>
            <ProgressSection crowdfund={props.publicKey}/>
          </div>
        )}
        {props.start > getNow(epoch) && (
          <div className="flex flex-col w-full text-center align-middle items-center mt-4">
            <StarBorderIcon style={{fontSize: "30px"}}/>
            <span
              className="font-bold text-2xl text-teal-800 mt-2"
              style={{color: "#f50057"}}
            >
              {props.goal && props.goal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}CFT
            </span>

            <span className="font-bold w-full ">
              <AccessTimeIcon
                style={{fontSize: "18px"}}/>Starts {moment(fromTimeStamp(epoch, props.start + config.periodLength)).fromNow()}
            </span>
          </div>
        )}

        {props.state === "failed" && (
          <div className="flex flex-col w-full text-center align-middle items-center mt-4">
            <span
              className="font-bold text-2xl text-teal-800 mt-4"
              style={{color: "#f50057"}}
            >
              CLOSED
            </span>
          </div>
        )}

        {props.state === 'funded' && (
          <div className="flex flex-col w-full text-center align-middle items-center mt-4">
            <span
              className="font-bold text-2xl text-teal-800 mt-4"
              style={{color: "#f50057"}}
            >
              Project funded await start project
            </span>
          </div>
        )}

        {props.startProject > -1 && (
          <div>
            <div className="flex flex-col w-full mt-4 content-end">
              <div className="w-full flex flex-row space justify-between">
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <div className="text-sm text-gray-700">
                      Project Duration:
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <h1>{props.currentPeriod}/</h1>
                    <h1 className="font-bold">{props.periods} months</h1>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="text-sm text-gray-700">Total Raised:</div>
                  <span className="">{props.goal && props.goal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}CFT</span>
                </div>
              </div>
              <div className="mt-2">
                <BorderLinearProgress variant="determinate" value={50}/>
              </div>
              <div className="flex lg:flex-row mt-4">
                <div className="flex flex-row w-full">
                  <div className="font-bold text-right w-full ">
                    {props.nextVote > new Date() && <div className="flex flex-row w-full text-center align-middle justify-between items-center">
                      <span className="text-sm text-gray-700">
                        Next vote in:{" "}
                      </span>
                      <span>
                        <AccessTimeIcon style={{fontSize: "18px"}}/>{moment(props.nextVote).fromNow()}
                      </span>
                    </div>}
                    {props.nextVote <= new Date() && props.endVote >= new Date() && <div className="flex flex-row w-full text-center align-middle justify-between items-center">
                      <span className="text-sm text-gray-700">
                        Voting active
                      </span>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
});
