
import React , { Component , useEffect , useState , useRef } from 'react';
import { Ionicons , FontAwesome } from '@expo/vector-icons';
import { Modal , Picker , KeyboardAvoidingView , Keyboard , StyleSheet , FlatList , Button , Image , View ,
         Text , TextInput , TouchableWithoutFeedback , SafeAreaView , ScrollView
       } from 'react-native';
import { useStoreState , useStoreActions } from 'easy-peasy';
import axios from 'axios';

import { ShoppingApi } from '../networkRequests';

const styles = StyleSheet.create({

    formInput: {
      width: '100%' , paddingVertical: 15 , color: 'black' , marginVertical: 20 ,
      paddingHorizontal: 10 , backgroundColor: 'seashell'
    },
    formInputLarge: {
        flex: 5 , width: '100%' , paddingVertical: 10 , color: 'black' ,backgroundColor: 'seashell' , marginVertical: 20 ,
        paddingHorizontal: 10
    },
    formInputPlaceHolder: { color: 'black' },
    shadow : {
      shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    },
    list : {
        paddingVertical: 15 , alignItems: 'center' , justifyContent: 'center' , flexDirection: 'row' , width: '100%'
    },
    list_item : {
        flex: 6 , padding: 10 , textAlign: 'center'
    },
    list_item_withFont : {
      flexDirection: 'row' , flex: 6 , alignItems: 'center' , justifyContent: 'center'
    },
    item: {
        padding: 10 , fontSize: 18 , height: 44,
  },
  foodImage:  { flex: 1   , width: 40 , height: 60 , borderRadius: 10 } ,
  foodTitle:  { flex: 2   , paddingHorizontal: 10  } ,
  foodPrice:  { flex: 1   , marginHorizontal: 10  , padding: 5  } ,
  foodSelect: { flex: 0.5 , backgroundColor : '#5e7ef2' , color: 'white' , padding: 10 , textAlign: 'center'  }
});

const AddToCart = ( { obj , addToCart }) => {
     const { innerItems , sectionId } = obj;
     const cart = useStoreState( state => state.order_cart );
     const removeItem = useStoreActions( actions => actions.remove_Item );
     const [ itemSelected , setSelected ] = useState( false );

     useEffect( ( ) => {
            // if id is in cart, set itemSelected to true.
            let isInside = cart.find( ( el ) => el._id === innerItems._id );
            if ( isInside ) setSelected( true );
     }, []);

     const push = ( ) => {
        // if object id already exists in cart, remove it.
        if ( itemSelected ) {
             removeItem( innerItems._id );
             setSelected( false );
        } else {
             innerItems.quantity = 1;
             innerItems.sectionId = sectionId;
             setSelected( true );
             addToCart( innerItems );
        }
     }
     return (
       <TouchableWithoutFeedback onPress={ ( ) => push( ) }>
             <FontAwesome name={ !itemSelected ? 'heart-o' : 'heart'} size={ 22 } color="red" />
       </TouchableWithoutFeedback>
     )
}

const OrderIcon = ( ) => {
    return (
        <View style={ {position: 'relative' }}>
            <FontAwesome name={ 'heart-o' } size={ 22 } color="red" />
            <Text style={{ fontSize: 12 , fontWeight: '700' , position: 'absolute' , top: -16 , right: -5 } }> 2 </Text>
        </View>
    )
}

