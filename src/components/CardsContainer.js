import React, { useContext } from "react";
import { Filter, SingleCard } from "./";
import { useDispatch, useSelector } from "react-redux";
import withReducer from '../store/withReducer';
import reducer from '../store/reducers';
import { getNow } from "../utils";
import { config } from "../config";
import AppContext from "../AppContext";
import { fromTimeStamp } from "../utils/time";
import { useParams } from "react-router-dom";

export const CardsContainer = withReducer('CardsContainer', reducer)(props => {
  const dispatch = useDispatch();
  const {filter} = useParams();
  const {epoch} = useContext(AppContext);
  const {wallet} = useSelector(({blockchain}) => blockchain);
  const {projects} = useSelector(({blockchain}) => blockchain.crowdfunds);
  const {users} = useSelector(({blockchain}) => blockchain.users);

  return (
    <div>
      <div className="mt-5 w-12/12 lg:w-12/12 mx-auto">
        <div className="mt-5 w-full mx-auto container">
          <Filter/>
        </div>
        <div className="p-2 container w-full mx-auto flex flex-col mx-auto flex-wrap 	  sm:flex-row lg:flex-row">
          {projects && projects
            .filter(p => filter ? p.asset.category === filter : true)
            .sort((a,b) => a.asset.startFunding < b.asset.startFunding ? 1 : a.asset.startFunding > b.asset.startFunding ? -1 : 0)
            .map(p => {
            const image = p.asset.image.split("#");
            let state = null;
            let currentPeriod = 0;
            let nextVote = null;
            let endVote = null;
            let funds = 0;
            p.asset.investments.map(i => {
              funds += Number(i.amount);
            });
            if (p.asset.startFunding <= getNow(epoch) && p.asset.startFunding + config.periodLength < getNow(epoch)) {
              if (funds < p.asset.goal) {
                state = "failed";
              }
            }

            if (Number(funds) === Number(p.asset.goal)) {
              state = "funded";
            }
            if (p.asset.startProject > -1) {
              currentPeriod = Math.floor((getNow(epoch) - p.asset.startProject)/config.periodLength);
              if (currentPeriod === 0) {
                currentPeriod++;
              }
              nextVote = fromTimeStamp(epoch, p.asset.startProject + (config.periodLength * currentPeriod) - config.votePeriod);
              endVote = fromTimeStamp(epoch,p.asset.startProject + (config.periodLength * currentPeriod));
            }
            return (
              <SingleCard
                key={p.publicKey}
                type="crowdfund"
                publicKey={p.publicKey}
                username={users.find(u => u.publicKey === p.asset.owner).username}
                text={p.asset.description}
                start={p.asset.startFunding}
                {...p.asset}
                image={{
                  color: `#${image[1]}`,
                  type: image[0],
                }}
                state={state}
                currentPeriod={currentPeriod}
                nextVote={nextVote}
                endVote={endVote}
                wallet={wallet}
                // image="/images/pexels-photo-3951901.jpeg"
              />
            )
          })}
        </div>
      </div>
    </div>
  );
});
