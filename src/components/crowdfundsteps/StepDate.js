import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import reducer from '../../store/reducers';
import withReducer from "../../store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/actions";
import Button from "@material-ui/core/Button";

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
    margin: theme.spacing(2),
  },
}));

export const StepDate = withReducer('stepDate', reducer)((props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const form = useSelector(({blockchain}) => blockchain.crowdfund.createForm);

  useEffect(() => {
    console.log(form);
  }, [form]);

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  return (
    <form className="flex flex-row w-full justify-center flex-wrap" noValidate>
      <TextField
        fullWidth
        label="Start Date"
        type="datetime-local"
        variant="outlined"

        // defaultValue="2017-05-24T10:30"
        value={form.startDate}
        onChange={(e) => {
          dispatch(Actions.updateCrowdfundForm({startDate: e.target.value}));
        }}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {/*<TextField*/}
      {/*  id="datetime-local"*/}
      {/*  label="End Date"*/}
      {/*  type="datetime-local"*/}
      {/*  defaultValue="2017-05-24T10:30"*/}
      {/*  className={classes.textField}*/}
      {/*  InputLabelProps={{*/}
      {/*    shrink: true,*/}
      {/*  }}*/}
      {/*/>*/}
      <img src={form && form.image && form.image} className="w-4/5" />
      <input
        accept="image/*"
        className="hidden"
        id="contained-button-file"
        type="file"
        onChange={(e) => {
          getBase64(e.target.files[0], (result) => dispatch(Actions.updateCrowdfundForm({image: result})))
        }}
      />
      <label className="m-5" htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>

    </form>
  );
});
