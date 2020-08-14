import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import jsonp from "jsonp";
import queryString from "query-string";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import * as Actions from "../store/actions";
import { useDispatch } from "react-redux";
import LaunchRoundedIcon from "@material-ui/icons/LaunchRounded";
//* Newsletter popup              *//
//*   Elements:                   *//
//*     - ModalNewsletterSignUp   *//
//*     - NewsletterSignUp        *//

export const DemoInfo = withReducer(
  "DemoInfo",
  reducer
)((props) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded border-solid border-t-4 border-red-600 p-6 my-2">
      <div className="flex justify-between items-center">
        <h4 className="uppercase text-grey text-xs text-wide tracking-wide font-thin ">
          {props.tag}
        </h4>
        <IconButton onClick={() => props.close()}>
          <CloseIcon />
        </IconButton>
      </div>
      <h3 className="text-grey-dark text-sm font-medium font-sans leading-normal">
        {props.title}
      </h3>
      <p className="my-3 text-gray-600 font-light tracking-wide font-sans leading-normal text-sm">
        {props.description}
      </p>
      <p className="my-3 text-gray-600 font-light tracking-wide font-sans leading-normal text-sm">
        - Read the Blog <LaunchRoundedIcon />
      </p>
      <p className="my-3 text-gray-600 font-light tracking-wide font-sans leading-normal text-sm">
        - See other Apps <LaunchRoundedIcon style={{ fontSize: 18 }} />
      </p>
      <p className="my-3 text-gray-600 font-light tracking-wide font-sans leading-normal text-sm">
        - Subscribe to the Lisk Builders Program <LaunchRoundedIcon />
      </p>
      <button className="bg-red-600 text-white px-3 py-2 rounded w-full mt-4">
        Read the Blog
      </button>
    </div>
  );
});
