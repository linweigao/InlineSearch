function openSearchWindow(searchKey) {

}

// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function (tab) {
  openSearchWindow('')
});

function onInstalled(details: chrome.runtime.InstalledDetails) {
  chrome.contextMenus.create({
    title: "Inline Search",
    contexts: ["selection"],
    onclick: function (e) {
      console.log(e);
      openSearchWindow("");
    }
  });
}

chrome.runtime.onInstalled.addListener(onInstalled)

