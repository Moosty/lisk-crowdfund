import React, { useEffect } from 'react';
import { Container, SingleCard } from '../../components';
import withReducer from "../../store/withReducer";
import reducer from '../../store/reducers';
import * as Actions from '../../store/actions';
import { useDispatch, useSelector } from "react-redux";

export const SignIn = withReducer('signIn', reducer)((props) => {
  const dispatch = useDispatch();

  const account = useSelector(({blockchain}) => blockchain.wallet);

  useEffect(() => {
    console.log(account);
  }, [account]);

  useEffect(() => {
    dispatch(Actions.loadAccount('8531579280410192796L', Actions.setAccount));
  }, []);

  return <div>
  <Container>
  <SingleCard
  text="A new kind of mask. Zero compromise between breathing & looking great"
  title="The Face Mask - Premium look & Air Filtration"
  category="DEFI"
  image="/images/pexels-photo-3951901.jpeg" />

  <SingleCard
  text="A new kind of mask. Zero compromise between breathing & looking great"
  title="The Face Mask - Premium look & Air Filtration"
  category="DEFI"
  image="/images/pexels-photo-3951901.jpeg" />

  <SingleCard
  text="A new kind of mask. Zero compromise between breathing & looking great"
  title="The Face Mask - Premium look & Air Filtration"
  category="DEFI"
  image="/images/pexels-photo-3951901.jpeg" />

  </Container>
  <div className="mx-auto flex flex-wrap justify-center">

  </div>
</div>;
});
