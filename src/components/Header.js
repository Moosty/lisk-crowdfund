import React from 'react';
import Button from '@material-ui/core/Button';

export const Header = (props) => {

  return <div>
  <div className="bg-fixed sm:bg-scroll" style={{backgroundImage:"url(/images/candy.jpeg)", height:"40vh" }}>
 	 <div className="w-full flex-auto h-full" style={{backgroundColor: "#1a202c94"}}>
 	 	<div className="p-12 text-center md:p-12 lg:p-24">
 	 		<h1 className="text-xl sm:text-3xl sm:text-center lg:text-5xl text-white font-extrabold">{props.title}</h1>
 	 		<span className="text-xl text-center text-white">{props.subtitle}</span>
 		 		<div className="mt-10 mx-auto w-1/4">
         <div className="mx-auto flex  content-center items-center">
 			 		<Button
						onClick={() => {
							if (props.onClick1) {
								props.onClick1()
							}
						}}
						variant="contained"
						color="primary"
						style={{marginRight: 10}}>
 			        {props.button1}
 			      </Button>
 			      <Button
							onClick={() => {
								if (props.onClick2) {
									props.onClick2()
								}
							}}
							variant="contained"
							color="secondary">
 			        {props.button2}
 			      </Button>
 	      		</div>
           </div>
 	 	</div>
 	 </div>
   </div>
</div>;
}
