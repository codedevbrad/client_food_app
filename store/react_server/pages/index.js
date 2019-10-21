

import React, { useState } from 'react';

import Header from '../components/header/head';
import NavBar from '../components/header/navbar';
import CustomHead from 'next/head';

import '../static/css/app.css';

const Main = () => {

  return (

    <div id="Main">

      <Header title="welcome" />
      <NavBar />


      { /* csustom head tags */ }
      <CustomHead>
          <title> Custom </title>
      </CustomHead>

    </div>
  );
}

export default Main;
