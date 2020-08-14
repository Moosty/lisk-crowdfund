import React, { cloneElement, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import withReducer from '../store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import * as Illustrations from 'react-undraw-illustrations';

export const ProjectImage = withReducer('ProjectImage', reducer)(props => {
  const dispatch = useDispatch();
  const [Image, setImage] = useState(Illustrations.UndrawAcceptTerms({
    primaryColor: "#4070f4",
    height: props.heigth,
  }));
  useEffect(() => {
    if (props.image) {
      setImage(Illustrations[props.image]({
        primaryColor: "#4070f4",
        height: props.height,
      }))
    }
  }, [props.image])

  return <div {...props}>
    {Image}
  </div>
});

