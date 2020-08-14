import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import reducer from '../../store/reducers';
import withReducer from "../../store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/actions";
import { ProjectImage } from "../ProjectImage";
import { ImageSelect } from "./ImageSelect";
import { GithubPicker } from 'react-color';
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
  const [color, setColor] = useState("#4070f4")
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
      <ImageSelect selected={form.image} />
      <ProjectImage
        height='300px'
        image={form.image}
        className="w-4/5" style={{ backgroundColor: form.color}}/>
        <GithubPicker
          color={form.color}
          onChange={(c) => dispatch(Actions.updateCrowdfundForm({color: c.hex}))}
          colors={[
            "#4070f4", "#20c997", "#17a2b8", "#ffc107", "#F36A34", "#6c757d", "#ee4b4b",
          ]}
        />
      {/*<img src={form && form.image && form.image} className="w-4/5" />*/}
      {/*<input*/}
      {/*  accept="image/*"*/}
      {/*  className="hidden"*/}
      {/*  id="contained-button-file"*/}
      {/*  type="file"*/}
      {/*  onChange={(e) => {*/}
      {/*    getBase64(e.target.files[0], (result) => dispatch(Actions.updateCrowdfundForm({image: result})))*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<label className="m-5" htmlFor="contained-button-file">*/}
      {/*  <Button variant="contained" color="primary" component="span">*/}
      {/*    Upload Image*/}
      {/*  </Button>*/}
      {/*</label>*/}

    </form>
  );
});
