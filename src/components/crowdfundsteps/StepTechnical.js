import { useDispatch, useSelector } from "react-redux";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";

import * as Actions from "../../store/actions";
import reducer from "../../store/reducers";
import withReducer from "../../store/withReducer";

export const StepTechnical = withReducer(
  "stepTechnical",
  reducer
)((props) => {
  const dispatch = useDispatch();
  const form = useSelector(({ blockchain }) => blockchain.crowdfund.createForm);
  const [possibleVotingPeriods, setPossibleVotingPeriods] = useState([]);

  useEffect(() => {
    if (form.periods) {
      const possiblePeriods = [];
      for (let i = 1; i < form.periods; i++) {
        if (form.periods % i === 0) {
          possiblePeriods.push(i);
        }
      }
      setPossibleVotingPeriods(possiblePeriods);
    } else {
      setPossibleVotingPeriods([]);
    }
  }, [form.periods]);

  return (
    <form
      className="flex flex-row w-full flex-wrap"
      noValidate
      autoComplete="off"
    >
      <div className="w-full flex mb-4 justify-center">
        <span className="flex text-center text-lg text-grey text-sm w-3/4">
          Specify the amount the would like to raise, how many months you need
          to build it and how many times a donator can vote.
        </span>
      </div>
      <TextField
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        id="outlined-start-adornment"
        label="Target amount"
        fullWidth
        type="number"
        value={form.goal}
        onChange={(e) => {
          dispatch(
            Actions.updateCrowdfundForm({
              goal: parseInt(e.target.value, 10),
            })
          );
        }}
        style={{ marginBottom: 12 }}
      />{" "}
      <TextField
        id="outlined-basic"
        InputProps={{
          endAdornment: <InputAdornment position="end">Months</InputAdornment>,
        }}
        label="Duration of project"
        variant="outlined"
        fullWidth
        value={form.periods}
        onChange={(e) => {
          dispatch(
            Actions.updateCrowdfundForm({
              periods: parseInt(e.target.value, 10),
            })
          );
        }}
        style={{ marginBottom: 12 }}
      />
      <div className="flex flex-row items-baseline">
        <span className="mr-1">Donators can vote every </span>
        <Tooltip
          title="Involve your funders in your project & keep them up to date"
          placement="top-start"
        >
          <span className="flex flex-row items-baseline ">
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              value={form.voting}
              onChange={(e) =>
                dispatch(
                  Actions.updateCrowdfundForm({ voting: e.target.value })
                )
              }
              helperText="Please select"
              variant="outlined"
              style={{ margin: 12 }}
            >
              {possibleVotingPeriods.map((period) => (
                <MenuItem key={period} value={period}>
                  {period}
                </MenuItem>
              ))}
            </TextField>
          </span>
        </Tooltip>
        <span className="ml-1">month(s).</span>
      </div>
    </form>
  );
});
