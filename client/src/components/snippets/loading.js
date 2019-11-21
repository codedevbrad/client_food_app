import React, {  useState , useEffect , Fragment } from 'react';
import { useStoreState , useStoreActions } from 'easy-peasy';

import './snippets.scss';

export const saveAnimation = ( call , state1 , state2 , next ) => {
          setTimeout( () => {
             call( state1 ); // completes edit progress
             setTimeout( () => {
                call( state2 ); // removes edit progress
                if ( next ) next();
              } , 1500 );
           } , 2000 );
}


export const Loading = ( props ) => {
  const { textState } = props;
  const text = !textState ? 'saving changed edits' : 'edits saved';

  useEffect( () => {
  }, [ textState ]);
  return (
        <div className="progress_bar">
            <li className="bar_icon" >
                  <i class="fas fa-circle-notch fa-spin"></i>
            </li>
            <div className="bar_text">
              <h3 className="progress_text"> {text} </h3>
            </div>
        </div>
  )
}
