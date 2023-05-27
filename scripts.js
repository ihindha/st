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
  window.open(targetUrl)
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"LSa75LuPXpEIPynM","label":"Mina saker","bookmarks":[{"id":"dsQBEvxoeHy2zTJw","label":"GitLab","url":"https://gitlab.com/ihinda"},{"id":"aHddwh3AulVPjv8E","label":"GitHub","url":"https://github.com/"},{"id":"cr1oTriaKpIhtU11","label":"Mitt Skrivande Liv","url":"https://msl.chle.se/"},{"id":"Q4P2QDkuAN3Gk8EE","label":"MSL | Lokalt","url":"http://localhost:1313/"}]},{"id":"6VSnNbCN8wzOpqsm","label":"Nyheter","bookmarks":[{"id":"K5lXYk9qcJjOusPl","label":"Dagens Nyheter","url":"https://www.dn.se/"},{"id":"dLj8DMxBEJSIu5gn","label":"SVT Nyheter","url":"https://www.svt.se/"},{"id":"0yyLY2vRQANKiZQ5","label":"HD","url":"https://www.hd.se"},{"id":"yV0V3rbeBjPOVgar","label":"SvD | Svenska Dagbladet","url":"https://www.svd.se/"}]},{"id":"TuZrDsg2IKFUdSir","label":"Uppslag","bookmarks":[{"id":"AbeNvkpONHbN82s3","label":"Svenska Akademins Ordböcker","url":"https://svenska.se"},{"id":"o8toTKZO2A68fvfd","label":"Wikipedia (svenska)","url":"https://sv.wikipedia.org/wiki/Portal:Huvudsida"},{"id":"Z4afMpX0gsWmdeyE","label":"LIBRIS","url":"https://libris.kb.se/"},{"id":"AhAV0qCwsJHFTMWL","label":"Fantasy name generators","url":"https://www.fantasynamegenerators.com/"}]},{"id":"0iGsBvmT4Xolqf28","label":" Handel m.m.","bookmarks":[{"id":"Gd8cNI83lqBbAPJO","label":"Adlibris","url":"https://www.adlibris.com/se"},{"id":"qlehbpUdqxNIdR4J","label":"Bokus","url":"https://www.bokus.com/"},{"id":"EPN1s66hm3NYBwX8","label":"Amazon.se","url":"https://www.amazon.se"},{"id":"1S0A2Uvm7r4fNLjm","label":"Antikvariat.net","url":"https://www.antikvariat.net/sv/?currency=SEK"}]},{"id":"vMYg6W1tauEEjRk4","label":"Socialt","bookmarks":[]},{"id":"NxOQjkQGnTy6Pj5T","label":"Nöje","bookmarks":[]},{"id":"ko3mrXJPs5xbTtIW","label":"Övrigt","bookmarks":[]}]

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
