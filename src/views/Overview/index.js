import React from 'react';
import { CardsContainer, Header } from 'app/components';
import { useDispatch } from "react-redux";
import * as Actions from "app/store/actions";
import { OverviewContainer } from "app/components/containers";

export const Overview = props => {
  const dispatch = useDispatch();
  return (
    <>
    <Header
      title="Lisk Crowd | A Regulated Crowdfund Platform"
      subtitle="A Regulated Crowdfund Platform"
      // button1="Explore Projects"
      button1="Start Crowdfund"
      onClick1={() => dispatch(Actions.openModal('createCrowdfund'))}
    />
    <OverviewContainer />
  </>);
};