const OrderAddress = ( addressIsChosen , keyboard ) => {

    const [ postcodeMatches , flipModal ] = useState( false );
    const [ possibleAddresses , setPossibleAddresses ] = useState( [ ] );

    const order_person = useStoreState( state => state.order_person );
    const addPersonDetails = useStoreActions( actions => actions.update_person );

    const lookupAdress = ( addressValue ) => {
        ShoppingApi.addressLookup( addressValue )
            .then( data => {
                  setPossibleAddresses( data );
            })
            .catch( err => console.log( err ));
    }

     const addressMade = ( text ) => {
          addPersonDetails( { text , objToChange : 'address' } );
          flipModal( false );
     }

    return (
          <View style={ { paddingBottom : 30 } }>
              <Text> type in your postcode, hit done and we'll show a list of possible address's for you to select. </Text>

              <TextInput style={ styles.formInputLarge }  placeholder="search your address using your postcode."
                                 onChangeText={ text => addPersonDetails( { text , objToChange : 'address' }) }  value={ order_person.order_address } placeholderTextColor={ "black" }
                                 onSubmitEditing={ () => lookupAdress(  order_person.order_address ) }
                                 />

              <View style={ { flex: 0 , flexDirection: 'row' , justifyContent: 'flex-end' , width: '100%' } }>
                <TouchableWithoutFeedback onPress={ () => flipModal( true ) }>
                     <Text style={ { width: '70%' , padding: 7 , borderWidth: 1 , backgroundColor: 'ghostwhite' , borderColor: 'lightslategrey' } }>
                        { `choose ${ possibleAddresses.length } possible addresses` }
                     </Text>
                </TouchableWithoutFeedback>
              </View>

              <Modal animationType="slide" transparent={true } visible={ postcodeMatches } >
                  <View style={ { flex: 1 , flexDirection: 'column' , justifyContent: 'flex-start' } }>
                      <View style={ { flex: 4 , width: '100%' , backgroundColor: 'white' , flexDirection: 'column' , justifyContent: 'flex-start' ,
                                     borderBottomRightRadius: 40 , borderBottomLeftRadius: 40 , paddingVertical: 40 }
                      }>
                          <Text style={ { flex: 0 , fontWeight: 'bold', fontSize: 30 , padding: 20 , paddingTop: 40 } }> possible adressess </Text>
                          <SafeAreaView style={ { flex: 6 } }>
                                <ScrollView style={ { flex: 4 , paddingHorizontal: 20 } }>
                                          { possibleAddresses.map( ( eachAddress , index ) =>
                                                  <TouchableWithoutFeedback onPress={ () => addressMade( eachAddress ) } key={ index }>
                                                      <Text style={ { color: 'black' , fontSize: 16 , flex: 0 , width: '100%' , padding: 15 ,
                                                                      backgroundColor: 'ghostwhite' , marginVertical: 10 }
                                                      }>
                                                          { eachAddress }
                                                      </Text>
                                                  </TouchableWithoutFeedback>
                                          )}
                                </ScrollView>
                            </SafeAreaView>
                      </View>
                      <View style={ { flex: 2 , backgroundColor: 'rgba(52, 52, 52, 02)' , opacity: 0.8 } }>
                      </View>
                    </View>
              </Modal>
          </View>

    )
}

const DetailsComponent = ( ) => {
  const [ possibleOrderTimes , setPossibleTimes ] = useState( [] );
  const [ paddingSet , addPadding ] = useState( false );

  const _keyboardDidShow = ( ) => addPadding( true );
  const _keyboardDidHide = ( ) => addPadding( false );

  const order_person = useStoreState( state => state.order_person );
  const addPersonDetails = useStoreActions( actions => actions.update_person );


  useEffect( ( ) => {
        ShoppingApi.populateOrderTimes()
            .then( times => setPossibleTimes( times ))
            .catch(  err => console.log( err ));

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow );
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide );

       return () => {
         keyboardDidShowListener.remove();
         keyboardDidHideListener.remove();
       };

  }, []);

  return (
    <View style={{ width: '100%' , flex: 6 , alignItems: 'center' , flexDirection: 'column',  paddingHorizontal: 20 }}>
          <View style={ { width: '100%' , flex: 0 , paddingVertical: 20 }}>
              <Text style={ { fontSize: 29 , fontWeight: '700'} }>
                  we need some details first.
              </Text>
          </View>

          <View style={{ width: '100%' , flex: 6  }}>
              <SafeAreaView style={{ width: '100%' , flex: 6  }}>
                    <ScrollView>
                          <View style={ { paddingBottom: paddingSet ? 310 : 0 , paddingRight: 20  }}>

                              <TextInput style={ styles.formInput } placeholder="name for order" onChangeText={ ( text ) => addPersonDetails( { text , objToChange : 'name'} ) }
                                         value={ order_person.order_name } placeholderTextColor={ "black" }
                                         onSubmitEditing={Keyboard.dismiss}
                              />

                              <OrderAddress />

                              <TextInput style={ styles.formInput } placeholder="Provide your email address." onChangeText={ ( text ) => addPersonDetails( {text , objToChange: 'email'} ) }
                                         value={ order_person.order_email } placeholderTextColor={ "black" }
                                         onSubmitEditing={Keyboard.dismiss}
                              />
                              <TextInput style={ styles.formInputLarge } multiline={ true } numberOfLines={ 7 } textAlignVertical={ "top" }  placeholder="provide order details for the delivery driver."
                                         onChangeText={ ( text ) => addPersonDetails({ text , objToChange: 'details'} )} value={ order_person.order_details }
                                         placeholderTextColor={ "black" }
                                         onSubmitEditing={Keyboard.dismiss}
                              />

                              { possibleOrderTimes.length > 0 &&  <Text> choose a delivery time between { possibleOrderTimes[0].hour } and 22.45. </Text> }


                              <Picker selectedValue={ order_person.order_at } style={ { flex: 1 , paddingVertical: 20 , marginVertical: 20 , backgroundColor: 'seashell' }}
                                      onValueChange={( text , itemIndex) => addPersonDetails( { text , objToChange: 'time' }) }>
                               { possibleOrderTimes.map( ( each , index ) =>
                                 <Picker.Item key={ index } label={ `order for ${ each.hour } ` } value={ each.hour } />
                               )}
                            </Picker>
                          </View>
                    </ScrollView>
                </SafeAreaView>

          </View>
    </View>
  )
}

