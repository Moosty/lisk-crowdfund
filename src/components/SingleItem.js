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
import Divider from '@material-ui/core/Divider';
import { SingleCard, Timeline, ButtonBases, TimelineVertical, ModalAddCrowdfund, ModalSignIn, Accordeon } from '../components' ;

const useStyles = makeStyles((theme) => ({
  root: props => ( {
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
    height: 20,
    borderRadius: 5,
    width: "100%",
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
  const classes = useStyles(props);
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <div className={` ${props.menu ? "w-full mx-1" : "w-full lg:w-9/12 p-4 mx-auto flex flex-col lg:flex-col h-full "} `}>
    <Badge className="w-full" color="secondary" badgeContent={3} showZero>
    <Paper  className={` ${props.menu ? "w-full m-0 px-4 py-2" : "w-full  p-4 mx-auto flex flex-col lg:flex-row h-full  " } `}>

                <div className=" flex  flex-col  lg:w-8/12 lg:mr-8 justify-between mb-4 sm:mb-0">
                <div className=" flex flex-row content-start  w-full items-center">
                  <ListItemAvatar>
                  <Avatar
                    sizes={props.menu ? "10px" : "100px"}

                src={props.src}
                />
                  </ListItemAvatar>

                  <ListItemText
                    primary={props.title}
                    secondary={props.subtitle}
                  />

                  </div>
                  <span>
                  Hier komt nog wat extra informatie over die maanden en uitbetalingen?
                  </span>

                    <BorderLinearProgress variant="determinate" value={67} />
                  </div>


                  {props.type === 'investment' && (
                  <Card classes={classes} className="lg:w-4/12 bg-gray-100 pb-2 ">
                  <h1 className="font-bold text-gray-800 pl-4 pt-2">
                  My Investment
                  </h1>
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
                  <div className=" w-full flex flex-row justify-end px-4">
                  <Button size="small" variant="contained" color="secondary" style={{marginRight:"0.5rem"}}>Vote</Button>
                  <Button size="small" variant="outlined" color="secondary">Refund</Button>
                  </div>
                  </Card>

                )}



    </Paper>
  </Badge>
    </div>

  );
}
