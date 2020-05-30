function getLastSegmentURL(url) {
  return url.substring(url.lastIndexOf('/') + 1);
}

export { getLastSegmentURL };