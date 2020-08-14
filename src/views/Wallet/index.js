import React from "react";

import {
  TopBar,
  SingleItem,
  Header,
  Footer,
  AccordeonWallet,
} from "../../components";

export const Wallet = (props) => {
  return (
    <div className="bg-white overflow-hidden">
      <TopBar />
      <Header title="My Wallet" subtitle="overview of all my activities" />
      <div className="mb-4 lg:mt-5 lg:w-10/12 mx-auto flex flex-col lg:flex-row flex-wrap justify-start items-start ">
        <AccordeonWallet />
      </div>
      <Footer />
    </div>
  );
};
