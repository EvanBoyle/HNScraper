var Q = require('q');
var request = require('request');

var uriTemplatePrefix = 'https://hacker-news.firebaseio.com/v0/item/'
var uriTemplateSuffix = '.json';

var formatURI = function(id) {
	return uriTemplatePrefix + id + uriTemplateSuffix;
};

// who's hiring posts
var postIDs = [
	9639011 /*june 15*/,
	9303396 /*april 15*/,
	9127232 /*march 15*/,
	
	 ];
var searchTerms = ['search', 'elastic', 'solr', 'lucene'];
var promises = [];
var commentPromises = [];
var kids = [];
var comments = [];

//get the top level comment ids for each post
postIDs.forEach(function(id){
	var options = {
        url: formatURI(id),
        withCredentials: false
    };
	
	var deferred = Q.defer();
	promises.push(deferred.promise);
	
	request.get(options, function(error, response, body){
			var result = JSON.parse(body);
			kids.push.apply(kids, result.kids);
			deferred.resolve();
	});
});

//once all comments ids are collected, get all comments
Q.allSettled(promises).then(function(results){
	console.info(kids.length);
	kids.forEach(function(id){
		var options = {
	        url: formatURI(id),
	        withCredentials: false
	    };
		
		var deferred = Q.defer();
		commentPromises.push(deferred.promise);
		
		request.get(options, function(error, response, body){
			var result = JSON.parse(body);
			var matches = searchTerms.length;
			searchTerms.forEach(function(term){
				if(result.text){
					matches += result.text.indexOf(term);
				}
			});
			if(matches > 0){
				comments.push(
					{
						text: result.text,
						time: new Date(result.time * 1000).toString()
					}
				);
			}
			
			deferred.resolve();
		});
	});
	
	Q.allSettled(commentPromises).then(function(results){
		console.info(comments.length);
		
	});

});


