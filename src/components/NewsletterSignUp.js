import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

//* Newsletter popup              *//
//*   Elements:                   *//
//*     - ModalNewsletterSignUp   *//
//*     - NewsletterSignUp        *//

export const NewsletterSignUp = (props) => {
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
        {props.description}{" "}
      </p>

      <input
        type="email"
        className="border-solid border w-full rounded px-3 py-2"
        placeholder="Email"
      ></input>

      <button className="bg-red-600 text-white px-3 py-2 rounded w-full mt-4">
        Subscribe now!
      </button>
    </div>
  );
};
