import React, { Component , Fragment , useEffect , useState } from 'react';
import { useStoreState , useStoreActions } from 'easy-peasy';
import axios from 'axios';
import Modal from '../../snippets/modal';
import { Loading , saveAnimation } from '../../snippets/loading';
import Tooltip from '../../snippets/tooltips';

import { SortableContainer, SortableElement , arrayMove } from 'react-sortable-hoc';

import { menuItem , menus } from './order_handlers.js';
import './orders.scss';

const OrderDays = ( props ) => {

      const [ weekdaysActive , setWeekdaysActive ] = useState( [
          { day: 'sunday'   , open: true } , { day: 'monday'   , open: false } , { day: 'tuesday' , open: false } ,
          { day: 'wednesday', open: true } , { day: 'thursday' , open: true }  , { day: 'friday'  , open: true } ,
          { day: 'saturday' , open: true }
      ] );
      useEffect( ( ) => {

      }, []);

      return (
        <div id="orderActive_section">
            <div className="content_section_head">
                <h1 className="title-m"> decide when to take orders </h1>
                <p className="content_section_info p-m">
                    decide when you're open and how people should get in contact with your business.
                </p>
            </div>
            <ul className="orderActive_section_ul">
                { weekdaysActive.map( ( eachDay , index ) =>
                    <li key={ index } className={ eachDay.open ? 'day_is_active' : '' }>  { eachDay.day } </li>
                )}
            </ul>
        </div>
      )
}

const Orders_info = ( props ) => {

      return (

      <section id="orders_left">
        <h1> order info </h1>

        <OrderDays />

        <div id="coupons_section">
            <div className="content_section_head">
                <h1 className="title-m"> order coupons </h1>
                <p className="content_section_info p-m">
                    decide what coupons should be active.
                </p>
            </div>
            <ul className="coupons_section_main">
                    <li> <div> </div> </li>
                    <li> <div> </div> </li>
                    <li> <div> </div> </li>

                    <li> <div> </div> </li>
                    <li> <div> </div> </li>
                    <li> <div> </div> </li>
            </ul>
        </div>
        <div id="deals_section">
            <div className="content_section_head">
                <h1 className="title-m"> create deals </h1>
                <p className="content_section_info p-m">
                    decide when you're open and how people should get in contact with your business.
                </p>
            </div>
            <div className="deals_section_main">

            </div>
        </div>
       </section>
      )
}

