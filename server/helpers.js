const formatPost = (entry, entryType) => {
  let params
  if (entryType === 'user') {
    params = [
      entry.name,
      entry.wieght,
      entry.bouldergrade,
      entry.sportgrade,
      entry.tradgrade
    ]
  } else if (entryType === 'session') {
    params = [
      entry.type,
      entry.user
    ]
  } else if (entryType === 'routine') {
    entry.type,
      entry.user
  }
  return params
}

module.exports = {
  formatPost
}