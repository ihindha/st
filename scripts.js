/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"LSa75LuPXpEIPynM","label":"Mina saker","bookmarks":[{"id":"dsQBEvxoeHy2zTJw","label":"GitLab","url":"https://gitlab.com/ihinda"},{"id":"aHddwh3AulVPjv8E","label":"GitLab - Mitt skrivande","url":"https://gitlab.com/chskriv"},{"id":"cr1oTriaKpIhtU11","label":"Mitt Skrivande Liv","url":"https://msl.chle.se/"},{"id":"zo57PHl9ZAJrAXez","label":"Mer...","url":"/mitt/index.html"}]},{"id":"6VSnNbCN8wzOpqsm","label":"Nyheter","bookmarks":[{"id":"K5lXYk9qcJjOusPl","label":"Dagens Nyheter","url":"https://www.dn.se/"},{"id":"dLj8DMxBEJSIu5gn","label":"SVT Nyheter","url":"https://www.svt.se/"},{"id":"IlZYpYxdaVG4dkBT","label":" ","url":""},{"id":"pryT46ZFgZJRkDDB","label":"Mer...","url":"nytt/index.html"}]},{"id":"TuZrDsg2IKFUdSir","label":"Uppslag","bookmarks":[{"id":"AbeNvkpONHbN82s3","label":"Svenska Akademins Ordböcker","url":"https://svenska.se"},{"id":"o8toTKZO2A68fvfd","label":"Wikipedia (svenska)","url":"https://sv.wikipedia.org/wiki/Portal:Huvudsida"},{"id":"Z4afMpX0gsWmdeyE","label":"LIBRIS","url":"https://libris.kb.se/"},{"id":"ZNWFHRABLqgCmjT2","label":"Mer...","url":"/upp/index.html"}]},{"id":"0iGsBvmT4Xolqf28","label":" Handel m.m.","bookmarks":[{"id":"Gd8cNI83lqBbAPJO","label":"Adlibris","url":"https://www.adlibris.com/se"},{"id":"qlehbpUdqxNIdR4J","label":"Bokus","url":"https://www.bokus.com/"},{"id":"1S0A2Uvm7r4fNLjm","label":"Antikvariat.net","url":"https://www.antikvariat.net/sv/?currency=SEK"},{"id":"Pg6Xs8AEf4x9n8oB","label":"Mer...","url":"handel/index.html"}]},{"id":"NxOQjkQGnTy6Pj5T","label":"Nöje","bookmarks":[{"id":"TEaHZkJViRJf6zAH","label":"YouTube","url":"https://www.youtube.com"},{"id":"LFdDVlkSijIoS7ts","label":"Disney+","url":"https://www.disneyplus.com/sv-se/home"},{"id":"BHwXbw5oh9KE3PaK","label":"Bubblan.nu","url":"https://bubblan.nu"},{"id":"qTMLl1n0wJGChCmY","label":"Mer...","url":"noje/index.html"}]},{"id":"ko3mrXJPs5xbTtIW","label":"Övrigt","bookmarks":[{"id":"xexEAMSimtJll7GY","label":"Paypal","url":"https://www.paypal.com/se/home"},{"id":"eWBxfDToZytC8J1k","label":"Mastodon.nu","url":"https://mastodon.nu/home"},{"id":"0BMdXVxksaBSWXED","label":"Mer...","url":"ovrigt/index.html"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
