import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import Typography from '@material-ui/core/Typography';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineContent from '@material-ui/lab/TimelineContent';
import Paper from '@material-ui/core/Paper';
import RepeatIcon from '@material-ui/icons/Repeat';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const UpdateEnd = (props) => {

  const classes = useStyles();

  return <div>
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot color="secondary">
        <RepeatIcon />
      </TimelineDot>
    </TimelineSeparator>
    <TimelineContent>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6" component="h1">
          Completed
        </Typography>
        <Typography>Because this is the life you love!</Typography>
      </Paper>
    </TimelineContent>
  </TimelineItem>

</div>;
}
