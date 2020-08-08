import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


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

export const StepGeneral = (props) => {
  const classes = useStyles();
    const [category, setCategory] = React.useState('Random');

    const handleChange = (event) => {
    setCategory(event.target.value);
}
  return (
    <form className="flex flex-row w-full flex-wrap" noValidate autoComplete="off">

      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        helperText="Max 255 Characters (1/255)"
        fullWidth style={{ marginBottom: 12 }} />
      <TextField
       id="outlined-multiline-static"
       label="Description"
       multiline
       rows={4}
       helperText="(1/255)"

       variant="outlined"
       fullWidth
       style={{ marginBottom: 12 }}
     />

     <TextField
       id="outlined-select-currency"
       select
       label="Select"
       value={category}
       onChange={handleChange}
       helperText="Please select your category"
       variant="outlined"
       fullWidth
       style={{ marginBottom: 12 }}
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
     helperText="(1/255)"
     variant="outlined"
     fullWidth
     style={{ marginBottom: 12 }}
   />
    </form>
  );
}
