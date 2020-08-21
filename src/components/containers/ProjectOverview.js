import React, { memo } from 'react';
import { useSelector } from "react-redux";
import withReducer from 'app/store/withReducer';
import reducer from 'app/store/reducers';
import { useParams } from "react-router-dom";
import { isEqual } from "lodash";
import { projectStatusFilter } from "app/utils/projects";
import { CrowdfundCard } from "app/components/card/CrowdfundCard";

export const ProjectOverview = memo(withReducer('ProjectOverview', reducer)(() => {
  const {filter, status} = useParams();
  const projects = useSelector(({blockchain}) => blockchain.crowdfunds.projects, isEqual);

  return <div className="p-2 container w-full mx-auto flex flex-col mx-auto flex-wrap sm:flex-row lg:flex-row">
    {projects && projects
      .filter(p => projectStatusFilter(p, status))
      .filter(p => filter ? filter === 'all' || p.asset.category === filter : true)
      .sort((a, b) => a.asset.startFunding < b.asset.startFunding ? 1 : a.asset.startFunding > b.asset.startFunding ? -1 : 0)
      .map(p => (
        <CrowdfundCard
          key={p.publicKey}
          crowdfund={p}
        />
      ))}

    {filter && projects
      .filter(p => projectStatusFilter(p, status))
      .filter(p => filter === 'all' || p.asset.category === filter).length === 0 && (
      <h1>No projects in this category</h1>
    )}
  </div>;
}));