const SelectComponent  = ( ) => {
    const [ food , setFood ] = useState( [] );
    const addToCart = useStoreActions( actions => actions.update_cart );

  useEffect( () => {
            ShoppingApi.getMenu()
                .then( food => setFood( food ))
                .catch( err => console.log( err ));
  }, []);

  return (
    <View style={{ flex: 1 , alignItems: 'center' , flexDirection: 'column' , paddingHorizontal: 15 }}>
          <View style={ { width: '100%' , flex: 0 , paddingVertical: 20 }}>
              <Text style={ { fontSize: 40 , fontWeight: '700'} }>
                food to order
              </Text>
          </View>
          <View style={ { flex: 5 , width: '100%' , marginTop: 10 } }>
            <SafeAreaView style={ { flex: 1 }}>
                <ScrollView>
                    { food.map( ( eachFood , index ) => (
                        <View key={ 'food'+index } style={ { paddingRight: 20 , flexDirection: 'column' , width: '100%' , alignItems : 'flex-start' }}>

                            <Text style={ { fontSize: 17 , fontWeight: '700' , marginVertical: 10 } }> { eachFood.sectionName } </Text>

                            { eachFood.sectionItems.map( ( innerItems , indexInner ) =>
                                <View key={ 'foodItem-'+indexInner } style={ { flex: 1 , marginVertical : 20 , flexDirection: 'row' , flex: 0 , justifyContent: 'center' , alignItems: 'center' } }>
                                   <Image style={ styles.foodImage } source={ { uri : innerItems.imgUrl } } />
                                   <Text style={ styles.foodTitle  }> { innerItems.product } </Text>
                                   <Text style={ [styles.foodPrice ]  }> { '£' + innerItems.price   } </Text>
                                   <AddToCart addToCart={ addToCart } obj={ { innerItems , sectionId : eachFood._id } }/>
                                </View>
                            )}

                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
          </View>
    </View>
  );
}

const PaymentComponent = ( ) => {
    const user  = useStoreState( state => state.order_person );
    const cart  = useStoreState( state => state.order_cart   );
    const editCart = useStoreActions( actions => actions.editCart_item );
    const [ total , setTotal ] = useState('');

    useEffect( () => {
            let vals = cart.reduce( ( a , b ) => {
                return { price: ( parseInt(a.price) * b.quantity ) + ( parseInt(b.price ) * b.quantity )};
            });
            setTotal( vals.price );
    } , [ cart ] );

    const changeItemQuantity = ( id , value ) => {
        // find item in cart. update object and reset the cart state.
        editCart( { id , value } );
    }

    return (

      <View style={{ flex: 1 , alignItems: 'center' , justifyContent: 'flex-start' , flexDirection: 'column' , paddingHorizontal: 15 }}>

            <Text style={ { fontSize: 40 , fontWeight: '700' , width: '100%' , paddingBottom: 10 } }> your Cart </Text>
            <View style={ { flex: 5 , width: '100%' , marginTop: 10 , } }>
                  <SafeAreaView style={ { flex: 6 }}>
                          <ScrollView>
                              <View style={ { flexDirection: 'column' , width: '100%' , alignItems : 'flex-start' , paddingRight: 20 }}>
                                    { cart.map( ( each , indexInner ) =>
                                        <View key={ 'foodItem-'+indexInner } style={ { marginVertical : 20 , flexDirection: 'row' , flex: 0 , justifyContent: 'center' , alignItems: 'center' } }>
                                           <Image style={ styles.foodImage } source={ {uri : each.imgUrl} } />
                                           <Text style={ styles.foodTitle  }> { each.product } </Text>
                                           <Text style={ styles.foodPrice  }> { '£' + each.price  } </Text>
                                           <TextInput style={ { flex : 0 , color: 'black' , borderWidth: 1 , borderColor: 'black' , paddingHorizontal : 15 } } keyboardType={'numeric'}
                                            onChangeText={ ( val ) => changeItemQuantity( each._id , val )} value={ each.quantity.toString() } placeholderTextColor={ "black" } />
                                        </View>
                                    )}
                              </View>
                          </ScrollView>
                  </SafeAreaView>
            </View>
            <View style={ { paddingVertical: 20 , flex: 0 , flexDirection: 'row' , alignItems: 'center' , justifyContent: 'center' }}>
              <Text style={ { color: 'lightsteelblue' , flex: 0 , fontSize: 30 , fontWeight: '700'  } }>  total cost </Text>
              <Text style={ { flex: 4 , textAlign: 'right', fontSize: 30 , fontWeight: '700' } }> £{ total } </Text>
            </View>
      </View>
    )
}

const CompleteCompoment = ( ) => {

    return (
      <View style={{ flex: 1 , alignItems: 'center' , flexDirection: 'column' , paddingHorizontal: 15 }}>
          <Text> your order has been placed. </Text>
      </View>
    )
}

const Navigation = ({ processComponent , changeProcess } ) => {
    const orderIsMade  = useStoreState( state => state.order_cart  );
    const personExists = useStoreState( state => state.order_person );

    const handleOrderProcess = ( toMoveTo ) => {
        if ( toMoveTo <= processComponent ) { changeProcess( toMoveTo ) }
          else {
              // if on details, all fields must be signed in.
              if ( processComponent === 0 && toMoveTo === 1 ) {
                  let errors = false;
                  let { order_name , order_email , order_details , order_at } = personExists;
                  [ order_name , order_email , order_details , order_at ].forEach( ( each ) => {
                      if ( each.length === 0 ) errors = true;
                  });
                  if ( !errors ) changeProcess( 1 );
              }
              // if on order, an order must exist in cart. so, cart is not empty.
              if ( processComponent === 1 && toMoveTo === 2 ) {
                   if ( orderIsMade.length > 0 ) changeProcess( 2 );
              }
          }
    }
    return (
      <View style={ styles.list }>
          <TouchableWithoutFeedback onPress={ ( ) => handleOrderProcess( 0 ) }>
              <Text style={ styles.list_item }> details  </Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={ ( ) => handleOrderProcess( 1 ) }>
                <View style={ styles.list_item_withFont }>
                    <Text> order </Text>
                </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={ ( ) => handleOrderProcess( 2 ) }>
              <Text style={ styles.list_item }> confirm  </Text>
          </TouchableWithoutFeedback>
      </View>
    )
}

const OrderScreen = ( { navigation } ) => {
    const [ processComponent , changeProcess ] = useState( 0 );
    const orderIsMade  = useStoreState( state => state.order_cart  );
    const personExists = useStoreState( state => state.order_person );
    const [preventOrderMiss , disableButton ] = useState( false );

    let handleOrderProcess = ( ) => {
         let end = 2;

         if ( preventOrderMiss ) { return false; }
         if ( processComponent === 0 ) {
             let errors = false;
             let { order_name , order_email , order_details , order_at } = personExists;
             [ order_name , order_email , order_details , order_at ].forEach( ( each ) => {
                 if ( each.length === 0 ) errors = true;
             });
             if ( !errors ) changeProcess( 1 );
         }
         if ( processComponent === 1 ) {
              if ( orderIsMade.length > 0 ) changeProcess( 2 );
          }
         if ( processComponent === end ) {
              // handle payment
              console.log('click');
              disableButton( true );
              ShoppingApi.makeOrderPurchase( personExists , orderIsMade )
                  .then( data => changeProcess( 3 ) )
                  .catch( err => console.log( err ) )
         }
    }

    return (
        <View style={ { flex: 1 } }>
            <Navigation processComponent={ processComponent } changeProcess={ changeProcess }/>

            <View style={ { width: '100%', flex: 5 , flexDirection: 'column' } }>
            { processComponent == 0 && <DetailsComponent /> }
            { processComponent == 1 && <SelectComponent  /> }
            { processComponent == 2 && <PaymentComponent /> }
            { processComponent == 3 && <CompleteCompoment/> }
            </View>

            <View style={ styles.shadow , { flex: 1 , width: '100%' , marginTop: 20 , flexDirection: 'row' ,  backgroundColor: 'midnightblue' , borderTopLeftRadius : 32 , borderTopRightRadius : 32,
                  alignItems: 'center' , justifyContent: 'flex-end' } }>
                          <Text style={ { paddingVertical: 10 , paddingHorizontal: 30 , fontWeight: '700' , marginHorizontal: 0 , backgroundColor: 'orange' , borderRadius: 15 , color: 'white' }}>
                                { processComponent < 3 && `${ processComponent + 1 } / 3` }
                                { processComponent == 3 && `${ processComponent } / 3`}
                          </Text>
                        <TouchableWithoutFeedback disabled={ preventOrderMiss } onPress={ ( ) => handleOrderProcess() }>
                          <Text style={ { marginHorizontal: 20 , fontWeight: '700' , paddingVertical: 10 , paddingHorizontal: 30 , backgroundColor: 'orange' , borderRadius: 15 , color: 'white'  }}>
                                { processComponent < 2  && 'next step' }
                                { processComponent == 2 && 'checkout' }
                                { processComponent == 3 && 'order made' }
                          </Text>
                        </TouchableWithoutFeedback>

            </View>
        </View>
    )
}

export default OrderScreen;
