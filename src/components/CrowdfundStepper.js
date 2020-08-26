import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import React, { useContext, useEffect, useState } from "react";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";

import { Container, StepDate, StepGeneral, StepTechnical } from "../components";
import * as Actions from "../store/actions";
import reducer from "../store/reducers";
import withReducer from "../store/withReducer";
import { RegisterTransaction } from "@moosty/lisk-crowdfund-transactions";
import AppContext from "../AppContext";
import { getNow, toTimeStamp } from "../utils";
import { getAddressFromPublicKey } from "@liskhq/lisk-cryptography";
import { ConfirmAddCrowdfundModal } from "app/components/modals/ConfirmAddCrowdfundModal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Project Information", "Finance & Accountability", "Date & Time"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <Container>
          <StepGeneral/>
        </Container>
      );
    case 1:
      return (
        <Container>
          <StepTechnical/>
        </Container>
      );
    case 2:
      return (
        <Container>
          <StepDate/>
        </Container>
      );
    default:
      return "Unknown step";
  }
}

export const CrowdfundStepper = withReducer(
  "crowdfundStepper",
  reducer
)((props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const [skipped, setSkipped] = useState(new Set());
  const form = useSelector(({blockchain}) => blockchain.crowdfund.createForm);
  const steps = getSteps();

  useEffect(() => checkCompleted(), [form]);

  const totalSteps = () => {
    return getSteps().length;
  };

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
        steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    checkCompleted();
    handleNext();
  };

  const checkCompleted = () => {
    const newCompleted = new Set();
    if (form.title && form.site && form.description && form.category) {
      newCompleted.add(0);
    }
    if (form.goal && form.periods && form.voting) {
      newCompleted.add(1);
    }
    if (form.image && form.startDate) {
      newCompleted.add(2);
    }
    setCompleted(newCompleted);
  }


  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div>

        <div>
          <Typography className={classes.instructions}>
            {getStepContent(activeStep)}
          </Typography>
          <div className="flex justify-center">
            <div className="float-right">
              <Button onClick={() => dispatch(Actions.clearCrowdfundForm())}>
                Reset
              </Button>
            </div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>
            {(activeStep < 2) && <Button
              variant="contained"
              color="secondary"
              onClick={handleComplete}
            >
              Next
            </Button>}
            {activeStep === 2 && completedSteps() === totalSteps() && <ConfirmAddCrowdfundModal />}
          </div>
        </div>
      </div>
    </div>
  );
});
