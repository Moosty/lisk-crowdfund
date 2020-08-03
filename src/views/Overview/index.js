import React from 'react';
import { TopBar, SingleCard } from '../../components' ;
import Button from '@material-ui/core/Button';


export const Overview = (props) => {

  return <div class="bg-red-500 sm:bg-green-500 md:bg-blue-500 lg:bg-white xl:bg-white-100 overflow-hidden">
  <TopBar />
 <div className="bg-fixed sm:bg-scroll" style={{backgroundImage:"url(/images/pexels-photo-3951901.jpeg)", height:"40vh" }}>
	 <div className="w-full flex-auto h-full" style={{backgroundColor: "#1a202c94"}}>
	 	<div className="p-12 text-center md:p-12 lg:p-24">
	 		<h1 className="text-xl sm:text-3xl sm:text-center lg:text-5xl text-white font-extrabold">Lisk Crowd | A Regulated Crowdfund Platform</h1>
	 		<span className="text-xl text-center text-white">A Regulated Crowdfund Platform</span>
		 		<div className="mt-10 mx-auto w-1/4">
        <div className="mx-auto flex  content-center items-center">
			 		<Button variant="contained" color="primary" style={{marginRight: 10}}>
			        Explore Projects
			      </Button>
			      <Button  variant="contained" color="secondary">
			        Start your crowdfund
			      </Button>
	      		</div>
          </div>
	 	</div>
	 </div>
  </div>
  <div className="mt-5 w-12/12 lg:w-12/12">
  <div className="p-2 container w-11/12 mx-auto flex flex-col mx-auto flex-wrap sm:flex-start	lg:max-w-full  sm:flex-row lg:flex-row">
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
    image="/images/pexels-photo-3951901.jpeg" />
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
    <SingleCard
    text="A back-end for all your restaurants"
    title="The Lisk Restaurant Sidechain"
    category="DEFI"
    image="/images/pexels-photo-1070360.jpeg" />
    <SingleCard
    text="A new organisational form. Accessible for everyone online."
    title="The Lisk DAO"
    category="DEFI"
    image="/images/flight-sky-earth-space.jpg" />
    <SingleCard
    text="A new kind of sneakers. A decentralized application that tracks the history and life path of valuable items."
    title="The Smart Inventory Project"
    category="DEFI"
    image="/images/pexels-photo-1070360.jpeg" />
  </div>
  </div>
  </div>;
}
