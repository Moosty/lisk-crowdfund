import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MenuCard } from "../components";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export const Accordeon = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>My Investments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col w-full">
            <MenuCard
              type="investment"
              title="The Best sunglasses"
              investment="10.000lsk"
            />
            <MenuCard
              type="investment"
              title="The Best sunglasses"
              investment="10.000lsk"
            />
            <MenuCard
              type="investment"
              title="The Best sunglasses"
              investment="10.000lsk"
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
            <MenuCard type="crowdfund" />
            <MenuCard type="crowdfund" />
            <MenuCard type="crowdfund" />
            <MenuCard type="crowdfund" />
            <MenuCard type="crowdfund" />
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
