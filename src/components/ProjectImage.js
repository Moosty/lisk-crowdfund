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
    width: props.width,
  }));
  const [background, setBackground] = useState("fff");

  useEffect(() => {
    if (props.image) {
      const image = props.image.split("#");
      setImage(Illustrations[image[0]]({
        primaryColor: "#4070f4",
        height: props.height,
        width: props.width,
      }));
      setBackground(image[1]);
    }
  }, [props.image])

  return <div style={{backgroundColor: background}} {...props}>
    {Image}
  </div>
});

