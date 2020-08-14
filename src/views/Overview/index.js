import React from "react";

import { TopBar, Header, CardsContainer, Footer } from "../../components";

export const Overview = (props) => {
  return (
    <div className="overflow-hidden">
      <TopBar />
      <Header
        title="Lisk Crowd | A Regulated Crowdfund Platform"
        subtitle="A Regulated Crowdfund Platform"
        button1="Explore Projects"
        button2="Start Crowdfund"
      />
      <CardsContainer />
      <Footer />
    </div>
  );
};
