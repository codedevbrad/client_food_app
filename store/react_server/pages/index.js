

import React, { useState , useEffect } from 'react';

import Header from '../components/header/head';
import NavBar from '../components/header/navbar';
import CustomHead from 'next/head';

import '../static/css/app.css';

const Main = () => {

  useEffect( () => {
    console.log('loaded component');
  }, []);

  return (

    <div id="Main">

      <Header title="welcome" />
      <NavBar />
      <h1> hi </h1>

      { /* csustom head tags */ }
      <CustomHead>
          <title> Custom </title>
      </CustomHead>

    </div>
  );
}

export default Main;
