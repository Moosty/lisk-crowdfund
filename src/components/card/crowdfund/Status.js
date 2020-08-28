/* global BigInt */
import React, { memo, useContext, useEffect, useState } from 'react';
import { getNow } from "app/utils";
import { config } from "app/config";
import { ProgressSection } from "app/components";
import AppContext from "app/AppContext";
import {
  allowedToClaim,
  allowedToRefund,
  calculateInvestments,
  getCurrentPeriod,
  nextPeriodToClaim
} from "app/utils/projects";
import * as States from './states';
import { Investments } from "app/components/card/crowdfund/Investments";

export const CrowdfundStatus = memo(({wallet, crowdfund, fullpage, sidebar}) => {
  const [state, setState] = useState(null);
  const {epoch} = useContext(AppContext);
  const [currentPeriod, setCurrentPeriod] = useState(null);

  useEffect(() => {
    const period = getCurrentPeriod(crowdfund.asset.startProject);
    setCurrentPeriod(period);
    setState(getStatus());
  }, [wallet, crowdfund])

  const getStatus = () => {
    const funds = calculateInvestments(crowdfund.asset.investments);
    if (crowdfund.asset.startFunding > getNow(epoch)) {
      return 'new';
    }

    if (crowdfund.asset.startFunding <= getNow(epoch) && crowdfund.asset.startFunding + config.periodLength > getNow(epoch)) {
      if (funds < crowdfund.asset.goal) {
        return 'open';
      }
    }

    if (crowdfund.asset.owner === wallet.account.publicKey && crowdfund.asset.status !== "REFUND STATE" && crowdfund.asset.startProject > -1) {
      const nextPayment = nextPeriodToClaim(crowdfund.asset.startProject, crowdfund.asset.payments);
      const allowed = allowedToClaim(crowdfund.asset.startProject, crowdfund.asset.payments, nextPayment);
      if (allowed) {
        return 'claim';
      }
    }

    if (crowdfund.asset.status === "REFUND STATE") {
      const refund = allowedToRefund(crowdfund, wallet.account.address)
      return refund > BigInt(0) ? 'refund' : 'closed';
    }

    if (crowdfund.asset.startFunding <= getNow(epoch) && crowdfund.asset.startFunding + config.periodLength < getNow(epoch) && funds < crowdfund.asset.goal) {
        const refund = allowedToRefund(crowdfund, wallet.account.address)
        return refund > BigInt(0) ? 'refund' : 'closed';
    }

    if (crowdfund.asset.state === 'FUNDED STATE' && crowdfund.asset.startProject > getNow(epoch)) {
      return 'await start';
    }

    if (crowdfund.asset.startProject > -1 && crowdfund.asset.startProject <= getNow(epoch)) {
      return 'started';
    }

    if (funds === BigInt(crowdfund.asset.goal) && crowdfund.asset.startProject === -1 &&
      wallet && wallet.account.publicKey === crowdfund.asset.owner) {
      return 'set start';
    }

    if (funds === BigInt(crowdfund.asset.goal)) {
      return 'funded';
    }

    return 'unkown';
  }

  return <div>
    {state === 'open' && <ProgressSection crowdfund={crowdfund.publicKey}/>}
    {state === 'new' && <States.NewState goal={crowdfund.asset.goal} start={crowdfund.asset.startFunding} />}
    {(state === "closed" || state === "refund") && <States.Closed sidebar={sidebar} state={state} publicKey={crowdfund.publicKey} />}
    {state === 'funded' && <States.Funded />}
    {state === 'claim' && <States.Claim state={state} publicKey={crowdfund.publicKey}/>}
    {state === 'set start' && <States.Start publicKey={crowdfund.publicKey} />}
    {state === 'await start' && <States.WaitStart start={crowdfund.asset.startProject} />}
    {state === "started" && (<States.Started
      start={crowdfund.asset.startProject}
      address={wallet.account.address}
      currentPeriod={currentPeriod}
      goal={crowdfund.asset.goal}
      periods={crowdfund.asset.periods}
      investments={crowdfund.asset.investments}
      votes={crowdfund.asset.votes}
      publicKey={crowdfund.publicKey}
      sidebar={sidebar}
    />)}
    {fullpage && crowdfund.asset.investments.filter(i => i.address === wallet.account.address).length > 0 && <Investments address={wallet.account.address} crowdfund={crowdfund} defaultOpen={fullpage} />}
    {!sidebar && crowdfund.asset.investments.length > 0 && <Investments crowdfund={crowdfund} defaultOpen={fullpage} />}
  </div>;
});
