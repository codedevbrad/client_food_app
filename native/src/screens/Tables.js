
import React , { Component , useEffect , useState , useRef } from 'react';
import { Ionicons , FontAwesome } from '@expo/vector-icons';
import { Modal , Picker , KeyboardAvoidingView , Keyboard , StyleSheet , FlatList , Button , Image , View ,
         Text , TextInput , TouchableWithoutFeedback , SafeAreaView , ScrollView
       } from 'react-native';
import { useStoreState , useStoreActions } from 'easy-peasy';

import { TablesApi } from '../networkRequests';

const styles = StyleSheet.create({
    headText: { fontSize: 29 , fontWeight: '700'} ,
    roundedbackground: { backgroundColor: 'midnightblue' , width: '100%' , borderTopLeftRadius: 40 , borderTopRightRadius: 40 } ,
    tableButton: { color: 'white' , fontSize: 14 , fontWeight: '700' ,
                   paddingVertical: 10 , paddingHorizontal: 50 ,  borderRadius: 13 } ,
    formInput: {
       width: '100%' , flex: 0 ,  color: 'black' , backgroundColor: 'mintcream' , paddingVertical: 20 , paddingHorizontal: 20 ,
       borderRadius: 16 , marginVertical: 20
     },
});

const TablesScreen = ( ) => {
    const [ partyName  , setPartyName  ] = useState('');
    const [ tableTime  , setTableTime  ] = useState('');
    const [ tableParty , setTableParty ] = useState('');

    const [ validatepassed , setValPassed ] = useState( false );
    const [ validateFields , setEachField ] = useState([ false , false , false ]);

    const [ possibleTimes , generateTimes ] = useState( [
        { hour: '17:00' } , { hour:'18:00' } , { hour: '19:00' } , { hour: '20:00' } , { hour: '21:00' }
    ]);

    // make sure all fields are tested when onSubmitEditing
    // make sure button changes color when table time is changed along with party name and party size.

    const tableValidateErr = ( picker ) => {

        let nameField  = partyName == '';
        let tableField = tableTime == '';
        let partyField = tableParty == '' && tableParty == '0';

        // if name, tableTime and party isnt empty. no errors.
        if ( !nameField && !tableField && !partyField ) {
            return false;
        // else, set false or true for ea2ch field.
        } else {
            setEachField( nameField , tableField , partyField );
        }
    }

    const handleTableOrder = ( ) => {
        if ( !tableValidateErr() ) {
              TablesApi.postTable( { bookedName : partyName , tableTime , tableParty })
                       .then( data => console.log( data ))
                       .catch( err => console.log( err  ));
        }
    }

    const handleInputValidate = ( inputPos , val ) => {
          console.log( inputPos , val );
          let copy = [ ...validateFields ];
          if ( val !== '0' && val !== '' ) {
               copy[ inputPos ] = true;
               setEachField( copy );
          } else {
               copy[ inputPos ] = false;
               setEachField( copy );
          }
    }

    const pickerIsSelected = ( ) => {
          console.log( 'pciker selected');
          // set kast validate field to true to update button state.
          let copy = [ ...validateFields ];
              copy[2] = true;
              setEachField( copy );
    }

    return (
        <View style={ { flex: 6 , width: '100%' , flexDirection: 'column' } }>

            <View style={ { flex: 0.8 , width: '100%' , paddingHorizontal: 20 } }>
                <Text style={ { fontSize: 29 , fontWeight: '700'} }>
                  reserve a table at our restaurant
                </Text>
            </View>
            <View style={ [ { flex: 3, flexDirection: 'column' , paddingTop: 60 , paddingHorizontal: 20 }, styles.roundedbackground ] }>
                <View style={ { flex: 5 , flexDirection: 'column' } }>
                        <TextInput style={ styles.formInput }  placeholder="whats your party name"
                                           onChangeText={ text => setPartyName( text ) } value={ partyName } placeholderTextColor={ "black" }
                                           onSubmitEditing={ () => handleInputValidate( 0 , partyName ) }
                        />
                        <TextInput style={ styles.formInput }  placeholder="how many in your party" keyboardType={'numeric'}
                                           onChangeText={ text => setTableParty( text ) } value={ tableParty } placeholderTextColor={ "black" }
                                           onSubmitEditing={ () => handleInputValidate( 1 , tableParty ) }
                        />

                        <View style={ [styles.formInput , { paddingVertical: 10 }] }>
                            <Picker selectedValue={ tableTime } style={ { width: '100%' } } onValueChange={ ( text , itemIndex ) => {
                              setTableTime( text );
                              pickerIsSelected();
                             }}>
                             { possibleTimes.map( ( each , index ) =>
                               <Picker.Item key={ index } label={ `table for ${ each.hour } ` } value={ each.hour } />
                             )}
                             </Picker>
                         </View>
                </View>
                <View style={ { paddingRight: 20 , flex: 2 , flexDirection: 'row' , alignItems:'center' , justifyContent: 'flex-end' } }>
                    <TouchableWithoutFeedback onPress={ handleTableOrder }>
                      <Text style={[ styles.tableButton , {
                          backgroundColor: validateFields[0] && validateFields[1] && validateFields[2] ? 'orange' :'lightsteelblue' } ]
                       }>
                        { validateFields[0] && validateFields[1] && validateFields[2] ? 'book table ': 'not filled all details'}
                      </Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>

    )
}

export default TablesScreen;
