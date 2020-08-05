import React from 'react';
import { TopBar, SingleCard, ModalAddCrowdfund, SingleItem, Header } from '../../components' ;

import Button from '@material-ui/core/Button';

export const Wallet = (props) => {

  return <div className="bg-white overflow-hidden">
  <TopBar />
 <Header
 title="My Wallet"
 subtitle="overview of all my activities"
  />
  <div className="lg:mt-5 lg:w-10/12 mx-auto flex flex-col ">

    <SingleItem type="investment" src="/images/pexels-photo-3951901.jpeg" title="Crowdfundcampaign Title" subtitle="Project name" />


  <SingleItem type="investment" src="/images/pexels-photo-1149601.jpeg" title="Best Sneakers in the world" subtitle="Aqua Project" />

    <SingleItem type="investment" src="/images/pexels-photo-3951901.jpeg" title="Crowdfundcampaign Title" subtitle="Project name" />

  </div>
  </div>;
}
