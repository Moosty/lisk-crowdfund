import { Button, TextField } from "@material-ui/core";
import React from "react";

export const NewsletterSignUp = (props) => {
  return (
    <div className="shadow rounded w-full md:w-1/4 border-solid border-t-4 border-purple-700 p-6 my-2">
      <div className="flex justify-between items-center">
        <h4 className="uppercase text-grey text-xs text-wide tracking-wide font-thin ">
          {props.tag}
        </h4>
        <span className="text-grey" aria-hidden="true">
          ×
        </span>
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

      <button className="bg-purple-600 text-white px-3 py-2 rounded w-full mt-4">
        Subscribe now!
      </button>
    </div>
  );
};
