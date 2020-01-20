
import { action , thunk } from 'easy-peasy';
import axios from 'axios';

export default {

      order_person: {
        order_name:    '' ,
        order_address: '' ,
        order_email:   '' ,
        order_details: '' ,
        order_at:      '' ,
      } ,

      update_person: action(( state , obj ) => {
            let { text , objToChange } = obj;
            switch ( objToChange ) {
              case 'name':
                state.order_person.order_name = text;
                break;
              case 'address' :
                state.order_person.order_address = text;
                
              case 'email' :
                state.order_person.order_email = text;
                break;
              case 'details' :
                state.order_person.order_details = text;
                break;
              case 'time' :
                state.order_person.order_at  = text;
                break;
            }
      }),

      order_cart:   []  ,

      update_cart: action(( state , obj ) => {
          state.order_cart = [ ...state.order_cart , obj ]
      }),
      editCart_item: action( ( state , obj ) => {
          let cartClone = [...state.order_cart ];
          let { id , value } = obj;
          let objToChange = state.order_cart.find( ( each ) => each._id === id );
              objToChange.quantity = value;
          state.order_cart = cartClone;
      }),
      remove_Item: action( ( state , id ) => {
          state.order_cart = state.order_cart.filter( ( each ) => each._id != id );
      }),
}
