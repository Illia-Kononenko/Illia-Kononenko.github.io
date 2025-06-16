var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
var xhr = new XHR();
xhr.open('GET', 'https://illia.kononenko2109.workers.dev/?url=' + encodeURIComponent(window.location), true);
xhr.onload = function() {
	var resp = JSON.parse(this.responseText);
	if(resp.error){
		alert('Ошибка: '+resp.error);
	}else{
		var alertStr = '';
		var wordsWithoutA = '';
		var bigrammes = '';
		var lemma_words = '';
		var words_with_alt = '';
		var ankors = '';
		var words = parseInt(resp.charactersWords);
		for(var key in resp.words_without_a){
			plot = (parseInt(resp.words_without_a[key]) / words) * 100;
			plot = plot.toFixed(2);
			wordsWithoutA += key+' <em>('+resp.words_without_a[key]+'/'+plot+')</em>, ';
		}
		
		for(var key in resp.bigrammes){
			bigrammes += key+' ('+resp.bigrammes[key]+'), ';
		}		
		
		for(var key in resp.lemma_words){
			lemma_words += key+' ('+resp.lemma_words[key]+'), ';
		}		
		
		for(var key in resp.words_with_alt){
			words_with_alt += key+' ('+resp.words_with_alt[key]+'), ';
		}	
		console.log(resp.ankors);
		for(var key in resp.ankors){
			ankors += key+' ('+resp.ankors[key]+'), ';
		}
		
		alertStr += '<p><b>Слов:</b> '+words+'</p>';
		alertStr += '<p><b>Символов без пробелов:</b> '+resp.characters+'</p>';
		alertStr += '<p><b>ТОП-10 слов без учета анкоров | слово (вхождения/плотность):</b> '+wordsWithoutA.substr(0,wordsWithoutA.length-2)+'</p>';
		alertStr += '<p><b>ТОП-10 слов с лемматизацией:</b> '+lemma_words.substr(0,lemma_words.length-2)+'</p>';
		alertStr += '<p><b>ТОП-10 биграмм:</b> '+bigrammes.substr(0,bigrammes.length-2)+'</p>';
		alertStr += '<p><b>ТОП-10 слов включая alt и title картинок:</b> '+words_with_alt.substr(0,words_with_alt.length-2)+'</p>';
		alertStr += '<p><b>ТОП-10 слов в анкорах внутренних ссылок:</b> '+ankors.substr(0,ankors.length-2)+'</p>';
				
		var topBS = document.createElement("style");
		topBS.setAttribute("type", "text/css");
		topBS.innerHTML = ".pixelTopBlockWrp{position:fixed;width:100%;top:0;left:0;background:#f8f8f8;z-index:999999;text-align:left;border-bottom:1px solid #9D9DA1;color:#000;font-family:arial;max-height:50%;overflow-y:auto;}.pixelTopBlockWrp .close {float:right;cursor:pointer;color:#000;font-size: 24px;line-height: 0;padding: 8px 0 0;}.topBlock{padding:5px 10px;font-size:14px;line-height: 16px;}.topBlock p{margin:0 0 0.3em 0 !important;}";
		document.getElementsByTagName("body")[0].appendChild(topBS);
		var topBlock = document.createElement("div");
		topBlock.className = 'pixelTopBlockWrp';
		topBlock.innerHTML = '<div class="topBlock"><b class="close" onclick="javascript:(function(){var topDivBS = document.querySelector(\'div.pixelTopBlockWrp\'); document.getElementsByTagName(\'body\')[0].removeChild(topDivBS);})();">\u00d7</b>'+alertStr+'</div>';
		document.getElementsByTagName("body")[0].appendChild(topBlock);
	}
}
xhr.onerror = function() {
  alert( 'Ошибка ' + this.status );
}
xhr.send();
