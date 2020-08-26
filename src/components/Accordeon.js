/* global BigInt */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MenuCard } from "../components";
import withReducer from "app/store/withReducer";
import reducer from "app/store/reducers";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export const Accordeon = withReducer('Accordeon', reducer)((props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {wallet, crowdfunds} = useSelector(({blockchain}) => blockchain);
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    if (wallet.account && wallet.account.address && crowdfunds.projects.length > 0) {
      let listInvestments = [];
      crowdfunds.projects.map(p => {
        const invests = p.asset.investments.filter(i => i.address === wallet.account.address);
        let amount = BigInt(0);
        invests.map(i => {
          amount += BigInt(i.amount);
        });
        if (amount > BigInt(0)) {
          listInvestments.push({publicKey: p.publicKey, title: p.asset.title, amount: amount.toString(), crowdfund: p});
        }
      })
      setInvestments(listInvestments);
    }
  }, [crowdfunds.projects, wallet])

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>My Investments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col w-full">
            {investments && investments.map(i => (
              <MenuCard
                key={`${i.publicKey}-iii`}
                type="investment"
                title={i.title}
                investment={i.amount}
                publicKey={i.publicKey}
                crowdfund={i.crowdfund}
                wallet={wallet}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>My Crowdfunds</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col w-full">
            {crowdfunds && wallet && wallet.account && wallet.account.publicKey && crowdfunds.projects.filter(p => p.asset.owner === wallet.account.publicKey).map(p => (
              <MenuCard
                key={p.publicKey}
                type="crowdfund"
                title={p.asset.title}
                timeLeft="24"
                crowdfund={p}
                wallet={wallet}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>My Projects</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
});
