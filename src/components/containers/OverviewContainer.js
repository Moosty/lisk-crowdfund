import React from 'react';
import { Filter } from "app/components";
import { ProjectOverview } from "app/components/containers";

export const OverviewContainer = () => {

  return (
    <div className="mt-5 w-12/12 lg:w-12/12 mx-auto">
      <div className="mt-5 w-full mx-auto container">
        <Filter />
      </div>
      <ProjectOverview />
    </div>);
}
