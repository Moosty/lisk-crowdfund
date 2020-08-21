import React, { memo } from 'react';
import { useSelector } from "react-redux";
import withReducer from 'app/store/withReducer';
import reducer from 'app/store/reducers';
import { useParams } from "react-router-dom";
import { isEqual } from "lodash";
import { projectStatusFilter } from "app/utils/projects";
import { CrowdfundCard } from "app/components/card/CrowdfundCard";

export const ProjectOverview = memo(withReducer('ProjectOverview', reducer)(({wallet}) => {
  const {filter, status, type} = useParams();
  const projects = useSelector(({blockchain}) => blockchain.crowdfunds.projects, isEqual);
  const account = useSelector(({blockchain}) => blockchain.wallet.account, isEqual);
  const isType = (crowdfund) => {
    if (account && account.address) {
      if (type === 'my') {
        return crowdfund.asset.owner === account.publicKey;
      } else if (type === 'backed') {
        return crowdfund.asset.investments.find(i => i.address === account.address);
      }
      return true;
    }
    return false;
  }

  return <div className="p-2 container w-full mx-auto flex flex-col mx-auto flex-wrap sm:flex-row lg:flex-row">
    {projects && projects
      .filter(p => projectStatusFilter(p, status))
      .filter(p => filter ? filter === 'all' || p.asset.category === filter : true)
      .filter(p => type ? type === 'all' || isType(p) : true)
      .sort((a, b) => a.asset.startFunding < b.asset.startFunding ? 1 : a.asset.startFunding > b.asset.startFunding ? -1 : 0)
      .map(p => (
        <CrowdfundCard
          key={p.publicKey}
          crowdfund={p}
        />
      ))}

    {filter && projects
      .filter(p => projectStatusFilter(p, status))
      .filter(p => type ? type === 'all' || isType(p) : true)
      .filter(p => filter === 'all' || p.asset.category === filter).length === 0 && (
      <h1>No projects in this category</h1>
    )}
  </div>;
}));
