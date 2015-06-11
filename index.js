var fs = require('fs');
var Q = require('q');
var request = require('request');

var uriTemplatePrefix = 'https://hacker-news.firebaseio.com/v0/item/'
var uriTemplateSuffix = '.json';

var formatURI = function(id) {
	return uriTemplatePrefix + id + uriTemplateSuffix;
};

// who's hiring posts
var postIDs = [
	9639001 /*june 15*/,
	9303396 /*april 15*/,
	9127232 /*march 15*/,
	8980047 /*february 15*/,
	8822808 /*january 15*/,
	8681040 /*december 14*/,
	8542892 /*november 14*/,
	8394339 /*october 14*/,
	8252715 /*september 14*/,
	8120070 /*august 14*/,
	7970366 /*july 14*/,
	7829042 /*june 14*/,
	7679431 /*may 14*/,
	7507765 /*april 14*/,
	7324236 /*march 14*/,
	7162197 /*february 14*/,
	6995020 /*january 14*/,
	6827554 /*december 13*/,
	6653437 /*november 13*/,
	6475879 /*october 13*/,
	6310234 /*september 13*/,
	6139927 /*august 13*/,
	5970187 /*july 13*/,
	5803764 /*june 13*/
	
	 ];
var searchTerms = ['elastic', 'solr', 'lucene'];
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
			if(result.text)
			{
				searchTerms.forEach(function(term){
					matches += result.text.toLowerCase().indexOf(term);
				});
				
				if(matches > 0)
				{
					comments.push(
						{
							text: result.text,
							time: new Date(result.time * 1000).toString()
						});
					comments.push('<h2> end of record </h2> <br/>');
				}
			}
			
			
			deferred.resolve();
		});
	});
	
	Q.allSettled(commentPromises).then(function(results){
		console.info(comments.length);
		var result = JSON.stringify(comments, null, 4);
		fs.writeFile("HNSearchPosts.html", result);
	});

});


