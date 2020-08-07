import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';



const categories = [
  {
    value: 'identity',
    label: 'identity',
  },
  {
    value: 'gaming',
    label: 'gaming',
  },
  {
    value: 'real estate',
    label: 'real estate',
  },
  {
    value: 'energy & sustainability',
    label: 'energy & sustainability',
  },
  {
    value: 'government & public sector',
    label: 'government & public sector',
  },
  {
    value: 'healthcare',
    label: 'healthcare',
  },
  {
    value: 'finance',
    label: 'finance',
  },
  {
    value: 'law',
    label: 'law',
  },
  {
    value: 'Media & entertainment',
    label: 'Media & entertainment',
  },
];


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export const StepTechnical = (props) => {
  const classes = useStyles();
    const [category, setCategory] = React.useState('Random');

    const handleChange = (event) => {
    setCategory(event.target.value);
}
  return (
    <form className="flex flex-row w-full flex-wrap" noValidate autoComplete="off">

      <TextField
      startAdornment={<InputAdornment position="start">Lsk</InputAdornment>}
       id="outlined-basic" label="Target amount" variant="outlined" fullWidth style={{ marginBottom: 12 }} />
      <TextField
       id="outlined-multiline-static"
       label="Duration of project"


       variant="outlined"
       fullWidth
       style={{ marginBottom: 12 }}
     />
     <TextField
      id="outlined-multiline-static"
      label="Amount of votings"


      variant="outlined"
      fullWidth
      style={{ marginBottom: 12 }}
    />





    </form>
  );
}
