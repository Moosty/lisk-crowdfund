import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import React, { useEffect } from "react";

import { NewsletterSignUp } from "../index";
import * as Actions from "../../store/actions";
import reducer from "../../store/reducers";
import withReducer from "../../store/withReducer";

const useStyles = makeStyles((theme) => ({
  modal: {
    minWidth: "50rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const ModalNewsletterSignUp = withReducer(
  "ModalNewsletterSignUp",
  reducer
)((props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { open, type, newsletter } = useSelector(({ modal }) => modal);

  useEffect(() => {
    if (newsletter && !newsletter.submitted && (!newsletter.shown || newsletter.shown + 9999999 <= new Date().getTime())) {
      setTimeout(() => {
        openModal();
      }, newsletter.timeout);
    }
    if (!newsletter) {
      dispatch(Actions.initNewsletter());
    }
  }, [newsletter]);

  const openModal = () => {
    if (!open) {
      dispatch(Actions.openModal('ModalNewsletterSignUp'));
      dispatch(Actions.setShownNewsletter(new Date().getTime()));
    } else {
      setTimeout(() => {
        openModal();
      }, newsletter.timeout);
    }
  }

  return (
    <div>
      {/*<Button*/}
      {/*  variant="outlined"*/}
      {/*  color="secondary"*/}
      {/*  onClick={() => dispatch(Actions.openModal("ModalNewsletterSignUp"))}*/}
      {/*>*/}
      {/*  Modal TEst*/}
      {/*</Button>*/}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open && type === "ModalNewsletterSignUp"}
        onClose={() => dispatch(Actions.closeModal())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="w-full sm:w-9/12 xl:w-2/4 ">
            <NewsletterSignUp
              thankYou="Thank you for subscribing our newsletter!"
              title="Stay updated with the Community & the latest PoCs!"
              tag="UPDATE"
              description="Subscribe to our irregular newslettter about everything you need to know"
              close={() => dispatch(Actions.closeModal())}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
});
