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
import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import { SingleCard, Timeline, ButtonBases, TimelineVertical, ModalAddCrowdfund, ModalSignIn } from '../components' ;


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
    height: 10,
    borderRadius: 5,
    marginTop: 8,
    marginBottom: 8,

  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);


export const MenuCard = (props) => {
const classes = useStyles(props);
    return (

<div className="px-4 py-2">
{props.type === 'investment' && (
  <div>
<div className="flex flex-row w-full  items-center">

        <div className="w-full flex flex-row h-full items-center	">
          <Avatar className="mr-4" alt="Remy Sharp" src="/images/pexels-photo-3951901.jpeg" />
          <div className="flex flex-col">
            <span style={{color:"#f50057", fontWeight:"bold"}}>{props.title}</span>
            <span style={{color:"#9a9a9a", fontSize:"12px"}}>{props.investment}</span>
          </div>
        </div>
<div className=" w-1/4 flex flex-col justify-end px-4">
<Button size="small" variant="contained" color="secondary">Vote</Button>

</div>
</div>
  <BorderLinearProgress my-variant="determinate" value={50} />
<Divider/>
</div>
)}

{props.type === 'crowdfund' && (
  <div>
<div className="flex flex-row w-full  items-center">

        <div className="w-full flex flex-row h-full items-center	">
          <Avatar className="mr-4" alt="Remy Sharp" src="/images/pexels-photo-3951901.jpeg" />
          <div className="flex flex-col">
            <span style={{color:"#f50057", fontWeight:"bold"}}>{props.title}</span>
            <span style={{color:"#9a9a9a", fontSize:"12px"}}>{props.amount}</span>
          </div>
        </div>
<div className=" w-1/4 flex flex-col justify-end px-4">
<Button size="small" variant="contained" color="secondary">Vote</Button>

</div>
</div>
  <span>Amount raised: 10.000 / 25.000 LSK</span>
  <BorderLinearProgress my-variant="determinate" value={50} />
<Divider/>
</div>
)}

{props.type === 'project' && (
  <div>
<div className="flex flex-row w-full  items-center">

        <div className="w-full flex flex-row h-full items-center	">
          <Avatar className="mr-4" alt="Remy Sharp" src="/images/pexels-photo-3951901.jpeg" />
          <div className="flex flex-col">
            <span style={{color:"#f50057", fontWeight:"bold"}}>{props.title}</span>
            <span style={{color:"#9a9a9a", fontSize:"12px"}}>{props.month}</span>
          </div>
        </div>
<div className=" w-1/4 flex flex-col justify-end px-4">
<Button size="small" variant="contained" color="secondary">Vote</Button>

</div>
</div>
  <BorderLinearProgress my-variant="determinate" value={50} />
<Divider/>
</div>
)}
</div>


);
}
