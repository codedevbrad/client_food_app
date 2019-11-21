import React, {  useState , useEffect , Fragment } from 'react';
import { useStoreState , useStoreActions } from 'easy-peasy';

import './snippets.scss';

const Modal = ( props ) => {

  const [isToggle , setToggle ] = useState(false);

  const toggleDropdown = ( e ) => {
      isToggle ? setToggle(false) : setToggle(true);
      if ( props.callback ) {
          props.callback( 'completed' );
      }
  }

  return (
    <Fragment>
        <li className={ props.listClass } data-access={ props.access } onClick={ e => toggleDropdown(e) }> { props.link } </li>
        { isToggle &&
        <div className="modal_all">
            <div className="modal_overlay" onClick={ e => setToggle( false ) }>  </div>
            <div className="modal_contain">
                 <div className={ `modal ` + props.id }>
                    { props.children }
                 </div>
            </div>
        </div>
        }
    </Fragment>
  )
}
export default Modal;
