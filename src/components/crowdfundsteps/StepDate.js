import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 'auto',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export const StepDate = (props) => {
  const classes = useStyles();

  return (
      <form className={classes.container} noValidate>
        <div className="flex flex-col mx-6">
        <TextField
          id="datetime-local"
          label="Start Date"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="datetime-local"
          label="End Date"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        </div>
        <div className="flex flex-col">
        <h1>Upload Image</h1>
        <Button variant="contained" color="primary" style={{marginRight: 10}}>
            UPLOAD
          </Button>
        </div>
      </form>
  );
}
