var sources = new Array("bbc-news")

function startNews(pageLocation, serviceIP) {
	
	function GetNews() {
		// Retrieve news from server
		//
//		qry =  "?sources=";
//		for (x = 0; x < sources.length; x++) {
//			qry +=  " " + sources[x];
//		}
//		qry +=  "&sortby=latest";
		//
		var theUri = "/news/headlines/sources";
		httpGetAsync(serviceIP, theUri, createNews);
		// (as XMLHttpRequest is being used async,
		// return the createNews as callback)
		//
	}
	
	function createNews(data) {
		//
		var newsDiv = document.createElement("DIV");
		newsDiv.className = "news-container";
		//
		// Parse json
		dataJson = JSON.parse(data);
		//
		var news_articles = dataJson.articles;
		var news_sources = dataJson.sources;
		//
		var tempArticles = new Array();
		//
//		for (var s in news) {
//			var source = news[s];
//			var sourceArticles = source.articles;
//			var sourceDetails = source.source_details;
//		}
		//
		for (var a in news_articles) {
			var article = news_articles[a];
			//
		    var articleDateObj = moment(article.publishedAt, "YYYY-MM-DDTh:mm:ssZ"); //2017-02-23T11:48:47Z
		    var articleDatetime = articleDateObj.format("DD-MM-YYYY HH:mm");
		    //
		    var headline = article.title;
		    //
			// 'urlsToLogos' no longer available from newsapi.org
//			var imgSource = document.createElement("IMG");
//			imgSource.src = article.urlToImage;
//			imgSource.className = "grayscale news_img";
//			var divImgSource = document.createElement("DIV");
//			divImgSource.className = "col-xs-1";
//			divImgSource.appendChild(imgSource)
			var divTitleArticle = document.createElement("DIV");
			divTitleArticle.className = "col-xs-9 news_title"; //col-xs-8 when logo present
			divTitleArticle.innerHTML = headline;
			var divTitleDatetime = document.createElement("DIV");
			divTitleDatetime.className = "col-xs-3 material-text-light-disabled news_date";
			divTitleDatetime.innerHTML = articleDatetime;
			//
			var rowDiv = document.createElement("DIV");
			rowDiv.className = "row article_row";
//			rowDiv.appendChild(divImgSource);
			rowDiv.appendChild(divTitleArticle);
			rowDiv.appendChild(divTitleDatetime);
			//
			tempArticles[articleDateObj.format("YYYY-MM-DD HH:mm")] = rowDiv;
			//
		}
		//
		// Sort tempArticles and then add to newsDiv
		keys = [];
		for (k in tempArticles) {
		  if (tempArticles.hasOwnProperty(k)) {
		    keys.push(k);
		  }
		}
		keys.sort();
		keys.reverse();
		//
		for (i = 0; i < keys.length; i++) {
		  k = keys[i];
		  newsDiv.appendChild(tempArticles[k]);
		}
		//
		// Add to body of document
		document.getElementById(pageLocation).innerHTML = "";
		document.getElementById(pageLocation).appendChild(newsDiv);
	}
	
	GetNews();
	setInterval(GetNews, 50000); //5minutes
}