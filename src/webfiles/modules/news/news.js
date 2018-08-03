function startNews(moduleId, serviceIP, dividerTop, dividerBottom) {
	
	function GetNews() {
		// Retrieve news from server
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
		newsDiv.className = "news_container";
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
		    //var articleDatetime = articleDateObj.format("DD-MM-YYYY HH:mm");
		    var articleDatetime = articleDateObj.format("HH:mm");
		    //
		    var headline = article.title;
		    //
			// 'urlsToLogos' no longer available from newsapi.org
//			var imgSource = document.createElement("IMG");
//			imgSource.src = article.urlToImage;
//			imgSource.className = "grayscale news_article-img";
//			var divImgSource = document.createElement("DIV");
//			divImgSource.className = "col-xs-1";
//			divImgSource.appendChild(imgSource)
			var divTitleArticle = document.createElement("DIV");
			divTitleArticle.className = "col-xs-11 news_article-title"; //col-xs-10 when logo present
			divTitleArticle.innerHTML = headline;
			var divTitleDatetime = document.createElement("DIV");
			divTitleDatetime.className = "col-xs-1 material-text-light-secondary news_article-date";
			divTitleDatetime.innerHTML = articleDatetime;
			//
			var rowDiv = document.createElement("DIV");
			rowDiv.className = "row news_article-row";
//			rowDiv.appendChild(divImgSource);
			rowDiv.appendChild(divTitleDatetime);
			rowDiv.appendChild(divTitleArticle);
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
		//
        document.getElementById(moduleId).innerHTML = "";
        if (dividerTop) {document.getElementById(moduleId).appendChild(dividerDiv());}
        document.getElementById(moduleId).appendChild(newsDiv);
        if (dividerBottom) {document.getElementById(moduleId).appendChild(dividerDiv());}
        //
	}
	
	GetNews();
	setInterval(GetNews, 50000); //5minutes
}