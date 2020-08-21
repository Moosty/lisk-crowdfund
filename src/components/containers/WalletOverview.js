import React, { memo } from 'react';
import { useSelector } from "react-redux";
import withReducer from 'app/store/withReducer';
import reducer from 'app/store/reducers';
import { isEqual } from "lodash";
import { CrowdfundCard } from "app/components/card/CrowdfundCard";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


export const WalletOverview = memo(withReducer('WalletOverview', reducer)(() => {
  const projects = useSelector(({blockchain}) => blockchain.crowdfunds.projects, isEqual);
  const account = useSelector(({blockchain}) => blockchain.wallet.account, isEqual);
  const classes = useStyles();

  const isType = (crowdfund, type) => {
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
    <Accordion className="w-full m-3">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>My Projects</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-row flex-wrap">
        {projects && projects
          .filter(p => isType(p, 'my'))
          .sort((a, b) => a.asset.startFunding < b.asset.startFunding ? 1 : a.asset.startFunding > b.asset.startFunding ? -1 : 0)
          .map(p => (
            <CrowdfundCard
              key={p.publicKey}
              crowdfund={p}
            />
          ))}
        {projects && projects
          .filter(p => isType(p, 'my')).length === 0 && (
          <h1>No projects in this category</h1>
        )}
        </div>
      </AccordionDetails>
    </Accordion>
    <Accordion className="w-full m-3">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>My Investments</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-row w-full flex-wrap">
        {projects && projects
          .filter(p => isType(p, 'backed'))
          .sort((a, b) => a.asset.startFunding < b.asset.startFunding ? 1 : a.asset.startFunding > b.asset.startFunding ? -1 : 0)
          .map(p => (
            <CrowdfundCard
              key={p.publicKey}
              crowdfund={p}
            />
          ))}

        {projects && projects
          .filter(p => isType(p, 'backed')).length === 0 && (
          <h1>No projects in this category</h1>
        )}
        </div>
      </AccordionDetails>
    </Accordion>
  </div>;
}));
