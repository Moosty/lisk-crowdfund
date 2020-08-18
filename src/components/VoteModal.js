import { ButtonGroup, TextField, Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InfoIcon from "@material-ui/icons/Info";
import React, { useContext, useEffect, useState } from "react";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  VoteTransaction
} from "@moosty/lisk-crowdfund-transactions";
import AppContext from "../AppContext";
import { utils } from '@liskhq/lisk-transactions';
import {  withStyles } from '@material-ui/core/styles';
import { green, red, grey } from '@material-ui/core/colors';

const { convertBeddowsToLSK } = utils;

const RedButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);

const GreenButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

const GrayButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
    '&:hover': {
      backgroundColor: grey[700],
    },
  },
}))(Button);

export const VoteModal = withReducer('VoteModal', reducer)((props) => {
  const dispatch = useDispatch();
  const {api, networkIdentifier, epoch} = useContext(AppContext);
  const { open, type, fundraiser } = useSelector(({ modal }) => modal);
  const crowdfund = useSelector(({ blockchain }) => blockchain.crowdfunds.projects.find(c => c.publicKey === props.publicKey || c.publicKey === fundraiser));
  const { wallet } = useSelector(({ blockchain }) => blockchain);
  const [password, setPassword] = useState("");
  const [vote, setVote] = useState(1);
  const [passphrase, setPassphrase] = useState("");
  const [fee, setFee] = useState("0");

  useEffect(() => {
    if (password) {
      setPassphrase(wallet.username + password + wallet.username);
    }
  }, [password]);

  useEffect(() => {
    signVoteTx();
  }, [password, passphrase, vote])

  const signVoteTx = () => {
    const tx = {
      senderPublicKey: wallet.account.publicKey,
      networkIdentifier,
      nonce: wallet.account.nonce.toString(),
      passphrase: wallet.passphrase || passphrase,
      asset: {
        fundraiser: fundraiser,
        period: props.period,
        vote,
      }
    };
    const transaction = new VoteTransaction(tx);
    transaction.nonce = transaction.nonce.toString();
    transaction.sign(networkIdentifier, wallet.passphrase);
    transaction.fee = transaction.minFee.toString();
    setFee(transaction.minFee.toString())
    return transaction;
  }

  const handleConfirm = () => {
    const transaction = signVoteTx();
    try {
      transaction.sign(networkIdentifier, wallet.passphrase);
      dispatch(Actions.doTransaction(transaction, api));
      dispatch(Actions.closeModal(true))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="">
      <Button
        className=" "
        size="small"
        variant="contained"
        color="primary"
        style={{marginRight: 10}}
        onClick={() => {
          if (wallet && wallet.account && wallet.account.address) {
            dispatch(Actions.openModal('startModal', props.publicKey))
          } else {
            dispatch(Actions.openModal('signup'))
          }
        }}
      >
        Vote
      </Button>
      <Dialog
        fullWidth
        open={open && type === "startModal"}
        onClose={() => dispatch(Actions.closeModal())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Vote Project: `{crowdfund.asset.title}`
        </DialogTitle>
        {/*<MenuCard type="voteItem" title="The Best sunglasses" />*/}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
          Do you want a refund?
          <br />
            {vote !== 0 ? <GrayButton variant="contained" color="primary"
              onClick={() => setVote(0)}>Yes</GrayButton> :
              <GreenButton variant="contained" color="primary" disabled>Yes</GreenButton>}
            {vote !== 1 ? <GrayButton variant="contained" color="primary"
                onClick={() => setVote(1)}>No</GrayButton> :
              <RedButton variant="contained" color="primary" disabled >No</RedButton>}
          {wallet && !wallet.passphrase && <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            variant="outlined"
            fullWidth
          />}

          <div className="flex flex-col mt-2">
            <span className="text-gray-600 text-sm ">
              Transaction Fee:{" "}
              <Tooltip title="The transaction fee is the amount of tokens you will pay to perform this action. It will be paid in the native token.">
                <InfoIcon fontSizeSmall />
              </Tooltip>
            </span>
            <span className="text-red-600 text-sm font-bold">{convertBeddowsToLSK(fee)}CFT</span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(Actions.closeModal())} color="primary">
            Cancel
          </Button>
          <Button disabled={!wallet.passphrase && !passphrase} onClick={handleConfirm} color="secondary" >
            Confirm vote
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
