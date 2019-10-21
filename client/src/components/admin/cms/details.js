
import React, { Fragment , useEffect , useState } from 'react';
import { useStore , useActions } from 'easy-peasy';
import axios from 'axios';

import Modal from '../../snippets/modal';
import './styles.scss';

import { details } from './detail_handlers';
const  { getDetails , postDetails , updateDetails , deleteDetails } = details;

const ContactDetails = ( ) => {

    const [ contacts , detailCUpdate ] = useState( [ ] );
    const [ inputChanged , updateChanged ] = useState( {} );
    const [ inputIsChanged , booleanChange ] = useState( false );

    const inputText = ( obj ) => {
        booleanChange( true );
        updateChanged( obj );
    }

    const updateContactHandler = ( ) => {
               const id = inputChanged.element.id ,
                  value = inputChanged.element.value;

               updateDetails( value , id , contacts )
                   .then( obj => {
                      // search contacts and update object.
                      var newArray = [ ...contacts ] ,
                             found = newArray.findIndex( x => x._id === id );
                             newArray[ found ] = obj;
                      detailCUpdate( newArray );
                   })
                   .catch( err => console.log( err ));
    }

    useEffect(() => {
          getDetails('contact')
               .then( contacts => detailCUpdate( contacts ))
               .catch( err => console.log( err ));
          // eslint-disable-next-line
    }, []);

    return (
        <section id="cms_contact" className="cms_content_section">
            <div className="content_section_fit">
                  <h1 className="fit_left"> contact information </h1>
                  { inputIsChanged &&
                  <span className="fit_right item_button_blue" onClick={ updateContactHandler } > update { inputChanged.type } </span>
                  }
            </div>

            { contacts.map( ( contact , index ) =>
                <div className="contact_each" key={ index }>
                    <h3> { contact.idType } </h3>
                    <input id={ contact._id } type="text" placeholder={ contact.infoDetail }
                           onChange={ e => inputText( { element : e.target , type : contact.idType  } )
                    }/>
                </div>
            )}
        </section>
    )
}

const OpeningTimes = ( ) => {

    const [ openings , detailOUpdate ]  = useState( [ ] );
    const [ openingNew , alteropening ] = useState('');

    const submitNewOpening = ( ) => {
          postDetails( openingNew , 'time' , 'openingDay' )
              .then( obj => {
                  detailOUpdate( [ ...openings , obj ]);
              })
              .catch( err => console.log( err ));
    }

    const alterExistingOpening = ( string , id ) => {
          updateDetails( id , string )
               .then( obj => {
                   var newOpenings = [ ...openings ];
                   var index = newOpenings.findIndex( each => each._id == obj._id );
                   newOpenings[ index ] = obj;
                   detailOUpdate( newOpenings );
               })
               .catch( err => console.log( err ));
    }
    const deleteExistingOpening = ( id ) => {
          deleteDetails( id )
              .then( obj => {
                  var found = openings.filter( each => each._id != obj._id);
                  detailOUpdate( found );
              })
              .catch( err => console.log( err ));

    }

    useEffect(() => {
          getDetails('time')
               .then( arr => detailOUpdate( arr ))
               .catch( err => console.log( err ));
          // eslint-disable-next-line
    }, []);

    return (
        <section id="cms_openingTimes"  className="cms_content_section">
            <div className="content_section_fit">
                  <h1 className="fit_left"> opening times </h1>
                  <Modal link={  <span className="fit_right item_button_blue"> add a time </span> } id="modal_order_menu_item_add">
                      <h3> create a new opening time </h3>
                      <input type="text" name="opening_time"
                                         placeholder="Monday - friday 12pm - 2.30pm"
                                         value={ openingNew }
                                         onChange={ e => alteropening( e.target.value )}/>
                      <div>
                          <button className="confirm" onClick={ submitNewOpening }> add </button>
                      </div>
                  </Modal>
            </div>

            { openings.map( ( opening , index ) =>
              <Modal link={
                <div className="opening_each" key={ index }>
                    <h3> { opening.infoDetail } </h3>
                </div>
              } id="modal_order_menu_item_add">

                  <h3> edit the existing opening time </h3>

                  <input type="text" name="product" placeholder={ opening.infoDetail }
                                     value={ openingNew }
                                     onChange={ e => alteropening( e.target.value )}
                                     />
                  <div>
                      <button className="confirm" onClick={ e => alterExistingOpening( opening._id ,  openingNew )}>
                            complete edit
                      </button>
                      <button className="delete"  onClick={ e => deleteExistingOpening( opening._id )}>
                           <i className="far fa-trash-alt"> </i>
                      </button>
                  </div>

              </Modal>
            )}

        </section>
    )
}

const CmsDefault = () => {

    return (
        <div className="admin_main_cms">

            <div className="cms_content">
                  <div className="content_section_head">
                      <h1> restaurant info </h1>
                      <p className="content_section_info">
                          decide when you're open and how people should get in contact with your business.
                      </p>
                  </div>

                  <ContactDetails />
                  <OpeningTimes />

            </div>

            <div className="cms_content">
                  <div className="content_section_head">
                      <h1> restaurant cms </h1>
                      <p className="content_section_info">
                          decide what content will be shown on the restaurant app.
                      </p>
                  </div>

                  <div id="cms_choices">
                        <div className="cms_each_field">
                              <h3> menus </h3>
                        </div>

                        <div className="cms_each_field">
                              <h3> food photos </h3>
                        </div>

                        <div className="cms_each_field">
                              <h3> about us </h3>
                        </div>

                  </div>
            </div>
        </div>
    )
}

export default CmsDefault;
