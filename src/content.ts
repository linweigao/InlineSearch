console.log('Inline Search')
const divId = "inline-search-div";
const frameId = "ineline-search-iframe"

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.inlineSearchExt) {
    let container = document.getElementById(divId) as HTMLDivElement;
    if (!container) {
      container = createInlineWindow();
    } else {
      if (container.style.display === "none") {
        container.style.display = "";
      } else {
        container.style.display = "none";
      }
    }

    const iframe = document.getElementById(frameId) as HTMLFrameElement;
    iframe.src = "https://www.google.com/search?q=" + encodeURIComponent(request.inlineSearchExt);
  }
})

function createInlineWindow() {
  const div = document.createElement('div');
  div.id = divId;
  div.style.position = "fixed";
  div.style.width = "600px";
  div.style.height = "100%";
  div.style.top = "0";
  div.style.right = "0";
  div.style.zIndex = "99999999";

  document.body.appendChild(div);

  let iframe = document.createElement("iframe");
  iframe.id = frameId;
  iframe.width = "100%";
  iframe.height = "100%";

  div.appendChild(iframe)

  return div;
}

