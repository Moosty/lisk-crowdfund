import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import Typography from '@material-ui/core/Typography';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineContent from '@material-ui/lab/TimelineContent';
import Paper from '@material-ui/core/Paper';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import ThumbsUpDownRoundedIcon from '@material-ui/icons/ThumbsUpDownRounded';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
//* Update Component *//
//* start (moment of going live), comment, claim, vote, end (project closing) *//


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
}));

export const Update = ({time, type, connector, title, content, relative}) => {

  const classes = useStyles();

  return <TimelineItem>
      <TimelineOppositeContent>
        <Typography variant="body2" color="textSecondary">
          {relative ? moment(time).fromNow() : time.toLocaleString()}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot
          color={type === "comment" ? '' : type === 'vote' ? 'primary' : type === "claim" ? 'secondary' : "#000"}>
          {type === 'start' && <PlayCircleFilledWhiteIcon/>}
          {type === 'comment' && <ChatRoundedIcon/>}
          {type === 'vote' && <ThumbsUpDownRoundedIcon/>}
          {type === 'claim' && <AttachMoneyRoundedIcon/>}
        </TimelineDot>
        {connector && (<TimelineConnector/>)}
      </TimelineSeparator>
      <TimelineContent>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h6" component="h1">
            {title}
          </Typography>
          <Typography>{content}</Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>;
}
