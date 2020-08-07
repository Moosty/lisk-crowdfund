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


export const MenuCard = (props) => {
const classes = useStyles(props);
    return (

<Card classes={classes} className="lg:w-full bg-gray-100 pb-2 ">
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

);
}
