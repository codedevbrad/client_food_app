const nodemailer = require('nodemailer');
const asyncSupport = require('./dev/service_helpers/async_support');

var styles = {
    header : '' ,
    body:  '' ,
    color: "color:blue"
}

const sendEmail = async ( emailTo , orderDetails , orderLink ) => {
        var transporter = nodemailer.createTransport({
           host: "smtp.mailtrap.io",
           port: 2525,
           auth: {
             user: "262fb108a7605f",
             pass: "33bc0d92482e70"
           }
       });
      var mailOptions = {
        from:    'theAshcott@gmail.com',
        to:      'myfriend@yahoo.com',
        subject: 'your food order',
        html:   ` <h3> your order has been made </h3>
                  <p>  style=${ styles.color }> view your order and track its progress at </p>
                  <p>  <a href="http://localhost:5000/viewOrder">     </a> </p>
                  `
      };
      return new Promise( async( resolve , reject ) => {
              await transporter.sendMail( mailOptions , ( err , info ) => {
                    if ( err ) { reject( 'could not send email to client' ) }
                    else {
                      resolve( info );
                    }
              });
      });
};


module.exports = sendEmail;
