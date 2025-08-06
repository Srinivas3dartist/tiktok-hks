// Example using the published package
// const { TiktokApiFacade, Tiktok } = require('tiktok-hks');

// For local development
const TiktokApiFacade = require('./src/Facades/TiktokApiFacade');
const Tiktok = require('./src/Tiktok');

async function exampleUsage() {
    console.log('=== TikTok HKS API Examples ===\n');

    try {
        // Example 1: Using Facade (Static methods)
        console.log('1. Getting trending videos using Facade:');
        const trending = await TiktokApiFacade.getTrendingVideo('GET', 'VN', 2);
        console.log(`Found ${trending.length} trending videos`);
        if (trending.length > 0) {
            console.log('First video:', {
                video_id: trending[0].video_id,
                title: trending[0].title,
                author: trending[0].author?.nickname
            });
        }
        console.log('');

        // Example 2: Using direct class instance
        console.log('2. Getting regions using direct class:');
        const tiktok = new Tiktok();
        const regions = await tiktok.getRegions('GET');
        console.log(`Found ${regions.length} regions`);
        if (regions.length > 0) {
            console.log('Sample regions:', regions.slice(0, 3));
        }
        console.log('');

        // Example 3: Search hashtags
        console.log('3. Searching hashtags:');
        const hashtags = await TiktokApiFacade.getHashTagBYKeyword('GET', 'funny', 3);
        console.log(`Found ${hashtags.length} hashtags`);
        if (hashtags.length > 0) {
            console.log('First hashtag:', hashtags[0]);
        }
        console.log('');

        // Example 4: Get video without watermark
        console.log('4. Getting video without watermark:');
        // Note: This would need a real TikTok URL
        const videoData = await TiktokApiFacade.getVideoNoWaterMark('GET', 'https://www.tiktok.com/@huykaiser.it/video/7396189922417265941', 1);
        console.log('(Skipped - requires real TikTok URL)');
        console.log(videoData);

    } catch (error) {
        console.error('Error in example:', error.message);
    }
}

// Run examples if this file is executed directly
if (require.main === module) {
    exampleUsage();
}
