import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import jsonp from 'jsonp';
import queryString from 'query-string';
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import * as Actions from "../store/actions";
import { useDispatch } from "react-redux";
//* Newsletter popup              *//
//*   Elements:                   *//
//*     - ModalNewsletterSignUp   *//
//*     - NewsletterSignUp        *//

const settings = {
  id: "e8376cfa97",
  u: "3f58c59455fea960d93dd9a9d",
  url: "https://liskcenter.us3.list-manage.com/subscribe/post-json?u=3f58c59455fea960d93dd9a9d&id=e8376cfa97"
}

export const NewsletterSignUp = withReducer('NewsLetterSignUp', reducer)((props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [thankYou, setThankYou] = useState(false);
  const submitForm = () => {
    jsonp(`${settings.url}&${queryString.stringify({MERGE0: email})}`, { param: 'c' }, (err, data) => {
      if (err) {
        props.close();
      } else {
        setThankYou(true);
      }
      dispatch(Actions.setSubmittedNewsletter());
    });
  }

  return (
    <div className="bg-white rounded border-solid border-t-4 border-red-600 p-6 my-2">
      <div className="flex justify-between items-center">
        <h4 className="uppercase text-grey text-xs text-wide tracking-wide font-thin ">
          {props.tag}
        </h4>
        <IconButton onClick={() => props.close()}>
          <CloseIcon/>
        </IconButton>
      </div>
      <h3 className="text-grey-dark text-sm font-medium font-sans leading-normal">
        {!thankYou && props.title}
        {thankYou && props.thankYou}
      </h3>
      <p className="my-3 text-gray-600 font-light tracking-wide font-sans leading-normal text-sm">
        {!thankYou && props.description}
      </p>

      {!thankYou && <input
        type="email"
        className="border-solid border w-full rounded px-3 py-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />}

      {!thankYou && <button onClick={submitForm} className="bg-red-600 text-white px-3 py-2 rounded w-full mt-4">
        Subscribe now!
      </button>}
    </div>
  );
});
