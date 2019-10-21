

module.exports.home = ( req , res , next ) => {
  req.status( 200 ).json({ route: 'home' });
}

module.exports.vendor = ( req , res , next ) => {
  req.status( 200 ).json({ route: 'vendor' });
}
