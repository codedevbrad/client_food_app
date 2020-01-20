var bcrypt = require('bcryptjs');

var decryptHash = ( password , hash ) => {
    return bcrypt.compare( password , hash )
       .then( res => console.log( res ) );
}

var hash = bcrypt.hashSync('starters and bites', 10 );
var compare = bcrypt.compareSync('starters and bites' , hash ); // true
decryptHash( '12345' , '$2y$10$GClm/wmVHjcl6La7cMwbQueEks25e5wPzexIJE31Yd.TKe8/1kwLC' );

console.log( hash , compare );
