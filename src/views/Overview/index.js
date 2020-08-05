import React from 'react';
import { TopBar, Header, CardsContainer } from '../../components' ;


export const Overview = (props) => {

  return <div>
    <TopBar />
    <Header
    title="Lisk Crowd | A Regulated Crowdfund Platform"
    subtitle="A Regulated Crowdfund Platform"
    button1="Explore Projects"
    button2="Start Crowdfund" />
    <CardsContainer />
  </div>;
}
