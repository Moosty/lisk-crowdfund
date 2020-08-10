import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import reducer from '../../store/reducers';
import withReducer from "../../store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/actions";

export const StepTechnical = withReducer('stepTechnical', reducer)((props) => {
  const dispatch = useDispatch();
  const form = useSelector(({blockchain}) => blockchain.crowdfund.createForm);

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <form className="flex flex-row w-full flex-wrap" noValidate autoComplete="off">
      <TextField
        startAdornment={<InputAdornment position="start">LSK</InputAdornment>}
        id="outlined-basic"
        label="Target amount"
        variant="outlined"
        fullWidth
        type="number"
        value={form.goal}
        onChange={(e) => {
          dispatch(Actions.updateCrowdfundForm({goal: parseInt(e.target.value, 10)}));
        }}
        style={{marginBottom: 12}}/>
      <TextField
        id="outlined-multiline-static"
        label="Duration of project"
        variant="outlined"
        fullWidth
        value={form.periods}
        onChange={(e) => {
          dispatch(Actions.updateCrowdfundForm({periods: parseInt(e.target.value, 10)}));
        }}
        style={{marginBottom: 12}}
      />
      <TextField
        id="outlined-multiline-static"
        label="Amount of votings"
        variant="outlined"
        fullWidth
        type="number"
        value={form.periods / form.votings}
        onChange={(e) => {
          dispatch(Actions.updateCrowdfundForm({votings: parseInt(form.periods / e.target.value, 10)}));
        }}
        style={{marginBottom: 12}}
      />
    </form>
  );
});
