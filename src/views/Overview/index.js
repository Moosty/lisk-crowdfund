import React from 'react';
import { Menu, SingleCard } from '../../components' ;


export const Overview = (props) => {

  return <div>
  <Menu />
  <div className="bg-orange-500 p-12">
  Header
  </div>
  <div className="p-12 flex flex-row">
  <SingleCard className="m-12"/>
  <SingleCard className="m-12"/>
  <SingleCard className="m-12"/>
  <SingleCard className="m-12"/>
  </div>
  </div>;
}
