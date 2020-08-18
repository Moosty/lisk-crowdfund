import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { ProjectInfo, TimelineVertical } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
import { ProjectImage } from "app/components/ProjectImage";

export const Crowdfund = withReducer('Crowdfund', reducer)(props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { publicKey } = useParams();
  const crowdfund = useSelector(({blockchain}) => blockchain.crowdfunds.projects.find(p => p.publicKey === publicKey))
  const [image, setImage] = useState({
    type: "",
    color: "#ffffff",
  });

  useEffect(() => {
      if (crowdfund && crowdfund.asset && crowdfund.asset.image) {
        const imageSplit = crowdfund.asset.image.split("#");
        setImage({
          type: imageSplit[0],
          color: `#${imageSplit[1]}`,
        })
      }
  }, [crowdfund]);
  return <div className="bg-fixed sm:bg-scroll lg:m-5 pt-10">
    <div className="w-full mx-auto px-5 h-full flex flex-col lg:px-0 lg:w-4/6 lg:flex-row">
      <div
        className="w-full bg-contain lg:w-3/4  lg:bg-cover"
        // style={{
        //   backgroundImage: "url(/images/pexels-photo-3951901.jpeg)",
        // }}
      >
        {image && image.type && <ProjectImage
          onClick={() => history.push(`/crowdfund/${publicKey}`)}
          height='100%'
          width='100%'
          image={image.type}
          className="" style={{backgroundColor: image.color ? image.color : "#fff"}}/>}
      </div>
      <div
        className="w-full lg:w-3/4 lg:pt-0 lg:px-12 lg:p-10"
        style={{backgroundColor: "white"}}
      >
        <ProjectInfo publicKey={publicKey} crowdfund={crowdfund}/>
      </div>
    </div>

    <div className=" w-full px-5 lg:px-0 lg:w-4/6 mx-auto h-full flex flex-col ">
      <h1 className="my-8 font-bold text-lg text-center">
        Project Timeline{" "}
      </h1>
      <TimelineVertical/>
    </div>
  </div>;
});
