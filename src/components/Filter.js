import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import reducer from "app/store/reducers";
import withReducer from "app/store/withReducer";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';

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

const categories = [
  {
    value: "identity",
    label: "Identity",
  },
  {
    value: "gaming",
    label: "Gaming",
  },
  {
    value: "realestate",
    label: "Real Estate",
  },
  {
    value: "energy",
    label: "Energy & Sustainability",
  },
  {
    value: "government",
    label: "Government & Public Sector",
  },
  {
    value: "healthcare",
    label: "Healthcare",
  },
  {
    value: "finance",
    label: "Finance",
  },
  {
    value: "law",
    label: "Law",
  },
  {
    value: "entertainment",
    label: "Media & Entertainment",
  },
];

export const Filter = withReducer('Filter', reducer)((props) => {
  const history = useHistory();
  const classes = useStyles();
  const {filter, status, type} = useParams();

  return <div className="flex flex-row">
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-label"
          value={status || "all"}
          onChange={(e) => {
            if (e.target.value === "all") {
              if (!filter && !type) {
                history.push(`/`)
              } else if (!filter) {
                history.push(`/overview/all/all/${type}`)
              } else if (!type) {
                history.push(`/overview/all/${filter}/all`)
              } else {
                history.push(`/overview/all/${filter}/${type}`)
              }
            } else {
              if (!filter && !type) {
                history.push(`/overview/${e.target.value}/all/all`)
              } else if (!filter) {
                history.push(`/overview/${e.target.value}/all/${type}`)
              } else if (!type) {
                history.push(`/overview/${e.target.value}/${filter}/all`)
              } else {
                history.push(`/overview/${e.target.value}/${filter}/${type}`)
              }
            }
          }}
          label="Type"
        >
          <MenuItem value="all">
            <em>all</em>
          </MenuItem>
          <MenuItem value={"new"}>Upcoming</MenuItem>
          <MenuItem value={"funded"}>Funded Projects</MenuItem>
          <MenuItem value={"open"}>Open Crowdfunds</MenuItem>
          <MenuItem value={"closed"}>Closed Projects</MenuItem>
        </Select>
      </FormControl>
    </div>
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-label"
          value={filter || "all"}
          onChange={(e) => {
            if (e.target.value === "all") {
              if (!status && !type) {
                history.push(`/`)
              } else if (!status) {
                history.push(`/overview/all/all/${type}`)
              } else if (!type) {
                history.push(`/overview/${status}/all/all`)
              } else {
                history.push(`/overview/${status}/all/${type}`)
              }
            } else {
              if (!status && !type) {
                history.push(`/overview/all/${e.target.value}/all`)
              } else if (!status) {
                history.push(`/overview/all/${e.target.value}/${type}`)
              } else if (!type) {
                history.push(`/overview/${status}/${e.target.value}/all`)
              } else {
                history.push(`/overview/${status}/${e.target.value}/${type}`)
              }
            }
          }}
          label="Filter"
        >
          <MenuItem value="all">
            <em>all</em>
          </MenuItem>
          {categories.map(c => <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-">
          My
        </InputLabel>
        <Select
          labelId="demo-simple-select-"
          id="demo-simple-select-label"
          value={type || "all"}
          onChange={(e) => {
            if (e.target.value === "all") {
              if (!status && !filter) {
                history.push(`/`)
              } else if (!status) {
                history.push(`/overview/all/${filter}/all`)
              } else if (!filter) {
                history.push(`/overview/${status}/all/all`)
              } else {
                history.push(`/overview/${status}/${filter}/all`)
              }
            } else {
              if (!status && !filter) {
                history.push(`/overview/all/all/${e.target.value}`)
              } else if (!status) {
                history.push(`/overview/all/${filter}/${e.target.value}`)
              } else if (!filter) {
                history.push(`/overview/${status}/all/${e.target.value}`)
              } else {
                history.push(`/overview/${status}/${filter}/${e.target.value}`)
              }
            }
          }}
          label="My"
        >
          <MenuItem value="all">
            <em>all</em>
          </MenuItem>
          <MenuItem value={"my"}>Crowdfunds</MenuItem>
          <MenuItem value={"backed"}>Backed projects</MenuItem>
        </Select>
      </FormControl>
    </div>
  </div>;
});
