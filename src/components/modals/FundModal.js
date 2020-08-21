import { ButtonGroup, TextField, Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InfoIcon from "@material-ui/icons/Info";
import React, { useContext, useEffect, useState } from "react";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import * as Actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { FundTransaction, RegisterTransaction } from "@moosty/lisk-crowdfund-transactions";
import AppContext from "../../AppContext";
import { utils } from '@liskhq/lisk-transactions';

const { convertBeddowsToLSK } = utils;

export const FundModal = withReducer('fundModal', reducer)((props) => {
  const dispatch = useDispatch();
  const {api, networkIdentifier, epoch} = useContext(AppContext);
  const { open, type, fundraiser } = useSelector(({ modal }) => modal);
  const crowdfund = useSelector(({ blockchain }) => blockchain.crowdfunds.projects.find(c => c.publicKey === props.publicKey || c.publicKey === fundraiser));
  const { wallet } = useSelector(({ blockchain }) => blockchain);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [amount, setAmount] = useState(10);
  const [fee, setFee] = useState("0");

  useEffect(() => {
    if (password) {
      setPassphrase(wallet.account.username + password + wallet.account.username);
    }
  }, [password, wallet]);

  useEffect(() => {
    if (wallet && wallet.account && wallet.account.nonce) {
      try {
        signFundTx();
      } catch(e) { }
    }
  }, [password, passphrase, amount, message, wallet])

  const signFundTx = () => {
    const tx = {
      senderPublicKey: wallet.account.publicKey,
      networkIdentifier,
      nonce: wallet.account.nonce.toString(),
      passphrase: passphrase || wallet.passphrase,
      asset: {
        fundraiser: fundraiser,
        amount: amount.toString(),
        message
      }
    };
    const transaction = new FundTransaction(tx);
    transaction.nonce = transaction.nonce.toString();
    transaction.sign(networkIdentifier, wallet.passphrase || passphrase);
    transaction.fee = transaction.minFee.toString();
    setFee(transaction.minFee.toString())
    return transaction;
  }

  const handleConfirm = () => {
    const transaction = signFundTx();
    try {
      transaction.sign(networkIdentifier, wallet.passphrase || passphrase);
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
            dispatch(Actions.openModal('fundModal', props.publicKey))
          } else {
            dispatch(Actions.openModal('signup'))
          }
        }}
      >
        Back it
      </Button>
      <Dialog
        fullWidth
        open={open && type === "fundModal"}
        onClose={() => dispatch(Actions.closeModal())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Fund {crowdfund.asset.title}
        </DialogTitle>
        {/*<MenuCard type="voteItem" title="The Best sunglasses" />*/}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            value={amount}
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            autoFocus
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            value={message}
            type="text"
            onChange={(e) => setMessage(e.target.value)}
          />
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
          <Button disabled={(!wallet.passphrase && !passphrase) || !message || Number(amount) <= 0} onClick={handleConfirm} color="secondary" >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
