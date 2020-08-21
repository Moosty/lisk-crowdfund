import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { SignInForm } from '../index';
import withReducer from "../../store/withReducer";
import reducer from '../../store/reducers';
import * as Actions from '../../store/actions';
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    minWidth: '50rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const ModalSignIn = withReducer('ModalSignIn', reducer)(props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { wallet } = useSelector(({blockchain}) => blockchain);
  const { open, type } = useSelector(({modal}) => modal);
  return (
    <div>
      {wallet.account && wallet.account.address &&
      <Button variant="outlined" color="secondary" onClick={() => dispatch(Actions.logoutAccount())}>
        Sign out
      </Button>}
      {(!wallet.account || (wallet.account && !wallet.account.address)) &&
      <Button variant="outlined" color="secondary" onClick={() => dispatch(Actions.openModal('login'))}>
        Sign in
      </Button>}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open && (type === 'login' || type === 'signup')}
        onClose={() => dispatch(Actions.closeModal())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="w-full sm:w-9/12 xl:w-2/4 ">
            <SignInForm/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
});
