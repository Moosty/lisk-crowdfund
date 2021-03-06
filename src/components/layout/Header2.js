import React from 'react';
import Button from '@material-ui/core/Button';

export const Header2 = (props) => {

  return <div>
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
</div>;
}
