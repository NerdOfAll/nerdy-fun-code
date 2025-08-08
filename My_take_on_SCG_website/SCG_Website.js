/* This following stuff is for getting the little "this goes to a different webpage" image to show up to links */
const extSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z" clip-rule="evenodd" />
</svg>
`;

function hasAnyTextChild(node) {
  if (node.nodeType === 3) {
    const strContent = node.textContent;
    return strContent.trim() !== '';
  }
  for (let i = 0; i < node.childNodes.length; i++) {
    if (hasAnyTextChild(node.childNodes[i])) { return true; }
  }
  return false;
}

function linkify(element) {
  const href = element.getAttribute("href");
  if (href.startsWith("/")) { return; }
  if (href.startsWith("https://sandersoncollectorsguild.com/")) { return; }
  if (href.startsWith("https://www.sandersoncollectorsguild.com/")) { return; }

  element.setAttribute("target", "_blank");

  if (hasAnyTextChild(element)) {
    var svgContainer = document.createElement('span');
    svgContainer.setAttribute("class", "external-link");
    svgContainer.innerHTML = extSVG;
    element.appendChild(svgContainer);
  }
}

function setup() {
  const aTags = document.getElementsByTagName("a");
  for (let i = 0; i < aTags.length; i++) {
    linkify(aTags[i]);
  }
}

/* This will be for the rotating images of SCG merch */
let goHereImages = ["https://store.sandersoncollectorsguild.com/cdn/shop/files/unisex-garment-dyed-heavyweight-t-shirt-black-front-6875a8ae5d21d.jpg?v=1752541371&width=1650", "https://store.sandersoncollectorsguild.com/cdn/shop/files/Pin_photo.jpg?v=1751516387&width=1650", "https://store.sandersoncollectorsguild.com/cdn/shop/files/all-over-print-recycled-unisex-zip-hoodie-white-front-6865f42c8b3f3.jpg?v=1751512120&width=1650"]
let x = 0
function change() {
    if (x < goHereImages.length-1) {
        x += 1
    } else {
        x = 0
    }
    let imageThing=document.getElementById("merch_img")
    imageThing.src=goHereImages[x]
}
setInterval(change, 5000)