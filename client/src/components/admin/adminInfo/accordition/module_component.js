import React, { Component , Fragment , useEffect , useState , useRef } from 'react';
import './module_styling.scss';

const Accordition = ( { title  , children , containerClass } ) => {

    const elementRef = useRef( null );

    const onToggle = ( ) => {
      let panel = elementRef.current;

      if (panel.style.maxHeight) {
         panel.style.maxHeight = null;
       } else {
         panel.style.maxHeight = panel.scrollHeight + "px";
       }
    }

    return (
        <div className={ `accordion ${ containerClass } ` } onClick={ ( ) => onToggle() }>
              <div> { title }</div>
              <div ref={ elementRef } className="panel">
                  { children }
              </div>
        </div>
    )
}

export default Accordition;
