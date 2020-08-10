import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";

import Button from "@material-ui/core/Button";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { ProgressSection } from "..";
import StarBorderIcon from "@material-ui/icons/StarBorder";

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

export const SingleCard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img src="https://avatar.lisk.ws/1234567890L" />
          </Avatar>
        }
        title="Raphael"
        subheader="September 14, 2020"
      />
      <CardMedia
        className={classes.media}
        image={props.image}
        title="Paella dish"
      />
      <CardContent>
        <Chip
          className="mb-4"
          variant="outlined"
          size="small"
          style={{ letterSpacing: 2 }}
          color="primary"
          label={props.category}
        />
        <h1 className="font-medium">{props.title}</h1>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.text}
        </Typography>
        {props.type === "crowdfund" && (
          <div>
            <ProgressSection />
          </div>
        )}
        {props.type === "upcoming" && (
          <div className="flex flex-col w-full text-center align-middle items-center mt-4">
            <StarBorderIcon style={{ fontSize: "30px" }} />
            <span
              className="font-bold text-2xl text-teal-800 mt-4"
              style={{ color: "#f50057" }}
            >
              180.000LSK
            </span>

            <span className="font-bold p-2 w-full ">
              <AccessTimeIcon style={{ fontSize: "18px" }} /> Starts in 7 days
            </span>
          </div>
        )}

        {props.type === "closed" && (
          <div className="flex flex-col w-full text-center align-middle items-center mt-4">
            <span
              className="font-bold text-2xl text-teal-800 mt-4"
              style={{ color: "#f50057" }}
            >
              CLOSED
            </span>
          </div>
        )}

        {props.type === "project" && (
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
                    <h1>12/</h1>
                    <h1 className="font-bold">24 months</h1>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="text-sm text-gray-700">Total Raised:</div>
                  <span className="">€150.540</span>
                </div>
              </div>
              <div className="mt-2">
                <BorderLinearProgress variant="determinate" value={50} />
              </div>
              <div className="flex lg:flex-row mt-2">
                <div className="flex flex-row w-full">
                  <div className="font-bold text-right w-full ">
                    {" "}
                    <div className="flex flex-row w-full text-center align-middle justify-between items-center">
                      <span className="text-sm text-gray-700">
                        Next vote in:{" "}
                      </span>
                      <span>
                        <AccessTimeIcon style={{ fontSize: "18px" }} /> 12 days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
