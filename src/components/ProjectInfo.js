import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import withReducer from "../store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import reducer from "../store/reducers";
import * as Actions from '../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: 10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
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

export const ProjectInfo = withReducer('projectInfo', reducer)((props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const form = useSelector(({blockchain}) => blockchain.crowdfund.createForm);

  return (
    <div>
      <Chip className="mb-2" variant="outlined" size="medium" style={{letterSpacing: 2}} color="primary"
            label={props.create ? form.category : 'DEFI'}/>
      <h1 className="text-xl sm:text-3xl lg:text-5l lg:leading-8 text-grey font-bold mb-2">
        {!props.create && 'Lisk Crowdfund - Project info'}
        {props.create && form.title}
      </h1>
      <span className="text-lg text-grey text-sm">
        {!props.create && `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec porta metus.
        Quisque mollis tortor sit amet metus tempus lacinia. Aliquam maximus odio auctor malesuada maximus. Etiam ac eros magna.
        Morbi ut tortor porttitor, elementum tellus vel, imperdiet enim. Morbi tincidunt consectetur nibh, eget viverra nulla aliquam finibus.
        Cras malesuada, augue ut sollicitudin mattis, erat libero pulvinar ante, ac accumsan massa est eu lectus.`}
        {props.create && form.description}
      </span>

      <Card className="w-full my-5">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {!props.create && `R`}
              {props.create && form.title && form.title[0] && form.title[0].toUpperCase()}
            </Avatar>
          }
          title={!props.create ? 'Lisk Crowdfund - Project info' : form.title}
          subheader={!props.create ? "September 14, 2020" : new Date(form.startDate).toDateString()}
        />
      </Card>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row space justify-between">
          <div className="flex flex-row">
            <h1>0 TKN / </h1><h1 className="font-bold">{!props.create ? '200.000' : form.goal} TKN</h1>
          </div>
          <div>
            {!props.create && '755 Backers'}
            {props.create && '0 Backers'}
          </div>
        </div>
        <div className="mt-2">
          <BorderLinearProgress variant="determinate" value={50}/>
        </div>
      </div>
      {!props.create && <div className="flex lg:flex-row mt-4">
        <Button className=" " variant="contained" color="primary" style={{marginRight: 10}}>
          Back it
        </Button>
        <Button className="" variant="contained" color="secondary">
          Follow
        </Button>
      </div>}
    </div>);
})
