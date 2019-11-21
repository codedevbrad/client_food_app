export const saveAnimation = ( call , state1 , state2 , next ) => {
          setTimeout( () => {
             call( state1 ); // completes edit progress
             setTimeout( () => {
                call( state2 ); // removes edit progress
                if ( next ) next();
              } , 1500 );
           } , 2000 );
}
