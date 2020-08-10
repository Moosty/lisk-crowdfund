import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from '@material-ui/core/Chip';

import Button from '@material-ui/core/Button';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { ProgressSection } from '..' ;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 380,
    margin: 10,
    minWidth: 380,
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#f50057',
  },
  title: {
    color: '#f50057',
  }
}));



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
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="AQUA Project"
        subheader="September 14, 2020"
      />
      <CardMedia
        className={classes.media}
        image={props.image}
        title="Paella dish"
      />
      <CardContent>
      <Chip className="mb-4"variant="outlined" size="small" style={{letterSpacing: 2}} color="primary" label={props.category} />
      	<h1 className="font-medium">{props.title}</h1>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.text}
        </Typography>
        {props.type === 'crowdfund' && (
          <div>
          <ProgressSection />
          <div className="flex lg:flex-row mt-4">
            <div className="flex flex-row w-full">
              <Button className=" " size="small" variant="contained" color="primary" style={{marginRight: 10}}>
                Back it
              </Button>
              <Button className="" size="small" variant="contained" color="secondary">
                Follow
              </Button>
              </div>
              <div className="flex flex-row w-full">

              <span className="font-bold p-2 text-right w-full ">  <AccessTimeIcon style={{fontSize:"18px"}} /> 40 days left</span>
              </div>
          </div>
          </div>

          )}



      </CardContent>

    </Card>
  );
}
