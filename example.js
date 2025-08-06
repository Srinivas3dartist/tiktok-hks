// Example using the published package
// const { TiktokApiFacade, Tiktok } = require('tiktok-hks');

// For local development
const TiktokApiFacade = require('./src/Facades/TiktokApiFacade');
const Tiktok = require('./src/Tiktok');

async function exampleUsage() {
    console.log('=== TikTok HKS API Testing All Methods ===\n');

    const testAPI = async (name, apiCall) => {
        try {
            console.log(`${name}:`);
            const result = await apiCall();
            
            if (Array.isArray(result)) {
                console.log(`Found ${result.length} items`);
                if (result.length > 0) {
                    console.log('Sample data:', result.slice(0, 2));
                }
            } else {
                console.log('Result:', result);
            }
            console.log('✅ Success\n');
        } catch (error) {
            console.log(`❌ Error: ${error.message}\n`);
        }
    };

    try {
        // 1. Get regions
        await testAPI('1. Getting regions', () => 
            TiktokApiFacade.getRegions('GET')
        );

        // 2. Get trending videos 
        await testAPI('2. Getting trending videos', () => 
            TiktokApiFacade.getTrendingVideo('GET', 'VN', 2)
        );

        // 3. Search hashtags by keyword
        await testAPI('3. Searching hashtags by keyword', () => 
            TiktokApiFacade.getHashTagBYKeyword('GET', 'funny', 3)
        );

        // 4. Get hashtag detail
        await testAPI('4. Getting hashtag detail', () => 
            TiktokApiFacade.getHashTagDetail('GET', 'funny')
        );

        // 5. Get videos by hashtag
        await testAPI('5. Getting videos by hashtag', () => 
            TiktokApiFacade.getVideoByHashTag('GET', 'funny', 2)
        );

        // 6. Search videos by keyword
        await testAPI('6. Searching videos by keyword', () => 
            TiktokApiFacade.getVideoByKeyword('GET', 'dance', 2)
        );

        // 7. Get user info
        await testAPI('7. Getting user info', () => 
            TiktokApiFacade.getUserInfo('GET', 'huykaiser.it')
        );

        // 8. Get videos by user
        await testAPI('8. Getting videos by user', () => 
            TiktokApiFacade.getVideosByUser('GET', 'huykaiser.it', 2)
        );

        // 9. Get similar users
        await testAPI('9. Getting similar users', () => 
            TiktokApiFacade.getSimilarUsers('GET', 'huykaiser.it', 3)
        );

        // 10. Get user liked videos
        await testAPI('9. Getting user liked videos', () => 
            TiktokApiFacade.getUserLiked('GET', 'huykaiser.it', 2)
        );

        // 10. Get user following
        await testAPI('10. Getting user following', () => 
            TiktokApiFacade.getUserFollowing('GET', 'huykaiser.it', 5)
        );

        // 11. Get user followers
        await testAPI('11. Getting user followers', () => 
            TiktokApiFacade.getUserFollowers('GET', 'huykaiser.it', 5)
        );

        // 12. Get music detail
        await testAPI('12. Getting music detail', () => 
            TiktokApiFacade.getMusicDetail('GET', 'https://www.tiktok.com/music/original-sound-7396189922417265941')
        );

        // 13. Get videos by music ID
        await testAPI('13. Getting videos by music ID', () => 
            TiktokApiFacade.getVideosByMusicId('GET', '7396189922417265941', 2)
        );

        // 14. Get video comments
        await testAPI('15. Getting video comments', () => 
            TiktokApiFacade.getCommentsVideo('GET', 'https://www.tiktok.com/@huykaiser.it/video/7396189922417265941', 3)
        );

        // 15. Get video without watermark
        await testAPI('16. Getting video without watermark', () => 
            TiktokApiFacade.getVideoNoWaterMark('GET', 'https://www.tiktok.com/@huykaiser.it/video/7396189922417265941', 1)
        );

        // 16. Using direct Tiktok class instance
        await testAPI('17. Testing direct Tiktok class instance', () => {
            const tiktok = new Tiktok();
            return tiktok.getRegions('GET');
        });

    } catch (error) {
        console.error('❌ Overall Error:', error.message);
    }

    console.log('=== Testing Complete ===');
}

// Run examples if this file is executed directly
if (require.main === module) {
    exampleUsage();
}
