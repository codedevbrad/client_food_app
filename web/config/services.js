const express  = require('express');
const Pusher   = require('pusher');

module.exports = {
    pusher: (  ) => {
        return new Pusher({
            appId:  process.env.pusherAppId  ,
            key:    process.env.pusherClient ,
            secret: process.env.pusherSecret ,
            cluster: 'eu',
            encrypted: true
        });
    } ,
    cloudinaryConfig: ( ) => {
        return {
            cloud_name:  process.env.cloud_name,
            api_key:     process.env.cloud_key ,
            api_secret:  process.env.cloud_secret
        };
    }
}
