
## Tech_stack:
* nodejs with express
* cloud atlas mongodb and mongoose.
* cloudinary image management.
* stripe & pusher & chartJs
* react , sass for react, react-native with expo.
* third-party-apis( genderDetermine & postcoder ).
* graphql and apollo
* nodemailer for order success.

## project_structure

        "web    - handles all api requests" ,
        "client  - allows restaurant to handle orders, menu and table bookings" ,
        "native - native app for users to purchase food and reserve rables"

## needed for native
key name | description
------------ | -------------
publishable_key | your stripe publishable key for client side. should look like: pk_test
        
## needed for web.

1. navgate inside the web folder.
2. create a new .env file.
3. fill with the following table.

key name | description
------------ | -------------
DATABASE_ATLAS | this is the key needed to interact with your mongodbAtlas cluster.
stripe_secretKey | your stripe secret key. should look like: sk_test
pusherAppId  | .
pusherClient | .
pusherSecret | .
cloud_name   | your cloudinary key name.
cloud_key    | your cloudinary key.
cloud_secret | your cloudinary secret.
addressKey | secret key for https://postcoder.com/docs/address-lookup#postcode-lookup
        
## starting each service.

service | runs on | command
--------- | ------ | -------
client |localhost: 3000 | npm start
server |localhost: 5000 | npm server
native |expo dev server | npm start
  
 ### take a peak at the app.
 <img width="800" alt="client_image" src="https://user-images.githubusercontent.com/46296577/72754535-01e89200-3bc0-11ea-82f1-73aad7981817.PNG">


## why my app no longer works
* it seems the frontend no longer appears to work. there's a conflict with node_sass and react scripts. when I try to downgrade node_sass
  it works but the app doesn't function correctly. 


## what I liked and learned from this project
* I learned a lot about modularization and splitting a feature into multiple sub modules. This turned out easier to test.
* learned how to test stripe payments though i'm unsure  
* keep your package versions locked and compatible with your version of node. 
* leaving the project alone after 2 years and going back to it will be disastrous.


## my thoughts on this project

coming back to the project years later i'm left quite puzzled with cloning the project and getting it working from scratch.
* my documentation is abysmall. 
* i forgotten to include a postman json file showing how each route should work and what body or query parameters 
  to use.
