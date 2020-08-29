import React from "react";

import { Header } from "app/components";
import { WalletOverview } from "app/components/containers";

export const Wallet = (props) => {
  return (
    <div className="bg-white overflow-hidden">
      <Header title="My Wallet" subtitle="overview of all my crowdfunds, projects & investments" />
      <div className="mb-4 lg:mt-5 lg:w-10/12 mx-auto flex flex-col lg:flex-row flex-wrap justify-start items-start ">
        {/*<AccordeonWallet />*/}
        <WalletOverview />
      </div>
    </div>
  );
};
