
const generateRandomAddress = ( addresses ) => {
			let rando_value = Math.floor( Math.random( ) * addresses.length - 1 ) + 1;
			return addresses[ rando_value ];
}

const generateRandomFood = ( food ) => {

			 // each object is a new order section.
			 let rando_section = Math.floor( Math.random( ) * food.length - 1 ) + 1 ,
			     chosenSection = food[ rando_section ];

			 let { _id , sectionItems , sectionName } = chosenSection;

			 let rando_item = Math.floor( Math.random( ) * sectionItems.length - 1 ) + 1 ,
	   	  	 chosenItem = sectionItems[ rando_item ];

			 let itemId = chosenItem._id;

			 let chosenQuantity = Math.floor( Math.random( ) * 3 ) + 1;

			 return {  menuItemId : itemId , quantity : chosenQuantity , menuSection : _id , sectionName };
}

module.exports.generateRandomAddress = generateRandomAddress;
module.exports.generateRandomFood = generateRandomFood;
