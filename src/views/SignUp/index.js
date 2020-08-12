import React from "react";
import { NewsletterSignUp } from "../../components";

export const SignUp = (props) => {
  return (
    <div className="h-screen justify-center items-center flex ">
      <NewsletterSignUp
        title="Stay updated with the Community & the latest PoCs!"
        tag="UPDATE"
        description="Subscribe to our irregular newslettter about everything you need to know"
      />
    </div>
  );
};
