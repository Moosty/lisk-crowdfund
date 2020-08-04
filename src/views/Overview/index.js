import React from 'react';
import { TopBar, Header, CardsContainer } from '../../components' ;


export const Overview = (props) => {

  return <div class="bg-red-500 sm:bg-green-500 md:bg-blue-500 lg:bg-pink-500 xl:bg-teal-500">
    <TopBar />
    <Header />
    <CardsContainer />
  </div>;
}
