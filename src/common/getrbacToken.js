const getQuery = (queryName) => {
  let reg = new RegExp('(^|&)' + queryName + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
export default getQuery;