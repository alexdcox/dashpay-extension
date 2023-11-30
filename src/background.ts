import browser from "webextension-polyfill";

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
  browser.tabs.create({
    url: 'chrome-extension://pehllhcpmlhimdapoaheimbljjcdmndk/wrapper.html',
    active: true
  })
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.cmd == "read_file") {
    fetch(browser.runtime.getURL('test.html')).then(sendResponse)
    return true
  }
})