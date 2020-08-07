import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import Typography from '@material-ui/core/Typography';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineContent from '@material-ui/lab/TimelineContent';
import Paper from '@material-ui/core/Paper';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import ThumbsUpDownRoundedIcon from '@material-ui/icons/ThumbsUpDownRounded';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';

//* Update Component *//
//* start (moment of going live), comment, claim, vote, end (project closing) *//


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const Update = (props) => {

  const classes = useStyles();

  return <div>
  <TimelineItem>
    <TimelineOppositeContent>
      <Typography variant="body2" color="textSecondary">
        {props.time}
      </Typography>
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot color="secondary">
        {props.type === 'comment' && <ChatRoundedIcon />}
        {props.type === 'vote' && <ThumbsUpDownRoundedIcon />}
        {props.type === 'claim' && <AttachMoneyRoundedIcon />}
      </TimelineDot>
      {props.connector && ( <TimelineConnector /> )}
    </TimelineSeparator>
    <TimelineContent>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6" component="h1">
          {props.title}
        </Typography>
        <Typography>{props.content}</Typography>
      </Paper>
    </TimelineContent>
  </TimelineItem>

</div>;
}
