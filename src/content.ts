console.log('Inline Search')

window.addEventListener("load", function load(event) {
  window.removeEventListener("load", load, false); //remove listener, no longer needed

  createInlineWindow();
})

function createInlineWindow() {
  let div = document.createElement('div');
  div.style.position = "fixed";
  div.style.width = "400px";
  div.style.height = "100%";
  div.style.top = "0";
  div.style.right = "0";

  document.body.appendChild(div);

  let iframe = document.createElement("iframe");
  iframe.src = "https://www.google.com";
  iframe.width = "100%";
  iframe.height = "100%";

  div.appendChild(iframe)
}

