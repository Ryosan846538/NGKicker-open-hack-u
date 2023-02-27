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
					$(".MjjYud").each(function() {
						for (i = 0; i < words.length; i++) {
							console.log(words[i] + "を検索");
							if ($(this).contents().text().indexOf(words[i]) != -1) {
								console.log(word[i] + "が含まれるものを消去");
								$(this).css('display','none');
							}
						}
					});
				})
				.catch(error => console.error(error));
			}
		}else {
			$(".MjjYud").each(function() {
				for (i = 0; i < value.word.length; i++) {
					console.log(value.word[i] + "を検索");
					if ($(this).contents().text().indexOf(value.word[i]) != -1) {
						console.log(word[i] + "が含まれるものを消去");
						$(this).css('display','none');
					}
				}
			});
		}
	});
});