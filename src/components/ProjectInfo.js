import React, { useContext } from 'react';
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
import { fromTimeStamp, getNow } from "app/utils/time";
import AppContext from "app/AppContext";
import { ProgressSection } from "app/components/card/ProgressSection";
import { SingleCard } from "app/components/card/SingleCard";
import { config } from "app/config";

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
  const {api, networkIdentifier, epoch} = useContext(AppContext);
  const form = useSelector(({blockchain}) => blockchain.crowdfund.createForm);
  const {users} = useSelector(({blockchain}) => blockchain.users);
  const {wallet} = useSelector(({blockchain}) => blockchain);

  if (!props.publicKey) {
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
  } else if (1231 ===1 ) {
    return (<div>
      <Chip className="mb-2" variant="outlined" size="medium" style={{letterSpacing: 2}} color="primary"
            label={props.crowdfund.asset.category.toUpperCase()}/>
      <h1 className="text-xl sm:text-3xl lg:text-5l lg:leading-8 text-grey font-bold mb-2">
        {props.crowdfund.asset.title}
      </h1>
      <span className="text-lg text-grey text-sm">
        {props.crowdfund.asset.description}
      </span>

      <Card className="w-full my-5">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.crowdfund.asset.owner}
            </Avatar>
          }
          title={props.crowdfund.asset.title}
          subheader={fromTimeStamp(epoch, props.crowdfund.asset.startFunding).toISOString()}
        />
      </Card>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row space justify-between">
          <ProgressSection crowdfund={props.publicKey}/>
        </div>
      </div>
    </div>)
  } else {
    const image = props.crowdfund.asset.image.split("#");
    let state = null;
    let currentPeriod = 0;
    let nextVote = null;
    let endVote = null;
    let funds = 0;
    props.crowdfund.asset.investments.map(i => {
      funds += Number(i.amount);
    });
    if (props.crowdfund.asset.startFunding <= getNow(epoch) && props.crowdfund.asset.startFunding + config.periodLength < getNow(epoch)) {
      if (funds < props.crowdfund.asset.goal) {
        state = "failed";
      }
    }

    if (Number(funds) === Number(props.crowdfund.asset.goal)) {
      state = "funded";
    }
    if (props.crowdfund.asset.startProject > -1) {
      currentPeriod = Math.floor((getNow(epoch) - props.crowdfund.asset.startProject)/config.periodLength);
      if (currentPeriod === 0) {
        currentPeriod++;
      }
      nextVote = fromTimeStamp(epoch, props.crowdfund.asset.startProject + (config.periodLength * currentPeriod) - config.votePeriod);
      endVote = fromTimeStamp(epoch,props.crowdfund.asset.startProject + (config.periodLength * currentPeriod));
    }
    return (
      <SingleCard
        fullpage
        key={props.publicKey}
        type="crowdfund"
        publicKey={props.publicKey}
        username={users.find(u => u.publicKey === props.crowdfund.asset.owner).username}
        text={props.crowdfund.asset.description}
        start={props.crowdfund.asset.startFunding}
        {...props.crowdfund.asset}
        image={{
          color: `#${image[1]}`,
          type: image[0],
        }}
        state={state}
        currentPeriod={currentPeriod}
        nextVote={nextVote}
        endVote={endVote}
        wallet={wallet}
        // image="/images/pexels-photo-3951901.jpeg"
      />
    )
  }
})
