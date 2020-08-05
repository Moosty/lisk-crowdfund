import React from 'react';

export const Container = (props) => {

  return <div className="
    container

    bg-red-500
      m-1 flex-col
      h-auto justify-center

    sm:bg-green-500
      sm:m-4 sm:mx-auto 

    md:bg-blue-500
      md:m-8 md:mx-auto

    lg:bg-pink-500
      lg:flex lg:flex-row lg:flex-wrap
      lg:m-8 lg:mx-auto

    xl:bg-teal-500 xl:mx-auto
      xl:p-8

    ">
    {props.children}
</div>;
}
