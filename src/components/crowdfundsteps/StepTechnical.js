import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import reducer from "../../store/reducers";
import withReducer from "../../store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/actions";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import MenuItem from "@material-ui/core/MenuItem";

export const StepTechnical = withReducer(
  "stepTechnical",
  reducer
)((props) => {
  const dispatch = useDispatch();
  const form = useSelector(({ blockchain }) => blockchain.crowdfund.createForm);

  const [possibleVotingPeriods, setPossibleVotingPeriods] = useState([]);

  useEffect(() => {
    console.log(form);
  }, [form]);

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
