import { Link, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  textfield: {
    color: "white",
    backgroundColor: "white",
  },
}));

export const Footer = (props) => {
  const classes = useStyles();

  return (
    <div className=" w-full bg-gray-900 text-white p-8 text-left">
      <div className="mb-6">
        {" "}
        <img className="w-1/12" src="/images/moosty-logo-mooi.png" />
      </div>
      <div className="sm:flex mb-4">
        <div className="sm:w-1/4 h-auto">
          <div className="text-gray-600 font-normal text-base uppercase mb-2">
            LiskCrowd
          </div>
          <ul className="list-reset leading-normal">
            <li className=" cursor-pointer  text-base text-gray-600">
              <Link
                href="#"
                variant="inherit"
                target="_blank"
                rel="noopener"
                rel="noreferrer"
                color="inherit"
              >
                Read the blog{" "}
              </Link>
            </li>
            <li className=" cursor-pointer  text-base text-gray-600">
              <Link
                href="#"
                variant="inherit"
                target="_blank"
                rel="noopener"
                rel="noreferrer"
                color="inherit"
              >
                Find the code on Github{" "}
              </Link>{" "}
            </li>
            <li className=" cursor-pointer  text-base text-gray-600">
              <Link
                href="#"
                variant="inherit"
                target="_blank"
                rel="noopener"
                rel="noreferrer"
                color="inherit"
              >
                Custom Transactions{" "}
              </Link>{" "}
            </li>
            <li className="  cursor-pointer text-base text-gray-600">
              <Link
                href="#"
                variant="inherit"
                target="_blank"
                rel="noopener"
                rel="noreferrer"
                color="inherit"
              >
                About the project team{" "}
              </Link>{" "}
            </li>
          </ul>
        </div>
        <div className="sm:w-1/4 h-auto sm:mt-0 mt-8">
          <div className="text-gray-600 font-normal text-base uppercase mb-2">
            Lisk
          </div>
          <ul className="list-reset leading-normal">
            <li className=" cursor-pointer  text-base text-gray-600">
              <Link
                href="#"
                variant="inherit"
                target="_blank"
                rel="noreferrer"
                color="inherit"
              >
                What is Lisk?
              </Link>
            </li>
            <li className=" cursor-pointer  text-base text-gray-600">
              <Link
                href="#"
                variant="inherit"
                target="_blank"
                rel="noopener"
                rel="noreferrer"
                color="inherit"
              >
                What is blockchain?
              </Link>{" "}
            </li>
            <li className=" cursor-pointer  text-base text-gray-600">
              <Link
                href="#"
                variant="inherit"
                target="_blank"
                rel="noopener"
                rel="noreferrer"
                color="inherit"
              >
                Lisk SDK Documentation
              </Link>
            </li>
            <li className=" cursor-pointer  text-base text-gray-600">
              <Link
                href="#"
                variant="inherit"
                target="_blank"
                rel="noopener"
                rel="noreferrer"
                color="inherit"
              >
                Lisk Builders Program
              </Link>{" "}
            </li>
          </ul>
        </div>
        <div className="sm:w-1/4 h-auto sm:mt-0 mt-8">
          <div className="text-gray-600 mb-2 font-normal text-base uppercase">
            Moosty
          </div>
          <ul className="list-reset leading-normal">
            <li className="cursor-pointer text-base text-gray-600">
              <Link
                href="#"
                variant="inherit"
                target="_blank"
                rel="noopener"
                rel="noreferrer"
                color="inherit"
              >
                About the team
              </Link>
            </li>
            <li className=" cursor-pointer text-base text-gray-600">
              <Link
                href="#"
                variant="inherit"
                target="_blank"
                rel="noopener"
                rel="noreferrer"
                color="inherit"
              >
                See Projects
              </Link>
            </li>
            <li className="className cursor-pointer text-base text-gray-600">
              <Link
                href="#"
                variant="inherit"
                target="_blank"
                rel="noopener"
                rel="noreferrer"
                color="inherit"
              >
                Get in touch
              </Link>
            </li>
          </ul>
        </div>

        <div className="sm:w-1/2 sm:mt-0 mt-8 h-auto">
          <div className="text-gray-600 font-normal text-base mb-2 uppercase ">
            Newsletter
          </div>
          <p className="text-gray-500 text-base leading-normal">
            Stay updated with Moosty & all projects being released.{" "}
          </p>
          <div className="mt-4 flex">
            <TextField
              id="filled-secondary"
              label="Email address"
              variant="filled"
              color="secondary"
              InputProps={{
                className: classes.textfield,
              }}
            />
            <Button variant="contained" color="secondary">
              Subscribe
            </Button>{" "}
          </div>
          <div className="text-gray-600 font-normal text-base mb-2 mt-4 uppercase ">
            Socials
          </div>
          <div className="w-full justify-center ">
            <LinkedInIcon className="cursor-pointer mr-4 text-gray-600 " />
            <TwitterIcon className="cursor-pointer mr-4 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