const Order_menu_items = ( props ) => {
    const { items , sectionId , populateOrders } = props;

    const { getOrderMenu } = menus;
    const { editMenuItem , removeMenuItem , cloudinaryUpload } = menuItem;

    // food menu item input values...
    const [ newProductVal , alterproductVal ] = useState('');
    const [ newPriceVal   , alterpriceVal ] = useState('');
    const [ imageVal      , alterImgVal   ] = useState('');
    const [ stockValues   , setStocksVal  ] = useState( [] ); // 0 = stock , 1 = menushow

    // food menu item switch
    const [ renderPhoto  , switchPhotoshow ] = useState( false );

    // form Load state = orderSection / true = starting , false = finished. [0] = show or hide [1] change text
    const [ saveWillStart , saveWillChange ] = useState( [ false , false ] );
    const [ delWillStart  , delWillChange  ] = useState( [ false , false ] );

    // sets alterered object when clicking item
    const setValues = ( e , obj ) => {
          // only allow the edit button to reset stats ...
          if ( e.target.getAttribute('data-access') == 'access-itemState') {
              setStocksVal( [ obj.inStock , obj.menuShow ] ); alterproductVal( obj.product ); alterpriceVal( obj.price );
              alterImgVal( obj.imgUrl );
          }
    }

    const alterMenu = ( type , itemId ) => {
          // start progress bar
          if ( type === 'post'  ) {
              saveWillChange( [true , false ] );
              // on submit, get the object and post it...
              const obj =  { product  : newProductVal  , price: newPriceVal , inStock : stockValues[0] ,
                             menuShow : stockValues[1] , imgUrl : imageVal };
              editMenuItem( obj , sectionId , itemId )
                   .then( obj => {
                           getOrderMenu()
                                .then(  arr => {
                                  populateOrders( arr );
                                  saveAnimation( saveWillChange , [ true , true ] ,  [ false , true ] , ( ) => {

                                  });
                            })
                          .catch( err => console.log( err ));
                   })
                   .catch( err => console.log( err ));
          }
          if ( type === 'delete' ) {
              delWillChange( [true , false ] );
              removeMenuItem( sectionId , itemId )
                  .then( array => {
                        getOrderMenu()
                             .then(  arr => {
                               populateOrders( arr );
                               saveAnimation( saveWillChange , [ true , true ] ,  [ false , true ] , ( ) => {

                               });
                         })
                       .catch( err => console.log( err ));
                  })
                 .catch( err => console.log( err ));
          }
    }

    // handles image uploading on change...
    const fileSelectedHandler = ( e , itemId ) => {
        const file = e.target.files[0];
        cloudinaryUpload( file )
            .then( imgUrl => alterImgVal( imgUrl ))
            .catch(   err => console.log( err ));
    }

    return (
        <ul className="order_menu_each_list" id={ `menuItem-` + props.index } key={ props.index } >
              { items.map( ( elementItem , itemIndex ) =>
                    <li key={ itemIndex } onClick={ e => setValues( e , elementItem ) }>
                          <span> { elementItem.product } </span>
                          <div className="order_each_price">
                             { `£`+ elementItem.price }
                          </div>

                          <ul className="order_each_quantity_counter list_buttons">

                              <Modal access="access-itemState" link={ <i className="fas fa-edit"> </i> } id="modal_order_menu_item_add">
                                  { !renderPhoto &&
                                      <Fragment>

                                        <div className="progress_upload">
                                            { saveWillStart[0] && <Loading textState={ saveWillStart[1] }/> }
                                        </div>

                                        <h3> edit { elementItem.product } </h3>

                                        <input type="text" name="product"
                                                           placeholder={ elementItem.product }
                                                           value={ newProductVal }
                                                           onChange={ e => alterproductVal( e.target.value )}/>
                                        <h4> product price </h4>
                                        <input type="text" name="price" value={ newPriceVal }
                                                           onChange={ e => alterpriceVal( e.target.value ) }
                                                           placeholder={ elementItem.price } />

                                        <div className="list_buttons quantity_counter_buttons">
                                            <li onClick={ e => setStocksVal( [ !stockValues[0] ,  stockValues[1] ] ) } className={ stockValues[0] ? '' : "item_button_blue" }> is out of stock </li>
                                            <li onClick={ e => setStocksVal( [  stockValues[0] , !stockValues[1] ] ) } className={ stockValues[1] ? '' : "item_button_blue" }> hide from menu  </li>
                                            <li onClick={ e => switchPhotoshow( true ) }> upload photo </li>
                                        </div>

                                        <div>
                                            <button className="confirm" onClick={ e => alterMenu( 'post' , elementItem._id )}> save your edit </button>
                                        </div>

                                    </Fragment>
                                }
                                { renderPhoto &&
                                    <Fragment>
                                        <div className="content_section_fit">
                                            <h2 className="fit_left"> upload image for { elementItem.product } </h2>
                                            <ul className="fit_right" onClick={ e => switchPhotoshow(false) }>
                                                 <i class="fas fa-long-arrow-alt-left"> </i>
                                            </ul>
                                        </div>
                                        <div className="photo_cycle">
                                            <div className="image_menuItem">
                                                { imageVal === 'no chosen image' ? (
                                                  <h3> no chosen image </h3>
                                                ) : (
                                                  <img src={ imageVal } />
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <input type="file" onChange={ e => fileSelectedHandler( e , elementItem._id )  } />
                                        </div>
                                    </Fragment>
                                }

                              </Modal>

                              <Modal link={ <i className="far fa-trash-alt"></i> } id="modal_order_menu_item_add">
                                  <div className="progress_upload">
                                      { delWillStart[0] && <Loading textState={ delWillStart[1] }/> }
                                  </div>
                                  <h3> delete { elementItem.product } </h3>
                                  <div onClick={ e => alterMenu( 'delete' , elementItem._id ) }>
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

      const [ orders , populateOrders ] = useState( [] );
      const { updateOrderMenuPos , getOrderMenu , postOrderMenu , alterOrderMenu } = menus;
      const { postOrderMenuItem  , cloudinaryUpload } = menuItem;

      // food menu input values
      const [ showNewSection , toggleSection ] = useState( false );

      const [ sortableControl , canMove ] = useState( false );
      const sortableOptions = { delay: 100 , pressThreshold : 2 }

      // section edit and new section item states.
      const [ newSectionVal  , changeNewSectionVal ] = useState( '' );
      const [ newProductVal  , alterproductVal ] = useState('');
      const [ newPriceVal    , alterpriceVal ]   = useState('');
      const [ imageVal       , alterImgVal   ]   = useState(['no chosen image' , false ]); // [0] = string , [1] = boolean state

      // form Load state = orderSection / true = starting , false = finished. [0] = show or hide [1] change text
      const [ saveWillStart , saveWillChange ] = useState( [ false , false ] );
      const [ editWillStart , editWillChange ] = useState( [ false , false ] );

      // food menu item switch
      const [ renderPhoto  , switchPhotoshow ] = useState( false );

      // sets alterered object when clicking on section edit and add
      const resetFormValues = ( called ) => {
            changeNewSectionVal('');
            alterproductVal(''); alterpriceVal(''); alterImgVal([ 'no chosen image' , false ]);
            console.log('called: ', called );
      }

      const fileSelectedHandler = ( aFile ) => {
        const file = aFile.target.files[0];
        cloudinaryUpload( file )
            .then( imgUrl => alterImgVal( [ imgUrl , true ] ))
            .catch(   err => console.log( err ));
      }

      const newSection = ( ) => { toggleSection( !showNewSection ); }

      // show / hide food menu sections
      const accordToggle = ( target ) => {
          const targetEl = document.getElementById( target );
          targetEl.style.display = targetEl.style.display === 'block' ? 'none' : 'block';
      }

      const submitnewSection = ( ) => {
            postOrderMenu( newSectionVal , orders.length )
               .then( item => {
                  populateOrders( [ ...orders , item ]);
                  toggleSection( false );
               })
               .catch( err => console.log( err ));
      }

      const submitnewItem = ( id ) => {
          saveWillChange( [ true , false ] );

          const obj =  { product : newProductVal  , price : newPriceVal , imgUrl : imageVal[0] , id };
          // id refers to the section and its array we want the item to belong to.
          postOrderMenuItem(  obj )
              .then( data => {
                    getOrderMenu()
                         .then(  arr => {
                           populateOrders( arr );
                           saveAnimation( saveWillChange , [ true , true ] ,  [ false , true ] , ( ) => {
                               alterproductVal(''); alterpriceVal(''); alterImgVal([ 'no chosen image' , false ]);
                           });
                         })
                         .catch( err => console.log( err ));
              })
              .catch( err => console.log( err ));
      }

      const alterMenu = ( id  , type , string ) => {
           editWillChange( [ true , false ] );
           alterOrderMenu( id , type , string )
                .then( menuItem => {
                    if ( type === 'delete') {
                        var found = orders.filter( each => each._id != menuItem._id);
                        saveAnimation( editWillChange , [ true , true ] ,  [ false , true ] , ( ) => {
                              populateOrders( found );
                        });
                    }
                    else if ( type === 'post' ) {
                        var newOrders = [ ...orders ];
                        var index = newOrders.findIndex( each => each._id == menuItem._id );
                        newOrders[ index ] = menuItem;
                        saveAnimation( editWillChange , [ true , true ] ,  [ false , true ] , ( ) => {
                              populateOrders( newOrders );
                        });
                    }
                })
                .catch( err => console.log( err ));
      }

      const newMovement = ( ) => {

         canMove( !sortableControl );
         if ( sortableControl ) {
            const newMoves = orders.map( (  { _id , posIndex } ) => { return { sectionId: _id , posIndex } });

            updateOrderMenuPos( newMoves )
              .then( res => {
                  getOrderMenu()
                       .then(  arr => populateOrders( arr ))
                       .catch( err => console.log( err ));
              })
              .catch( err => console.log( err ));
         }
      }

      const onSortEnd = ( { oldIndex, newIndex } ) => {
           let sortedItems = arrayMove( orders , oldIndex , newIndex);
           let newSorted = sortedItems.forEach( ( each , index ) => {
              each.posIndex = index;
           });
           populateOrders( sortedItems );
      };

      const SortableList = SortableContainer(({items}) => {
        return (
          <ul>
              { orders.map( ( order , index ) => (
                  <SortableItem key={`item-${index}`} index={ index } element={ order } />
              ))}
          </ul>
        );
      });

      const SortableItem = SortableElement(({ element , index }) =>
          <section className="order_section_each draggable_section" key={ index  } >
             <div className="order_menu_each_accord">
                 <h3> { element.sectionName } </h3>
             </div>
          </section>
      );

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
                  <ul>
                      <li onClick={ e => newSection()  }> <i className="fas fa-plus"> </i> </li>
                      <li onClick={ e => newMovement() }> { !sortableControl ? 'move sections' : 'save moved sections' } </li>

                  </ul>
                </div>

                { showNewSection &&
                  <section className="order_section_each new_order_section">
                          <input type="text" placeholder="name your new section" name="section" value={ newSectionVal }
                                 onChange={ e => changeNewSectionVal( e.target.value )}
                           />
                          <button onClick={ submitnewSection }> create </button>
                  </section>
                }
                { !sortableControl ? (
                  <div>
                  { orders.map( ( element , index ) => (
                    <section className="order_section_each" key={ index  } >
                       <div className="order_menu_each_accord">
                           <h3> { element.sectionName } </h3>
                           <ul className="list_buttons">
                              <li onClick={ e => accordToggle( 'menuItem-'+index ) }> <i className="fas fa-angle-down"></i> </li>

                              <Modal link={ <i className="fas fa-edit"> </i> } id="modal_order_menu_item_add">

                                  <div className="progress_upload">
                                      { editWillStart[0] && <Loading textState={ editWillStart[1] }/> }
                                  </div>

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

                              <Modal callback={ resetFormValues } link={ <i className="fas fa-plus"> </i> } id="modal_order_menu_item_add">

                                  <div className="progress_upload">
                                      { saveWillStart[0] && <Loading textState={ saveWillStart[1] }/> }
                                  </div>
                                  { !renderPhoto &&
                                     <Fragment>
                                      <h3> add item to { element.sectionName } </h3>
                                      <h4> product name </h4>
                                      <input type="text" name="product" placeholder="eg: steak , chips and onion rings" value={ newProductVal } onChange={ e => alterproductVal( e.target.value )}/>
                                      <h4> product price </h4>
                                      <input type="text" name="price"   placeholder="eg: 2.99" value={ newPriceVal } onChange={ e => alterpriceVal( e.target.value ) }/>

                                      <div className="list_buttons quantity_counter_buttons">
                                         <li onClick={ e => switchPhotoshow( true ) }> upload photo </li>
                                      </div>
                                      <div>
                                          <button className="confirm" onClick={ e => submitnewItem( element._id )}> create item </button>
                                      </div>
                                     </Fragment>
                                  }
                                  { renderPhoto &&
                                      <Fragment>
                                        <div className="content_section_fit">
                                            <h2 className="fit_left"> upload an image </h2>
                                            <ul className="fit_right" onClick={ e => switchPhotoshow(false) }>
                                                 <i class="fas fa-long-arrow-alt-left"> </i>
                                            </ul>
                                        </div>
                                        <div className="photo_cycle">
                                            <div className="image_menuItem">
                                                {  imageVal[1] &&<img src={ imageVal[0]  } />    }
                                                { !imageVal[1] && <h3> { imageVal[0]     } </h3> }
                                            </div>
                                        </div>
                                        <div>
                                            <input type="file" onChange={ e => fileSelectedHandler( e , element._id )  } />
                                        </div>
                                      </Fragment>
                                     }
                              </Modal>
                           </ul>
                       </div>
                       <Order_menu_items populateOrders={ populateOrders } sectionId={ element._id } items={ element.sectionItems } index={ index }/>
                    </section>
                  ))}
                  </div>
                  ) : (
                  <div>
                      <SortableList items={ orders } onSortEnd={ onSortEnd } pressDelay={ sortableOptions.delay } pressThreshold={ sortableOptions.pressThreshold } />
                  </div>
                )}

            </section>
      </div>
  )
}

export default Orders;
