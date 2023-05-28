/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
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

const bookmarks = [{"id":"smZBRAhJ8aU7RQXm","label":"Böcker","bookmarks":[{"id":"awXM7XZymPWIog0h","label":"Adlibris","url":"https://www.adlibris.com/se"},{"id":"0t8QcXHXMPrIfKc7","label":"Bokus","url":"https://www.bokus.com/"}]},{"id":"zDYJaIww3lxjqtBX","label":"Bara E","bookmarks":[{"id":"c85STFRM5W18QjCs","label":"Bokon","url":"https://bokon.se/"},{"id":"a8xb6ZqCpt4VIeFX","label":"GooglePlay Böcker","url":"https://play.google.com/store/books"}]},{"id":"EkDLByvHUUeiAR3w","label":"Antikvariskt","bookmarks":[{"id":"eaDQsPuktRvBCcrr","label":"Antikvariat.net","url":"https://www.antikvariat.net/sv/?currency=SEK"}]},{"id":"IGgufZp8cPwxYutc","label":"Elektronik","bookmarks":[{"id":"KUkMhnv2sjpxklDc","label":"Kjell & Company","url":"https://www.kjell.com/se"}]},{"id":"zF5sDxWHrv5bkwXv","label":"Övrigt","bookmarks":[{"id":"JsyXJfMiJ54ZOVBb","label":"Amazon.se","url":"https://www.amazon.se/"}]},{"id":"T3APDt0Ly2bWKaJE","label":"Admin","bookmarks":[{"id":"9JnhS6i6wb8gX2nv","label":"Upp...","url":"../index.html"}]}]

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
