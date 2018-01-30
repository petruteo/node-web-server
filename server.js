const express = require( 'express' );
const hbs = require( 'hbs' );
const fs = require( 'fs' );

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials( __dirname + '/views/partials' );
app.set( 'view engine', 'hbs' );

//server log
app.use( ( req, res, next ) => {
	var now = new Date()
		.toString();
	log = `${now}: ${req.method} ${req.url}`
	console.log( log );
	fs.appendFile( 'server.log', log + '\n', ( err ) => {
		if ( err ) {
			console.log( err );
		};
	} );
	next();
} );

//maintenance page
// app.use( ( req, res, next ) => {
//
// 	res.render( 'maintenance.hbs' );
//
// } );

app.use( express.static( __dirname + "/public" ) );

//
hbs.registerHelper( 'getCurrentYear', () => {
	return new Date()
		.getFullYear()
} );

hbs.registerHelper( 'screamIt', ( text ) => {
	return text.toUpperCase()
} );

app.get( '/', ( req, res ) => {
	res.render( 'home.hbs', {
		pageTitle: "Prima pagina dinamica",

		currentDay: new Date()
			.getDate(),
		message: "Bravo baieti ce pagina ai facut"
	} );

} );

app.get( '/about', ( req, res ) => {
	res.render( 'about.hbs', {
		pageTitle: "About page dynamic",

	} );
} );

app.get( '/bad', ( req, res ) => {
	res.send( {
		errorMessage: "My personal error message"
	} );
} );


app.listen( port, () => {
	console.log( `server is up om port ${port}` );
} );
