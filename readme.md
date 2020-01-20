
## Tech_stack

    * nodejs with express
    * cloud atlas mongodb and mongoose.
    * cloudinary image management.
    * stripe & pusher & chartJs
    * react , sass for react, react-native with expo.
    * third-party-apis( genderDetermine & street lookup).
    * graphql and apollo
    * nodemailer for order success.

## project_structure

        "web    - handles all api requests" ,
        "admin  - allows restaurant to handle orders, menu and table bookings" ,
        "native - native app for users to purchase food and reserve rables"
        
## needed for project.
  
key name | description
------------ | -------------
DATABASE_ATLAS | this is the key needed to interact with your mongodbAtlas cluster.
publishable_key | your stripe publishable key. should look like: pk_test
stripe_secretKey | your stripe secret key. should look like: sk_test
pusherAppId  | .
pusherClient | .
pusherSecret | .
cloud_name   | your cloudinary key name.
cloud_key    | your cloudinary key.
cloud_secret | your cloudinary secret.
addressKey | secret key for https://postcoder.com/docs/address-lookup#postcode-lookup
        
## starting each service.

### client ( runs on localhost: 3000 ).
  npm start

### server ( runs on localhost: 5000 ).
  npm run server

### native  ( runs on expo dev server ).
  npm run start
  
  
