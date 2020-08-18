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
  const {api, networkIdentifier, epoch} = useContext(AppContext);
  const {wallet} = useSelector(({blockchain}) => blockchain);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const [skipped, setSkipped] = useState(new Set());
  const form = useSelector(({blockchain}) => blockchain.crowdfund.createForm);
  const steps = getSteps();

  useEffect(() => checkCompleted(), [form]);

  const totalSteps = () => {
    return getSteps().length;
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
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

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
    setSkipped(new Set());
  };

  const handleFinish = async () => {
    // todo open modal
    /*
      readonly fundraiser: string;
  readonly goal: string; // amount to raise
  readonly voteTime: number; // every how many periods vote allowed
  readonly periods: number;
  readonly title: string;
  readonly description: string;
  readonly site: string; // url
  readonly image: string; // base64 image
  readonly category: string;
     */
    if (wallet.passphrase && wallet.account && wallet.account.nonce) {
      const tx = {
        senderPublicKey: wallet.account.publicKey,
        networkIdentifier,
        nonce: wallet.account.nonce.toString(),
        passphrase: wallet.passphrase,
        asset: {
          goal: form.goal.toString(),
          voteTime: form.voting,
          periods: form.periods,
          title: form.title,
          description: form.description,
          site: form.site,
          image: form.image + form.color,
          category: form.category,
          start: toTimeStamp(epoch, form.startDate) > getNow(epoch) ? toTimeStamp(epoch, form.startDate) : getNow(epoch),
        }
      };
      const transaction = new RegisterTransaction(tx);
      // eslint-disable-next-line no-undef
      // console.log(getAddressFromPublicKey(transaction.getPublicKey()))
      transaction.asset.fundraiser = transaction.getPublicKey();
      transaction.nonce = transaction.nonce.toString();
      transaction.sign(networkIdentifier, wallet.passphrase);
      transaction.fee = transaction.minFee.toString();

      try {
        transaction.sign(networkIdentifier, wallet.passphrase);
        console.log(transaction)

        dispatch(Actions.doTransaction(transaction, api));
        console.log("modal")
      } catch (e) {
        console.error(e)
      }
    } else {
      console.log(wallet)
    }
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
            {activeStep === 2 && completedSteps() === totalSteps() && <Button
              variant="contained"
              color="secondary"
              onClick={handleFinish}
            >
              Finish
            </Button>}
          </div>
        </div>
      </div>
    </div>
  );
});
