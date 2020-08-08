import React from 'react';

export const Container = (props) => {

  return (
  <div className="
    container

      m-1 flex-col
      h-auto justify-center

      sm:m-4 sm:mx-auto sm:justify-center

      md:m-8 md:mx-auto md:justify-center

      lg:flex lg:flex-row lg:flex-wrap
      lg:m-8 lg:mx-auto lg:justify-center

    xl:mx-auto
      xl:p-8

    ">
    {props.children}
</div>
);
}
