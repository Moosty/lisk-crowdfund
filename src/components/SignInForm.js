import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import withReducer from "../store/withReducer";
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import { getPrivateAndPublicKeyFromPassphrase } from "@liskhq/lisk-cryptography";
import { useUsername } from "../hooks/lisk-hooks/username";
import { getAddressFromPublicKey } from "@liskhq/lisk-cryptography/dist-node";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://moosty.com/">
        LiskCrowd made by Moosty
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '65vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignInForm = withReducer('SignInForm', reducer)(props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ password, setPassword ] = useState("");
  const [ password1, setPassword1 ] = useState("");
  const [ passphrase, setPassphrase ] = useState("");
  const [ error, setError ] = useState("");
  const [ accountKeys, setKeys ] = useState(null);
  const [ address, setAddress ] = useState("");
  const { type } = useSelector(({modal}) => modal);
  const [{ exist, username }, setUsername] = useUsername();

  useEffect(() => {
    if (type === 'login' && accountKeys && accountKeys.publicKey) {
      setAddress(getAddressFromPublicKey(accountKeys.publicKey));
    } else if (type === 'signup') {
      if (exist) {
        setError(`Username already in use please login or choose a different name`);
      } else {
        setError('');
      }
    }
  }, [exist]);

  useEffect(() => {
    setPassphrase(`${username}${password}${username}`);
  }, [username, password, type]);

  useEffect(() => {
      if (passphrase) {
        setKeys(getPrivateAndPublicKeyFromPassphrase(passphrase));
      }
  }, [passphrase]);

  useEffect(() => {
    // todo check if account exists
    // todo check if username exists with same publickey
    console.log(accountKeys)
  }, [accountKeys]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={false} md={6} className={classes.image} />
      <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <b>{error}</b>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {type === 'login' && `Sign In`}
            {type === 'signup' && `Sign Up`}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {type === 'signup' && <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Repeat Password"
              type="password"
              id="password2"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />}
            {type === 'login' && <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />}
            {type === 'login' && <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>}
            {type === 'signup' && <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>}
            <Grid container>
              <Grid item>
                {type === 'login' && <Link href="#" onClick={() => dispatch(Actions.openModal('signup'))} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>}
                {type === 'signup' && <Link href="#" onClick={() => dispatch(Actions.openModal('login'))} variant="body2">
                  {"Already have an account? Sign In"}
                </Link>}
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
});
