$(function(){
	chrome.storage.local.get(['word','bool'],function(value) {
		console.log(`ローカルストレージの内容: ${value.word,value.bool}`);
		if (value.bool) {
			const url = "https://Chrome-extension.ryotaasai.repl.co?word=";
			for (i = 0; i < value.word.length; i++) {
				console.log(i + " : " + value.word[i]);
				fetch(url + value.word[i])
				.then(response => response.json())
				.then(api_res => {
					words = [api_res.word1, api_res.word2, api_res.word3, api_res.word4, api_res.word5];
					for (i = 0; i < 5; i++) {
						console.log(words[i] + "を検索");
						if ($("*").contents().text().indexOf(words[i]) != -1) {
							let rtnPromise = chrome.runtime.sendMessage({content:"save_url",package:location.href});
        					rtnPromise
        					.then(handleResponse, handleError);
							chrome.storage.local.get('url',function(value) {
								if (location.href != value.url)
									location.href = chrome.runtime.getURL("/alert/alert2.html");
							});
						}
					}
				})
				.catch(error => console.error(error));
			}
		}else {
			for (i = 0; i < value.word.length; i++) {
				console.log(value.word[i] + "を検索");
				if ($("*").contents().text().indexOf(value.word[i]) != -1) {
					let rtnPromise = chrome.runtime.sendMessage({content:"save_url",package:location.href});
					rtnPromise
					.then(handleResponse, handleError);
					chrome.storage.local.get('url',function(value) {
						if (location.href != value.url)
							location.href = chrome.runtime.getURL("/alert/alert2.html");
					});
				}
			}
		}
	});

	function handleResponse(message) {
        if (message.to == "warn") {
            console.log(message.res);
        }
    }
    function handleError(error) {
		console.log(`Error: ${error}`);
	}
});