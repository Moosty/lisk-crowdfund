import React from 'react';
import { Menu, SingleCard, Timeline, ButtonBases, TimelineVertical } from '../../components' ;
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import LinearProgress from '@material-ui/core/LinearProgress';

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

export const Crowdfund = (props) => {

	const classes = useStyles();

  return <div>
    <Menu />
 <div className="bg-fixed sm:bg-scroll mt-20" >
	 <div className="w-full px-5 lg:px-0 lg:w-4/6 mx-auto h-full flex flex-col lg:flex-row" >
    <div className="w-full lg:w-2/4 bg-contain lg:bg-cover" style={{backgroundImage:"url(/images/pexels-photo-3951901.jpeg)"}}>
  	</div>
	 	<div className="w-full lg:w-2/4 lg:pt-0 lg:px-12 lg:p-10" style={{backgroundColor: "white"}}>
	 		<Chip className="mb-2"variant="outlined" size="medium" style={{letterSpacing: 2}} color="primary" label="DEFI" />
	 		<h1 className="text-xl sm:text-3xl lg:text-5l lg:leading-8 text-grey font-bold mb-2">Lisk Crowd - A Regulated Crowdfund Campaign</h1>
	 		<span className="text-lg text-grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec porta metus.
	 		Quisque mollis tortor sit amet metus tempus lacinia. Aliquam maximus odio auctor malesuada maximus. Etiam ac eros magna.
	 		Morbi ut tortor porttitor, elementum tellus vel, imperdiet enim. Morbi tincidunt consectetur nibh, eget viverra nulla aliquam finibus.
	 		Cras malesuada, augue ut sollicitudin mattis, erat libero pulvinar ante, ac accumsan massa est eu lectus.</span>
	 		<Card className="w-full my-5">
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
      </Card>
      <div className="flex flex-col w-full">
      	<div className="w-full flex flex-row space justify-between">
      		<div>
      		<h1>€307,409 EUR</h1>
      		</div>

      		<div>
      		755 Backers
      		</div>
      	</div>
      	<div className="mt-2">
      	  <BorderLinearProgress variant="determinate" value={50} />
      	 </div>
      </div>
		 		<div className="flex lg:flex-row mt-4">
			 		<Button className=" " variant="contained" color="primary" style={{marginRight: 10}}>
			        Back it
			      </Button>
			      <Button className="" variant="contained" color="secondary">
			        Follow
			      </Button>
	      </div>
	 	</div>

	 </div>

   <div className="p-24 bg-gray-200 w-full px-5 lg:px-0 lg:w-4/6 mx-auto h-full flex flex-col lg:flex-row" >
	  <Timeline />
   </div>
   <div className="p-24 bg-gray-200 w-full px-5 lg:px-0 lg:w-4/6 mx-auto h-full flex flex-col lg:flex-row" >
    <Timeline />
   </div>
   <div className="p-24 bg-gray-200 w-full px-5 lg:px-0 lg:w-4/6 mx-auto h-full flex flex-col lg:flex-row" >
    <TimelineVertical />
   </div>
   <div className="mx-auto">
    <ButtonBases />
   </div>
  </div>


  </div>;
}
