var XHR = 'onload' in new XMLHttpRequest ? XMLHttpRequest : XDomainRequest;
var xhr = new XHR;
xhr.open('GET', location.protocol + '//' + location.hostname + '/robots.txt', true);
xhr.send();
xhr.onload = function () {
	var returnStr,
	robotsName,
	rules,
	rule,
	rulesArr = [],
	robotsContent;
	var returnRobotsStr = '';
	var resp = this.responseText;
	if(this.status != 200){
		returnStr = '— Файл robots.txt не вернул код ответа 200 ОК';
	}else{
		resp = resp.replace(/\#.*/g, '');
		resp = resp.replace(/\r?/g, '');
		resp = resp.replace(/:\s{2,}/g, ': ');
		resp = resp.replace(/\n/g, 'ef247be4693a');
		if(resp.toLowerCase().indexOf('user-agent: yandex') + 1) {
			rules = resp.match(/User-agent: Yandex.+?ef247be4693aef247be4693aUser-agent:/i);
			if(!rules) rules = resp.match(/User-agent: Yandex.*$/i);
		}

		if(!rules && resp.toLowerCase().indexOf('user-agent: *') + 1) {
			rules = resp.match(/User-agent: \*.+?ef247be4693aef247be4693aUser-agent:/i);
			if(!rules) rules = resp.match(/User-agent: \*.+$/i);
		}
		if(!rules) robotsResult = true;
		var cleanParamRules = resp.toLowerCase().match(/clean-param: (.+?)ef247be4693a/ig);
	}
	
	if(!returnStr && rules){
		rules = rules[0].split('ef247be4693a');
		for(var i = 0; i < rules.length; i++){
			rule = rules[i].trim();
			if(rule.toLowerCase().substr(0, 8) == 'disallow'){
				var x = [];
				var z = rule.match(/^Disallow: (.+)/i);
				x[0] = 'Disallow';
				if(z && z[1]){
					x[1] = z[1];
					x[2] = z[1].length;
				}else{
					x[1] = '';
					x[2] = 0;
				}
				rulesArr[rulesArr.length] = x;
			}
			
			if(rules[i].toLowerCase().substr(0, 5) == 'allow'){
				var x = [];
				var z = rule.match(/^Allow: (.+)/i);
				x[0] = 'Allow';
				if(z && z[1]){
					x[1] = z[1];
					x[2] = z[1].length;
				}else{
					x[1] = '';
					x[2] = 0;
				}
				rulesArr[rulesArr.length] = x;
			}
		}
		
		function superSort(i, ii) {
		 if (i[2] > ii[2]) return 1;
		 else if (i[2] < ii[2]) return -1;
		 else return 0;
		}
		rulesArr = rulesArr.sort(superSort);
		// var url = location.pathname + location.search;
		var url = location.href.substring(location.origin.length);
		var robotsResult = true;
		var t = -1;
		for(var i = 0; i < rulesArr.length; i++){
			var rexStr = rulesArr[i][1];
			if(rexStr == '' && rulesArr[i][0] == 'Disallow'){
				robotsResult = true;
				rule = rulesArr[i][1];
			}else if(rexStr == '' && rulesArr[i][0] == 'Allow'){
				robotsResult = false;
				rule = rulesArr[i][1];
			}else{
				rexStr = rexStr.replace(/([\:\/\-\+\?\(\)\=\!\|\{\}\[\]\^\.\\])/g, '\\$1');
				rexStr = rexStr.replace(/\*/g, '.*');
				if(rexStr.substr(0, 2) == '\\/') rexStr = '^' + rexStr;
				if(rexStr.substr(rexStr[rexStr.length-1], 1) != '$') rexStr = rexStr + '.*';
				if(url.search(new RegExp(rexStr)) != -1){
					if(t != rulesArr[i][2]){
						t = rulesArr[i][2];
						robotsResult = (rulesArr[i][0] == 'Allow')? true : false;
						rule = rulesArr[i][1];
					}else{
						if(rulesArr[i][0] == 'Allow') robotsResult = true;
					}
				}
			
			}
		}
	}
	
	if(!returnStr) returnStr = (robotsResult) ? '✓ URL разрешен для индексации в файле robots.txt' : '— URL запрещен для индексации в файле robots.txt правилом: Disallow: ' + rule;
	
	if(cleanParamRules && location.search.length > 0){
		var params = window.location.search.replace('?','').split('&').reduce(
        function(p,e){
            var a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
				},{});
		for(var i = 0; i < cleanParamRules.length; i++){
			rule = cleanParamRules[i].substr(13);
			rule = rule.substr(0, rule.length - 12);
			rules = rule.split(' ');
			if(!rules[1]){
				rexStr = '.*';
			}else{
				rexStr = rules[1].replace(/([\:\/\-\+\?\(\)\=\!\|\{\}\[\]\^\.\\])/g, '\\$1');
				rexStr = rexStr.replace(/\*/g, '.*');
				if(rexStr.substr(0, 2) == '\\/') rexStr = '^' + rexStr;
				if(rexStr.substr(rexStr[rexStr.length-1], 1) != '$') rexStr = rexStr + '.*';
			}
			// var url = location.pathname + location.search;
			var url = location.href.substring(location.origin.length);
			if(url.search(new RegExp(rexStr)) != -1){
				var gets = rules[0].split('&');
				for(var g = 0; g < gets.length; g++){
					if(params[gets[g]] || params[gets[g]] == '') delete params[gets[g]];
				}
			}
		}
			url = location.protocol + '//' + location.hostname +  location.pathname;
			var l = Object.keys(params).length;
		if(l > 0){
			url += '?';
			var g = 1;
			for(var x in params){
				if(params[x] == 'undefined') url += x;
				else if(params[x] == '') url += x + '=';
				else url += x + '=' + params[x];
				if(l != g) url += '&';
				g++;
			}
		}
		if(location.href != url) returnStr += '\n— URL после учета Clean-Param: ' + url;
	}
	
	
	var meta = document.getElementsByTagName('meta');
	for (var i = 0; i < meta.length; i++) {
		robotsName = meta[i].getAttribute('name');
		if (robotsName) {
			robotsName = robotsName.toLowerCase();
			if (robotsName == 'robots' || robotsName == 'yandex' || robotsName == 'googlebot') {
				robotsContent = meta[i].getAttribute('content');
				if (robotsContent)
					robotsContent = robotsContent.toLowerCase();
				if (robotsContent.indexOf('noindex') + 1 || robotsContent.indexOf('none') + 1)
					returnRobotsStr += '\n— URL запрещен для индексации meta-тегом для робота ' + robotsName + '\n'
			}
		}
	}
	if (!returnRobotsStr)
		returnStr += '\n✓ URL разрешен для индексации meta-тегом\n';
	else
		returnStr += returnRobotsStr;
	var link = document.getElementsByTagName('link'),
	rel = '',
	hr = '',
	returnLinkStr = '';
	for (var i = 0; i < link.length; i++) {
		rel = link[i].getAttribute('rel');
		if (rel) {
			rel = rel.toLowerCase();
			if (rel == 'canonical') {
				hr = link[i].getAttribute('href');
				if (hr && (hr !== window.location.href && window.location.protocol + '//' + window.location.hostname + hr !== window.location.href))
					returnLinkStr = '— Канонической страницей является ' + decodeURI(hr)
			}
		}
	}
	if (!returnLinkStr)
		returnStr += '✓ Страница является канонической';
	else
		returnStr += returnLinkStr;
	alert(returnStr);
}