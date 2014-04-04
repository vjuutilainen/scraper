var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime');
var querystring = require('querystring');
var Scraper = require('./scraper').Scraper;

var collections = ["bestmovies"];

var giveStaticFile = function(file,res){

	fs.readFile(file,'utf8', function(err,fileData){
			if(err) throw "not found";
			res.writeHead(200, {'Content-Type':mime.lookup(file)});
			res.end(fileData);
			
		});

}

var routes = {
	'/': 'index.html',
	'/main.js': 'main.js',
	'/d3.v3.min.js': 'd3.v3.min.js',
	'/style.css': 'style.css'
};

var requestHandler = function(req,res){

	var urlstring = req.url;

	// static files

	if (urlstring in routes){
		console.log("Received a request for " + urlstring);
		giveStaticFile(routes[urlstring],res);
	}

	// API for data

	if (url.parse(urlstring).pathname === '/data'){

		console.log("Received a request for data: " + urlstring);

		var query = querystring.parse(url.parse(urlstring).query);

		res.writeHead(200, {'Content-Type':'application/json'});
		
		scrapeData(query,res);

		
	}

}

var scrapeData = function(query,res){

	var scrapeUrl = query.address;
	var selector = query.selector;
	var properties = query.properties = query.properties.split(' ');

	myScraper = new Scraper();
	myScraper.selector = selector;
	myScraper.properties = properties;

	myScraper.run(scrapeUrl,function(objects){

		var data = JSON.stringify(objects);
		res.end(data);
	
	});


}

http.createServer(requestHandler).listen(8888);
console.log("Server started");
