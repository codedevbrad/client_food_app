
import React, { useState } from 'react';
import Head from 'next/head';

const AppHead= ( props ) => {

    return (

      <Head>
          <title> { props.title } </title>
          <meta charSet="UTF-8" />
          <meta name="viewport"    content="width=device-width, initial-scale=1" />
          <meta name="description" content="postmates landing page. order food , book a table" />
          <meta name="keywords"    content="food delivery restaurant" />
          <meta name="author"      content="postmates" />
     </Head>
    )
}

export default AppHead;
