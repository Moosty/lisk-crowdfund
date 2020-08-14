import React from 'react';
import { TopBar, Header, CardsContainer, Footer } from '../../components' ;
import { useDispatch } from "react-redux";
import * as Actions from "../../store/actions";
import reducer from "../../store/reducers";
import withReducer from "../../store/withReducer";

export const Overview = withReducer('Overview', reducer)(props => {
  const dispatch = useDispatch();
  return <div className="overflow-hidden">
    <TopBar />
    <Header
    title="Lisk Crowd | A Regulated Crowdfund Platform"
    subtitle="A Regulated Crowdfund Platform"
    button1="Explore Projects"
    button2="Start Crowdfund"
    onClick2={() => dispatch(Actions.openModal('createCrowdfund'))}
    />
    <CardsContainer />
    <Footer />
  </div>;
});
