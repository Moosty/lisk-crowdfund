import React from 'react';
import Button from '@material-ui/core/Button';

export const Header = ({title, subtitle, button1, button2, onClick1, onClick2}) => {

  return (
    <div>
      <div className="bg-fixed sm:bg-scroll bg-cover"
           style={{backgroundImage: "url(/images/candy.jpeg)", height: "40vh"}}>
        <div className="w-full flex-auto h-full" style={{backgroundColor: "#1a202c94"}}>
          <div className="p-12 text-center md:p-12 lg:p-24">
            <h1 className="text-xl sm:text-3xl sm:text-center lg:text-5xl text-white font-extrabold">{title}</h1>
            <span className="text-xl text-center text-white">{subtitle}</span>
            <div className="mt-10 flex-row justify-center">
              {button1 && <Button
                onClick={() => {
                  if (onClick1) {
                    onClick1();
                  }
                }}
                variant="contained"
                color="primary">
                {button1}
              </Button>}
              {button2 && <Button
                onClick={() => {
                  if (onClick2) {
                    onClick2();
                  }
                }}
                variant="contained"
                color="secondary"
                style={{marginLeft: 10}}>
                {button2}
              </Button>}
            </div>
          </div>
        </div>
      </div>
    </div>);
};
