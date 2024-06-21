function normalizeURL(url) {
    const urlObj = new URL(url)
    let path = `${urlObj.hostname}${urlObj.pathname}`
    if (path.slice(-1) === '/') {
        path = path.slice(0, -1)
    }
    return path
}

export { normalizeURL };
