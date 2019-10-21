
import React, { useState } from 'react';
import Link from 'next/link';

const NavBar = ( ) => {

    return (

      <nav>
         <ul>
            <li> <Link href="/"> main </Link> </li>
            <li> <Link href="/about"> about </Link> </li>
            <li> <Link href="/delivery"> order food  </Link> </li>
         </ul>
      </nav>
    )
}

export default NavBar;
