import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import reducer from '../../store/reducers';
import withReducer from "../../store/withReducer";
import * as Actions from '../../store/actions';
import { useDispatch, useSelector } from "react-redux";


const categories = [
  {
    value: 'identity',
    label: 'Identity',
  },
  {
    value: 'gaming',
    label: 'Gaming',
  },
  {
    value: 'realestate',
    label: 'Real Estate',
  },
  {
    value: 'energy',
    label: 'Energy & Sustainability',
  },
  {
    value: 'government',
    label: 'Government & Public Sector',
  },
  {
    value: 'healthcare',
    label: 'Healthcare',
  },
  {
    value: 'finance',
    label: 'Finance',
  },
  {
    value: 'law',
    label: 'Law',
  },
  {
    value: 'entertainment',
    label: 'Media & Entertainment',
  },
];

export const StepGeneral = withReducer('setGeneral', reducer)((props) => {
  const dispatch = useDispatch();
  const form = useSelector(({blockchain}) => blockchain.crowdfund.createForm);

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <form className="flex flex-row w-full flex-wrap" noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        value={form.title}
        onChange={(e) => {
          if (e.target.value.length <= 50) {
            dispatch(Actions.updateCrowdfundForm({title: e.target.value}));
          }
        }}
        helperText={form.title ? `(${form.title.length}/50)` : `(0/50)`}
        fullWidth style={{marginBottom: 12}}/>
      <TextField
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={4}
        helperText={form.description ? `(${form.description.length}/∞)` : `(0/∞)`}
        value={form.description}
        onChange={(e) => dispatch(Actions.updateCrowdfundForm({description: e.target.value}))}
        variant="outlined"
        fullWidth
        style={{marginBottom: 12}}
      />
      <TextField
        id="outlined-select-currency"
        select
        label="Select"
        value={form.category}
        onChange={(e) => dispatch(Actions.updateCrowdfundForm({category: e.target.value}))}
        helperText="Please select your category"
        variant="outlined"
        fullWidth
        style={{marginBottom: 12}}
      >
        {categories.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-multiline-static"
        label="Project URL"
        placeholder="https://"
        helperText={form.site ? `(${form.site.length}/200)` : `(0/200)`}
        variant="outlined"
        value={form.site}
        onChange={(e) => {
          if (e.target.value.length <= 200) {
            dispatch(Actions.updateCrowdfundForm({site: e.target.value}))
          }
        }}
        fullWidth
        style={{marginBottom: 12}}
      />
    </form>
  );
});
