import React from 'react';
import { Menu, SingleCard } from '../../components' ;
import Button from '@material-ui/core/Button';


export const Overview = (props) => {

  return <div>
  <Menu />
 <div className="bg-fixed" style={{backgroundImage:"url(/images/pexels-photo-3951901.jpeg)", height:"40vh" }}>
	 <div className="w-full h-full" style={{backgroundColor: "#1a202c94"}}>
	 	<div className="p-24 ">
	 		<h1 className="text-5xl text-white font-bold">Lisk Crowd - A Regulated Crowdfund Campaign</h1>
	 		<span className="text-xl">A new kind of mask. Zero compromise between breathing & looking great</span>
		 		<div className="flex row mt-4">
			 		<Button variant="contained" color="primary" style={{marginRight: 10}}>
			        Explore
			      </Button>
			      <Button variant="contained" color="secondary">
			        Invest
			      </Button>
	      		</div>
	 	</div>
	 </div>
  </div>
  <div className="p-12 flex flex-row">
  <SingleCard 
  text="A new kind of mask. Zero compromise between breathing & looking great" 
  title="The Face Mask - Premium look & Air Filtration"
  category="DEFI"
  image="/images/pexels-photo-3951901.jpeg" />
  <SingleCard 
  text="A new kind of mask. Zero compromise between team & looking great" 
  title="The Best Team - Premium Team & AWESOME"
  category="DEFI"
  image="/images/pexels-photo-1036641.jpeg" />
  <SingleCard 
  text="A new kind of something. Zero compromise between being fast & awesome" 
  title="The Fast Bike - Premium look Cant Beat This "
  category="DEFI"
  image="/images/pexels-photo-1149601.jpeg" />
  <SingleCard 
  text="A new kind of rocket. Zero compromise between flying & looking great" 
  title="The Huge Rocket - Zero compromise between flying & looking great"
  category="DEFI"
  image="/images/flight-sky-earth-space.jpg" />
  <SingleCard 
  text="A new kind of sneakers. Zero compromise between comfort & looking great" 
  title="The New Sneakers - Premium look & Air Filtration"
  category="DEFI"
  image="/images/pexels-photo-1070360.jpeg" />

  
  </div>
  </div>;
}
