module.exports.func = ( ) => {
		return {
    		addObj : function( el ) {
        		console.log('hello' , el);
        }
    }
}

module.exports.func2 = ( () => {
    return {
        hello: () => {
          console.log( 'hello guy');
        },
        bye: () => {
          console.log('bye');
        }
    }
})();


// var { func , func2 } = require('./test');
// var { addObj } = func();
// var { hello  } = func2;
//     hello('meow guy 2')
//     addObj('meow guy');
//
// var $ = require('./test').func();
//     $.addObj('other');
//
// var library = require('./test').func2;
//     library.hello();
