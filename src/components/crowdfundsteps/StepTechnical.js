import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import reducer from "../../store/reducers";
import withReducer from "../../store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/actions";
import { InputSelect } from "../";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";

export const StepTechnical = withReducer(
  "stepTechnical",
  reducer
)((props) => {
  const dispatch = useDispatch();
  const form = useSelector(({ blockchain }) => blockchain.crowdfund.createForm);

  useEffect(() => {
    console.log(form);
  }, [form]);

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
      <TextField
        id="outlined-multiline-static"
        label="Amount of votings"
        variant="outlined"
        fullWidth
        type="number"
        value={form.periods / form.votings}
        onChange={(e) => {
          dispatch(
            Actions.updateCrowdfundForm({
              votings: parseInt(form.periods / e.target.value, 10),
            })
          );
        }}
        style={{ marginBottom: 12 }}
      />
      <div className="flex flex-row mt-2">
        <span>Donators can vote every </span>
        <InputSelect />
        <span>month(s).</span>
      </div>
      <Tooltip
        title="Involve your funders in your project & keep them up to date"
        placement="top-start"
      >
        <InfoIcon />
      </Tooltip>
    </form>
  );
});
