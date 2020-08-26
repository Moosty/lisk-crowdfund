import React, { memo, useContext, useEffect, useState } from 'react';
import AccessTimeIcon from "@material-ui/icons/AccessTime";

import moment from "moment";
import { VoteModal } from "app/components";
import { fromTimeStamp } from "app/utils/time";
import { config } from "app/config";
import AppContext from "app/AppContext";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 20,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

export const Started = memo(({publicKey, currentPeriod, periods, goal, start, address, votes, investments, sidebar}) => {
  const {epoch} = useContext(AppContext);
  const [isInvestor, setIsInvestor] = useState(false);
  const [didVote, setDidVote] = useState(false);
  const [nextVote, setNextVote] = useState({end: null, start: null});

  useEffect(() => {
    setIsInvestor(investments.filter(i => i.address === address).length > 0);
    setDidVote(votes.find(v => v.address === address && v.period === currentPeriod));
    setNextVote({
      start: fromTimeStamp(epoch, start + (config.periodLength * (currentPeriod + 1)) - config.votePeriod),
      end: fromTimeStamp(epoch, start + (config.periodLength * (currentPeriod + 1))),
    });
  }, [start, currentPeriod, address, investments, votes]);

  return (
    <div className="flex flex-col w-full mt-4 content-end">
      {!sidebar && <div className="w-full flex flex-row space justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="text-sm text-gray-700">
              Project Duration:
            </div>
          </div>
          <div className="flex flex-row">
            <h1>{currentPeriod}/</h1>
            <h1 className="font-bold">{periods} months</h1>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-gray-700">Total Raised:</div>
          <span className="">
            {goal && goal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}CFT
          </span>
        </div>
      </div>}
      <div className="mt-2">
        <BorderLinearProgress
          variant="determinate"
          value={periods && (currentPeriod / periods) * 100}/>
      </div>
      <div className="flex lg:flex-row mt-4">
        <div className="flex flex-row w-full">
          <div className="font-bold text-right w-full ">
            {nextVote.start > new Date() &&
            <div className="flex flex-row w-full text-center align-middle justify-between items-center">
              <span className="text-sm text-gray-700">
                Next vote:{" "}
              </span>
              <span>
                <AccessTimeIcon style={{fontSize: "18px"}}/> {moment(nextVote.start).fromNow()}
              </span>
            </div>}
            {nextVote.start <= new Date() && nextVote.end >= new Date() &&
            <div className="flex flex-row w-full text-center align-middle justify-between items-center">
              <span className="text-sm text-gray-700">
                {isInvestor && !didVote && (
                  <VoteModal publicKey={publicKey} period={currentPeriod + 1}/>
                )}
                {isInvestor && didVote && (
                  "You already voted this period"
                )}
                {!isInvestor && "Voting active"}
              </span>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
});
