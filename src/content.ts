console.log('Inline Search')
const divId = "inline-search-div";
const frameId = "ineline-search-iframe"

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.inlineSearchExtOpen) {
    let container = document.getElementById(divId) as HTMLDivElement;
    if (!container) {
      container = createInlineWindow();
    }
    container.style.display = "";
    const iframe = document.getElementById(frameId) as HTMLFrameElement;
    if (request.inlineSearchExt) {
      iframe.src = "https://www.google.com/search?q=" + encodeURIComponent(request.inlineSearchExt);
    } else {
      iframe.src = "https://www.google.com"
    }
  }
})

function createInlineWindow() {
  const container = document.createElement('div');
  container.id = divId;
  container.style.position = "fixed";
  container.style.width = "600px";
  container.style.height = "100%";
  container.style.top = "0";
  container.style.right = "0";
  container.style.zIndex = "99999999";

  document.body.appendChild(container);

  const mask = document.createElement('div');
  mask.className = 'mask';
  mask.style.display = 'none';
  container.appendChild(mask);

  const close = document.createElement('span')
  close.className = 'close'
  close.innerText = '×'
  close.onclick = e => {
    e.stopPropagation();
    e.preventDefault();
    container.style.display = 'none';
  }
  mask.appendChild(close);

  container.onmouseenter = e => {
    mask.style.display = 'flex';
  }

  container.onmouseleave = e => {
    mask.style.display = 'none';
  }

  let iframe = document.createElement("iframe");
  iframe.id = frameId;
  iframe.width = "100%";
  iframe.height = "100%";

  container.appendChild(iframe)

  return container;
}

