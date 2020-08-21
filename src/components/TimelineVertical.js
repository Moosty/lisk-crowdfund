import React, { useContext, useEffect, useState } from 'react';
import Timeline from '@material-ui/lab/Timeline';
import { Update } from './';
import withReducer from "app/store/withReducer";
import reducer from "app/store/reducers";
import { fromTimeStamp, getNow } from "app/utils/time";
import AppContext from "app/AppContext";
import { config } from "app/config";
import { calculateInvestments, getCurrentPeriod } from "app/utils/projects";

//* Timeline Components    *//
//* - UpdateComment:       *//
//* - UpdateEnd:           *//
//* - UpdateVote:          *//


export const TimelineVertical = withReducer('TimelineVertical', reducer)(({crowdfund}) => {
  const {epoch} = useContext(AppContext);
  const defaultEvents = [
    {
      time: fromTimeStamp(epoch, crowdfund.asset.startFunding),
      title: "Start crowdfund",
      content: "Back this project",
      type: "claim",
      connector: false,
    },
  ]
  const [events, setEvents] = useState([...defaultEvents]);
  useEffect(() => {
    // todo get all events on project
    // sort by time
    let eventsList = [];
    const funds = calculateInvestments(crowdfund.asset.investments);

    // get all vote periods only add passed and 1st upcoming
    if (crowdfund.asset.startFunding <= getNow(epoch) &&
      crowdfund.asset.startFunding + config.periodLength < getNow(epoch) &&
      funds < crowdfund.asset.goal) {
      eventsList.push({
        time: fromTimeStamp(epoch, crowdfund.asset.startFunding + config.periodLength),
        title: "Crowdfund didn't reach goal",
        content: `You can refund if you backed this project`,
        type: "claim",
        connector: true,
      })
    }
    if (crowdfund.asset.startProject > -1) {
      const currentPeriod = getCurrentPeriod(crowdfund.asset.startProject);
      if (currentPeriod > 0) {
        for (let i = 0; i < currentPeriod; i++) {
          const votes = crowdfund.asset.votes
            .filter(v => v.period === i && v.vote === 0);

          eventsList.push({
            time: fromTimeStamp(epoch, crowdfund.asset.startProject + (config.periodLength * i) + 1),
            title: "Passed Vote",
            content: `This vote ended with ${votes.length > 0 ? votes.reduce((s, {stake}) => s + stake).stake * 100 : 0}% votes in favour of a refund`,
            type: "vote",
            connector: true,
          })
        }
      }
      if (crowdfund.asset.status === "REFUND STATE") {
        const votePeriod = Math.max(crowdfund.asset.votes.map(v => v.period));
        const votes = crowdfund.asset.votes
          .filter(v => v.period === votePeriod && v.vote === 0);
        votes.reduce((sum, current) => {
          console.log(sum, current)
          return sum.stake + current
        })
        eventsList.push({
          time: fromTimeStamp(epoch, crowdfund.asset.startFunding + (votePeriod * config.periodLength) + 1),
          title: `${votes.length > 0 ? votes.reduce((s, {stake}) => s + stake).stake * 100 : 0}% backers voted in favour of refund`,
          content: `You can refund if you backed this project`,
          type: "claim",
          connector: true,
        });
      }

      if (crowdfund.asset.status !== "REFUND STATE" && currentPeriod < crowdfund.asset.periods) {
        eventsList.push({
          time: fromTimeStamp(epoch, crowdfund.asset.startProject +
            (config.periodLength * (currentPeriod + 1)) - config.votePeriod),
          title: "Next Vote",
          content: "If you are a backer you can vote for carry on or refund",
          type: "vote",
          connector: true,
        });
      }
      eventsList.push({
        time: fromTimeStamp(epoch, crowdfund.asset.startProject),
        title: "Start Project",
        content: "Let's do this people!!",
        type: "start",
        connector: true,
      });
    }
    setEvents([...eventsList, ...defaultEvents].sort((a, b) => a.time < b.time ? 1 : a.time > b.time ? -1 : 0));
  }, [crowdfund.asset]);

  return (
    <Timeline align="alternate">
      {events && events.map(e => <Update key={e.time.toTimeString()} {...e} />)}
    </Timeline>
  );
});
