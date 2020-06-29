export function download(url, filename) {
  let link = document.createElement("a");
  link.setAttribute("download", filename);
  link.setAttribute("href", url);
  link.click();
}
