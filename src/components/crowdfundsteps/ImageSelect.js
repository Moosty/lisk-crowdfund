import React from 'react';
import { useDispatch } from "react-redux";
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
import * as Actions from '../../store/actions';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as illustrations from 'react-undraw-illustrations';

const images = Object.keys(illustrations);

export const ImageSelect = withReducer('ImageSelect', reducer)(props => {
  const dispatch = useDispatch();

  return <Autocomplete
    fullWidth
    className="m-4"
    id="combo-box-demo"
    options={images}
    onChange={(event, newValue) => {
      dispatch(Actions.updateCrowdfundForm({image: newValue}));
    }}
    getOptionLabel={(option) => option
      .replace('Undraw', '')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
    }
    style={{width: 300}}
    renderInput={(params) => <TextField {...params} fullWidth label="Select Image" variant="outlined"/>}
  />;
});
