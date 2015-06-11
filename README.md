# HNScraper
Quick and dirty project to scrape top level comments for hn posts containing certain key words

to run get started:

npm install

node index.js




note that this might take a few minutes as the string matching is pretty naive



Takes all of the HN posts given in the ids array, and crawls them for top level comments containing certain keywords.  

For example:

// who's hiring posts
var postIDs = [
	9639011 /*june 15*/,
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

will find job postings asking for search technology skills in whoshiring over the last two years.
