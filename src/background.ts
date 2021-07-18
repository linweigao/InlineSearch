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

const HEADERS_TO_STRIP_LOWERCASE = [
  'content-security-policy',
  'x-frame-options',
];

chrome.webRequest.onHeadersReceived.addListener(info => {
  console.log("onHeadersReceived", info.url)

  const headers = info.responseHeaders; // original headers

  const retVal = headers.filter(header => !HEADERS_TO_STRIP_LOWERCASE.includes(header.name.toLowerCase()))
  // for (let i = headers.length - 1; i >= 0; --i) {
  //   let header = headers[i].name.toLowerCase();
  //   if (header === "x-frame-options" || header === "frame-options") {
  //     console.log("try to remove frame")
  //     headers.splice(i, 1); // Remove the header
  //   }

  //   if (header === "content-security-policy") { // csp header is found
  //     // modifying frame-ancestors; this implies that the directive is already present
  //     headers[i].value = headers[i].value.replace("frame-ancestors", "frame-ancestors https://www.google.com/");
  //   }
  // }
  // return modified headers
  return { responseHeaders: retVal };
}, {
  urls: ["<all_urls>"], // match all pages
}, ["blocking", "responseHeaders", "extraHeaders"]);

