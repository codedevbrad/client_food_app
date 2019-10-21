import React, {  useState , useEffect , Fragment } from 'react';
import { useStore , useActions } from 'easy-peasy';

import './snippets.scss';

const Dropdown = ( props ) => {

  const [isToggle , setToggle ] = useState(false);

  const toggleDropdown = ( e ) => {
    isToggle ? setToggle(false) : setToggle(true);
  }

  return (
    <div className="dropdown">
      <div className={props.class } onClick={ e => toggleDropdown(e) }> { props.link } </div>
          { isToggle &&
             <Fragment>
             { props.element }
             </Fragment>
          }
    </div>
  )
}
export default Dropdown;
