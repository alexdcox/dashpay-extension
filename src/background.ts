import browser from "webextension-polyfill";

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
  browser.tabs.create({
    url: 'wrapper.html',
    active: true
  })
});