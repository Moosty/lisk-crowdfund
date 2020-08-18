import React from 'react';
import { Header, CardsContainer } from '../../components' ;
import { useDispatch } from "react-redux";
import * as Actions from "../../store/actions";
import reducer from "../../store/reducers";
import withReducer from "../../store/withReducer";

export const Overview = withReducer('Overview', reducer)(props => {
  const dispatch = useDispatch();
  return (
    <>
    <Header
      title="Lisk Crowd | A Regulated Crowdfund Platform"
      subtitle="A Regulated Crowdfund Platform"
      button1="Explore Projects"
      button2="Start Crowdfund"
      onClick2={() => dispatch(Actions.openModal('createCrowdfund'))}
    />
  <CardsContainer />
  </>);
});
