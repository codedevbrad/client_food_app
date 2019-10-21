import React, { Fragment , useEffect , useState } from 'react';
import { useStoreState , useStoreActions } from 'easy-peasy';
import axios from 'axios';

import Modal from '../../snippets/modal';
import { orders , menus } from './order_handlers.js';

import './orders.scss';


const Orders_info = ( ) => {

    return (
        <section id="orders_left">
            <h1> order info </h1>
            <p className="content_section_info"> need to relay any important information about
                food or
                delivery information
            </p>
        </section>
    )
}


const Order_menu_items = ( props ) => {

    // food menu item input values
    const [ newProductVal , alterproductVal ] = useState('');
    const [ newPriceVal   , alterpriceVal ] = useState('');
    const element = props.items;

    const stock = ( element ) => {

    }

    return (
        <ul className="order_menu_each_list" id={ `menuItem-` + props.index } key={ props.index }>
              { element.map( ( elementItem , itemIndex ) =>
                    <li key={ itemIndex }>
                          <span> { elementItem.product } </span>
                          <div className="order_each_price">
                             { `£`+ elementItem.price }
                          </div>

                          <ul className="order_each_quantity_counter list_buttons">

                              <Modal link={ <i className="fas fa-edit"> </i> } id="modal_order_menu_item_add">
                                  <h3> edit { elementItem.product } name </h3>

                                  <input type="text" name="product"
                                                     placeholder={ elementItem.product }
                                                     value={ newProductVal }
                                                     onChange={ e => alterproductVal( e.target.value )}/>
                                  <h4> product price </h4>
                                  <input type="text" name="price" value={ newPriceVal }
                                                     onChange={ e => alterpriceVal( e.target.value ) }
                                                     placeholder={ elementItem.price } />

                                  <div className="list_buttons quantity_counter_buttons">
                                      <li onClick={ e => stock( elementItem ) } className="item_button_blue"> is out of stock </li>
                                      <li onClick={ e => stock( elementItem ) }> hide from menu  </li>
                                  </div>

                                  <div>
                                      <button className="confirm"> complete edit </button>
                                  </div>

                              </Modal>

                              <Modal link={ <i className="far fa-trash-alt"></i> } id="modal_order_menu_item_add">
                                  <h3> delete { elementItem.product } </h3>
                                  <div>
                                    <button className="delete"> delete </button>
                                  </div>
                              </Modal>
                          </ul>
                    </li>
              )}
         </ul>
    )
}

const Orders = () => {

      const logError = useStoreActions( actions => actions.logError );
      const [ orders , populateOrders ] = useState( [] );
      const { getOrderMenu , postOrderMenu , postOrderMenuItem , alterOrderMenu } = menus;

      // food menu input values
      const [ showNewSection , toggleSection ] = useState( false );
      const [ newSectionVal  , changeNewSectionVal ] = useState( '' );
      // food menu item input values
      const [ newProductVal  , alterproductVal ] = useState('');
      const [ newPriceVal    , alterpriceVal ]   = useState('');

      // show / hide food menu sections
      const accordToggle = ( target ) => {
          const targetEl = document.getElementById( target );
          targetEl.style.display = targetEl.style.display === 'block' ? 'none' : 'block';
      }

      const newSection = ( ) => { toggleSection( !showNewSection ); }

      const submitnewSection = ( ) => {
            postOrderMenu( newSectionVal )
               .then( item => {
                  populateOrders( [ ...orders , item ]);
                  toggleSection( false );
               })
               .catch( err => console.log( err ));
      }

      const submitnewItem = ( id ) => {
          postOrderMenuItem(  { product: newProductVal , price : newPriceVal , id })
              .then( obj => {
                  var found = orders.filter( each => each._id === id )[0];
                  found.sectionItems.push( obj );
                  alterproductVal(''); alterpriceVal('');
              })
              .catch( err => console.log( err ));
      }

      const alterMenu = ( id  , type , string ) => {
           alterOrderMenu( id , type , string )
                .then( menuItem => {
                    if ( type === 'delete') {
                        var found = orders.filter( each => each._id != menuItem._id);
                        populateOrders( found );

                    } else if ( type === 'post' ) {

                        var newOrders = [ ...orders ];
                        var index = newOrders.findIndex( each => each._id == menuItem._id );
                        newOrders[ index ] = menuItem;
                        populateOrders( newOrders );
                    }
                })
                .catch( err => console.log( err ));
      }

      useEffect(() => {
           getOrderMenu()
                .then(  arr => populateOrders( arr ))
                .catch( err => console.log( err ));
           // eslint-disable-next-line
      }, []);

  return (
      <div className="admin_main_orders">

            <Orders_info />

            <section id="orders_menu">

                <div className="topLevel_menu_head">
                  <h1> orders menu </h1>
                  <span className="item_button_blue" onClick={ e => newSection() }> new section </span>
                </div>

                { showNewSection &&
                  <section className="order_section_each new_order_section">
                          <input type="text" placeholder="name your new section" name="section" value={ newSectionVal } onChange={ e => changeNewSectionVal( e.target.value )} />
                          <button onClick={ submitnewSection }> create </button>
                  </section>
                }
                <div id="bottomLevel_menu">
                    { orders.map( ( element , index ) =>
                        <section className="order_section_each" key={ index }>
                            <div className="order_menu_each_accord">
                               <h3> { element.sectionName } </h3>
                               <ul className="list_buttons">
                                  <li onClick={ e => accordToggle( 'menuItem-'+index ) }> <i className="fas fa-angle-down"></i> </li>

                                  <Modal link={ <i className="fas fa-edit"> </i> } id="modal_order_menu_item_add">
                                      <h3> edit { element.sectionName } name </h3>

                                      <input type="text" name="product"
                                                         placeholder={ element.sectionName }
                                                         value={ newSectionVal }
                                                         onChange={ e => changeNewSectionVal( e.target.value )} />

                                      <div>
                                          <button className="confirm" onClick={ e => alterMenu( element._id , 'post' , newSectionVal )}>
                                                complete edit
                                          </button>
                                          <button className="delete"  onClick={ e => alterMenu( element._id , 'delete' )}>
                                               <i className="far fa-trash-alt"> </i>
                                          </button>
                                      </div>

                                  </Modal>

                                  <Modal link={ <i className="fas fa-plus"> </i> } id="modal_order_menu_item_add">
                                      <h3> add item to { element.sectionName } </h3>
                                      <h4> product name </h4>
                                      <input type="text" name="product" placeholder="eg: steak , chips and onion rings" value={ newProductVal } onChange={ e => alterproductVal( e.target.value )}/>
                                      <h4> product price </h4>
                                      <input type="text" name="price"   placeholder="eg: 2.99" value={ newPriceVal } onChange={ e => alterpriceVal( e.target.value ) }/>
                                      <div>
                                          <button className="confirm" onClick={ e => submitnewItem( element._id )}> create item </button>
                                      </div>
                                  </Modal>
                               </ul>
                            </div>

                           <Order_menu_items items={ element.sectionItems } index={ index }/>

                        </section>
                    )}
                </div>

            </section>
      </div>
  )
}

export default Orders;
