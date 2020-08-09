import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLegt: 4,

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const Filter = (props) => {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-label"
          value={age}
          onChange={handleChange}
          label="Filter"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Only Projects </MenuItem>
          <MenuItem value={20}>Only Crowdfunds</MenuItem>
        </Select>
      </FormControl>

    </div>
  );
}
