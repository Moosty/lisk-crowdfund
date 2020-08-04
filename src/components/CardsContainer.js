import React from 'react';
import { SingleCard } from './' ;

export const CardsContainer = (props) => {

  return <div>
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
