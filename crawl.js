import { JSDOM } from 'jsdom'

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const anchors = dom.window.document.querySelectorAll('a')

    for (let anchor of anchors) {
        if (anchor.hasAttribute('href')) {
            let url = anchor.getAttribute('href')

            try {
                url = new URL(url, baseURL).href
                urls.push(url)
            } catch (err) {
                console.log(`${err.message}: ${href}`)
            }
        }
    }
    return urls
}

function normalizeURL(url) {
    const urlObj = new URL(url)
    let path = `${urlObj.hostname}${urlObj.pathname}`
    if (path.slice(-1) === '/') {
        path = path.slice(0, -1)
    }
    return path
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    const currentURLObj = new URL(currentURL);
    const baseURLObj = new URL(baseURL);
    if (cerrentURL.hostname !== baseURL.hostname) {
        return pages;
    }
    const normalizedCurrentURL = normalizeURL(currentURL);
    if (pages[normalizedCurrentURL]) {
        pages[normalizedCurrentURL]++;
        return pages;
    }

    pages[normalizedCurrentURL] = 1;

    console.log(`Crawling ${currentURL}...`);
    const html = await fetchHTML(currentURL);
    let urls = getURLsFromHTML(html, baseURL);
    for (const url of urls) {
        pages = await crawlPage(baseURL, url, pages);
    }

    return pages;
}

async function fetchHTML(url) {
    let res;
    try {
        res = await fetch(url);
    } catch (err) {
        throw new Error(`Error fetching page: ${err.message}`);
    }
 
    if (res.status > 399) {
        console.log(`Got HTTP error ${res.status}: ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
        console.log(`Got non-HTML response: ${contentType}`);
    }

    return res.text();
}

export { normalizeURL, getURLsFromHTML, crawlPage };
