function printReport(pages) {
    console.log('\n==================== STARTING REPORT ====================\n');
    
    const pagesArr = sortPages(pages);

    for (const page of pagesArr) {
        console.log(`Found ${page[1]} internal link${page[1] === 1 ? '' : 's'} to ${page[0]}`)
    }

    console.log('\n====================== END  REPORT ======================\n');
}

function sortPages(pages) {
    let pagesArr = Object.entries(pages);
    pagesArr.sort((pageA, pageB) => {
        if (pageA[1] === pageB[1]) {
            return pageA[0].localeCompare(pageB[0])
        }
        return pageB[1] - pageA[1];
    });
    return pagesArr
}

export { printReport };
