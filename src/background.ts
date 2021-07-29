function openSearchWindow(searchKey) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { inlineSearchExt: searchKey, inlineSearchExtOpen: true });
  });
}

// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function (tab) {
  openSearchWindow("");
});

function onInstalled(details: chrome.runtime.InstalledDetails) {
  chrome.contextMenus.create({
    title: "Inline Search",
    contexts: ["selection"],
    onclick: function (e) {
      openSearchWindow(e.selectionText);
    }
  });
}

chrome.runtime.onInstalled.addListener(onInstalled)

const xframOptions = "x-frame-options";
const CSPOptions = "content-security-policy"

chrome.webRequest.onHeadersReceived.addListener(info => {
  const headers = info.responseHeaders; // original headers

  let retHeaders = headers.filter(header => {
    const name = header.name.toLowerCase();
    const isCSP = name === CSPOptions;
    const isXFrame = name === xframOptions;

    return !isCSP && !isXFrame;
  });

  return { responseHeaders: retHeaders };
}, {
  urls: ["<all_urls>"], // match all pages
}, ["blocking", "responseHeaders", "extraHeaders"]);

