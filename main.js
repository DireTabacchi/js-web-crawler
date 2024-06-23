import { argv } from 'node:process';
import { crawlPage } from './crawl.js';

async function main() {
    if (argv.length < 3) {
        console.log("Error: no website given.");
        return 1;
    } else if (argv.length > 3) {
        console.log("Error: Too many argement provided.");
        return 2;
    }
    
    const baseURL = argv[2];
    console.log(`Starting crawler at: ${baseURL}`);

    const pages = await crawlPage(baseURL);
    console.log(pages);
}

main()

