/* global BigInt */
import { getNow } from "app/utils/time";
import { config } from "app/config";

export const projectStatusFilter = (project, status) => {
  if (!status || status === 'all') {
    return true;
  }
  let funds = 0;
  project.asset.investments.map(i => {
    funds += Number(i.amount);
  });
  if (project.asset.startFunding <= getNow(config.epoch) && project.asset.startFunding + config.periodLength < getNow(config.epoch)) {
    if (funds < project.asset.goal) {
      return status === 'closed'
    }
  }

  if (project.asset.startFunding <= getNow(config.epoch) && project.asset.startFunding + config.periodLength > getNow(config.epoch)) {
    if (funds < project.asset.goal) {
      return status === 'open'
    }
  }

  if (project.asset.startFunding > getNow(config.epoch)) {
    return status === 'new'
  }

  if (Number(funds) === Number(project.asset.goal)) {
    return status === 'funded'
  }
}

export const calculateInvestments = investments => {
  let totalInvestments = BigInt(0);
  investments.map(investment => {
    totalInvestments += BigInt(investment.amount);
  });
  return totalInvestments;
}

export const calculateVoteStake = (investments, address) => {
  let voteStake = BigInt(0);
  investments.map(investment => {
    if (investment.address === address) {
      voteStake += BigInt(investment.amount);
    }
  });
  const totalInvestments = calculateInvestments(investments);
  return totalInvestments ? voteStake / totalInvestments : BigInt(0);
}

export const allowedToRefund = (fundraiser, address) => {
  const payedFiltered = fundraiser.asset.payments
    .filter(p => p.type === 0)
    .map(p => BigInt(p.amount))
  if (payedFiltered.find(p => p.address === address)) {
    return BigInt(0);
  }
  const payedAmount = payedFiltered.length > 0 ?
    payedFiltered.reduce((accumulator, currentValue) => accumulator + currentValue) :
    BigInt(0);
  const amountLeft = calculateInvestments(fundraiser.asset.investments) - payedAmount;
  return amountLeft * calculateVoteStake(fundraiser.asset.investments, address);
}

export const getCurrentPeriod = (startProject) => {
  return Math.floor((getNow(config.epoch) - startProject) / config.periodLength)
}
