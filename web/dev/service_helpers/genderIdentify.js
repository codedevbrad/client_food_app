
const genderIdentify = async( profileName ) => {
     return await fetch('https://api.genderize.io/?name='+ profileName.split(" ")[0])
          .then( res => res.json())
          .then( obj => {
               var options = profiles.filter( ( each ) => {
                   return each.gender.trim() == obj.gender.trim();
               });
               var chosen = options[ Math.floor(Math.random() * options.length )];
               return chosen.profile;
          })
          .catch( err => console.log( err));
 }
