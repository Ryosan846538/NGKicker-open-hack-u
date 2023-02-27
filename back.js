//メッセージが
chrome.runtime.onMessage.addListener(handleMessage);

function handleMessage(request, sender, sendResponse) {
    console.log(`メッセージを受信しました: ${request.content}`);
    switch (request.content) {
        case "save_words":
            console.log("受信 : " + request.package);
            chrome.storage.local.set({word:request.package},function() {
                console.log("ローカルストレージに保存完了");
            });
            sendResponse({res:"sucsess", to:"script"});
            break;
            
        case "save_url":
            console.log("url受信 : " + request.package);
            chrome.storage.local.set({url:request.package},function() {
                console.log("urlをローカルストレージに保存完了");
            });
            sendResponse({res:"sucsess", to:"warn"});
            break;
        default:
            break;
    }
}