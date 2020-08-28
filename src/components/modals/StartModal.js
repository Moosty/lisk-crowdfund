import { ButtonGroup, TextField, Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InfoIcon from "@material-ui/icons/Info";
import React, { useContext, useEffect, useState } from "react";
import withReducer from "app/store/withReducer";
import reducer from "app/store/reducers";
import * as Actions from "app/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { StartTransaction } from "@moosty/lisk-crowdfund-transactions";
import AppContext from "../../AppContext";
import { toTimeStamp } from "app/utils";
import { utils } from '@liskhq/lisk-transactions';
const { convertBeddowsToLSK, convertLSKToBeddows } = utils;

export const StartModal = withReducer('StartModal', reducer)((props) => {
  const dispatch = useDispatch();
  const {api, networkIdentifier, epoch} = useContext(AppContext);
  const { open, type, fundraiser } = useSelector(({ modal }) => modal);
  const crowdfund = useSelector(({ blockchain }) => blockchain.crowdfunds.projects.find(c => c.publicKey === props.publicKey || c.publicKey === fundraiser));
  const { wallet } = useSelector(({ blockchain }) => blockchain);
  const [password, setPassword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [fee, setFee] = useState("0");

  useEffect(() => {
    if (password) {
      setPassphrase(wallet.username + password + wallet.username);
    }
  }, [password]);

  useEffect(() => {
    signStartTx();
  }, [password, passphrase, startDate])

  const signStartTx = () => {
    const tx = {
      senderPublicKey: wallet.account.publicKey,
      networkIdentifier,
      nonce: wallet.account.nonce.toString(),
      passphrase: wallet.passphrase || passphrase,
      asset: {
        fundraiser: fundraiser,
        timestamp: toTimeStamp(epoch, startDate),
      }
    };
    const transaction = new StartTransaction(tx);
    transaction.nonce = transaction.nonce.toString();
    transaction.sign(networkIdentifier, wallet.passphrase);
    transaction.fee = transaction.minFee.toString();
    setFee(transaction.minFee.toString())
    return transaction;
  }

  const handleConfirm = () => {
    const transaction = signStartTx();
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
        Start Project
      </Button>
      <Dialog
        fullWidth
        open={open && type === "startModal"}
        onClose={() => dispatch(Actions.closeModal())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Start Project: `{crowdfund.asset.title}`
        </DialogTitle>
        {/*<MenuCard type="voteItem" title="The Best sunglasses" />*/}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
          <TextField
            fullWidth
            label="Start Date"
            type="datetime-local"
            variant="outlined"

            // defaultValue="2017-05-24T10:30"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
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
          <Button disabled={(!wallet.passphrase && !passphrase) || !startDate} onClick={handleConfirm} color="secondary" >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
