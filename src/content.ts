console.log('Inline Search')
const divId = "inline-search-ext-div";
const frameId = "inline-search-ext-iframe"

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
  mask.className = 'inline-search-ext-mask';
  mask.style.display = 'none';
  container.appendChild(mask);

  const close = document.createElement('span')
  close.className = 'inline-search-ext-close'
  close.innerText = '×'
  close.onclick = e => {
    e.stopPropagation();
    e.preventDefault();
    container.style.display = 'none';
  }
  mask.appendChild(close);

  // const back = document.createElement('span')
  // back.className = 'inline-search-ext-back'
  // back.innerText = '<'
  // mask.appendChild(back);

  // const forward = document.createElement('span')
  // forward.className = 'inline-search-ext-forward'
  // forward.innerText = '>'
  // mask.appendChild(forward);


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

  // back.onclick = e => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   iframe.contentWindow.history.back();
  // }

  // forward.onclick = e => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   iframe.contentWindow.history.forward();
  // }

  return container;
}

