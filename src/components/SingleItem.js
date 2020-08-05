import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "100%",
    marginBottom: 10,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 20,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export const SingleItem = (props) => {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <div className="w-full mb-6 p-4 mx-auto flex flex-row h-full m-4 ">
    <Paper className="w-9/12 mb-6 p-4 mx-auto flex flex-col h-full m-4 ">

                <div className=" flex h-full items-center flex-row mb-4">
                  <ListItemAvatar>
                  <Avatar

                src={props.src}
                />
                  </ListItemAvatar>
                  <ListItemText
                    primary={props.title}
                    secondary={props.subtitle}
                  />

                    <Button variant="contained" color="secondary">Vote</Button>
                  </div>
                  <BorderLinearProgress variant="determinate" value={50} />




    </Paper>
    {(props.type === 'investment') && (
    <Card className="w-3-12 my-5 bg-gray-100">

    <CardHeader
      avatar={
        <Avatar aria-label="recipe" className={classes.avatar}>
          R
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title="1.500 LSK / 1.252.889 LSK"
      subheader="2.6% / 100%"
    />
    <div className=" w-2/4 mx-auto flex flex-row justify-between">
    <Button size="small" variant="contained" color="secondary">Vote</Button>
    <Button size="small" variant="outlined" color="secondary">Refund</Button>
    </div>
    </Card>
  )}
    </div>

  );
}
