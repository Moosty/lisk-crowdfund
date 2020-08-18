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
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const {filter, status} = useParams();

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [category, setCategory] = React.useState("");

  const handleChange2 = (event) => {
    setCategory(event.target.value);
  };

  return <div className="flex flex-row">
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-label"
          value={status}
          onChange={(e) => {
            if (e.target.value === "all") {
              if (!filter) {
                history.push(`/`);
              } else {
                history.push(`/overview/${filter}`);
              }
            } else {
              history.push(`/overview/${filter || 'all'}/${e.target.value}`)
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
              if (!status) {
                history.push(`/`)
              } else {
                history.push(`/overview/all/${status}`)
              }
            } else {
              if (!status) {
                history.push(`/overview/${e.target.value}`)
              } else {
                history.push(`/overview/${e.target.value}/${status}`)
              }
            }
          }}
          label="Filter"
        >
          <MenuItem value="all">
            <em>all</em>
          </MenuItem>
          {categories.map(c => <MenuItem value={c.value}>{c.label}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  </div>;
});
