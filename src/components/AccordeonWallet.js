import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import Typography from "@material-ui/core/Typography";

import { MenuCard } from "../components";
import { SingleItem } from "./";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export const AccordeonWallet = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion rounded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>My Investments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-wrap flex-row justify-start container">
            <SingleItem
              type="investment"
              src="/images/pexels-photo-3951901.jpeg"
              title="Crowdfundcampaign Title"
              subtitle="Project name"
            />

            <SingleItem
              type="project"
              src="/images/pexels-photo-1149601.jpeg"
              title="Best Sneakers in the world"
              subtitle="Aqua Project"
            />

            <SingleItem
              type="crowdfund"
              src="/images/pexels-photo-3951901.jpeg"
              title="Crowdfundcampaign Title"
              subtitle="Project name"
            />
            <SingleItem
              type="investment"
              src="/images/pexels-photo-1149601.jpeg"
              title="Best Sneakers in the world"
              subtitle="Aqua Project"
            />

            <SingleItem
              type="investment"
              src="/images/pexels-photo-3951901.jpeg"
              title="Crowdfundcampaign Title"
              subtitle="Project name"
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>My Crowdfunds</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col w-full">
            <MenuCard
              type="crowdfund"
              title="The Best metal golden sunglasses"
              timeLeft="24"
            />
            <MenuCard type="crowdfund" title="Project 453" timeLeft="2" />
            <MenuCard type="crowdfund" title="Flying boat" timeLeft="4" />
            <MenuCard
              type="crowdfund"
              title="Golden fluffy tiger"
              timeLeft="74"
            />
            <MenuCard type="crowdfund" title="Boring stuff" timeLeft="11" />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>My Projects</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
};
