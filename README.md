# Tiktok Api Full Data By TikWM - JavaScript Version (tiktok-hks)

* Download video no watermark
* Get trending video
* Get info video
* Get info user
* Get info music
* Get info hashtag
* Search hashtag,video,music,..
* And more...

**Details about API in src/Tiktok.js, you can get endpoint and customize it. Do not update this package only if the api is changed**

## Installation

Install the package with npm:

```bash
npm install tiktok-hks
```

Or with yarn:

```bash
yarn add tiktok-hks
```

## Dependencies

This package requires:
- `axios` for HTTP requests
- `lodash` for utility functions

## Usage

### Using the main class directly:

```javascript
const { Tiktok } = require('tiktok-hks');
// or
const Tiktok = require('tiktok-hks').default;

// Create instance with default axios
const tiktok = new Tiktok();

// Get user info
async function getUserInfo() {
    try {
        const userInfo = await tiktok.getUserInfo('GET', 'huykaiser.it');
        console.log(userInfo);
    } catch (error) {
        console.error(error);
    }
}

getUserInfo();
```

### Using the Service Provider:

```javascript
const { TiktokApiServiceProvider } = require('tiktok-hks');

// Create service provider instance
const serviceProvider = new TiktokApiServiceProvider();
const tiktokApi = serviceProvider.register();

// Use the API
async function example() {
    const userInfo = await tiktokApi.getUserInfo('GET', 'huykaiser.it');
    console.log(userInfo);
}

example();
```

### Using the Facade (Static methods):

```javascript
const { TiktokApiFacade } = require('tiktok-hks');

// Use static methods
async function example() {
    const userInfo = await TiktokApiFacade.getUserInfo('GET', 'huykaiser.it');
    console.log(userInfo);
}

example();
```

## API Methods

All methods are async and return Promises:

### Video Methods
- `getTrendingVideo(method, region, count)` - Get trending videos
- `getVideoByHashTag(method, challenge_id, count, cursor)` - Get videos by hashtag
- `getVideoByKeyword(method, keyword, count, cursor)` - Search videos by keyword
- `getVideosByUser(method, unique_id, count, cursor)` - Get user's videos
- `getVideosByMusicId(method, music_id, count, cursor)` - Get videos by music ID
- `getVideoNoWaterMark(method, tiktok_url, hd)` - Download video without watermark

### User Methods
- `getSimilarUsers(method, unique_id, count)` - Get similar users
- `getUserInfo(method, unique_id)` - Get Info users
- `getUserLiked(method, unique_id, count, cursor)` - Get user's liked videos
- `getUserFollowing(method, user_id, count, time, cursor)` - Get user's following list
- `getUserFollowers(method, user_id, count, time, cursor)` - Get user's followers list

### HashTag Methods
- `getHashTagDetail(method, challenge_name)` - Get hashtag details
- `getHashTagBYKeyword(method, keyword, count, cursor)` - Search hashtags

### Other Methods
- `getCommentsVideo(method, video_url, count, cursor)` - Get video comments
- `getRegions(method)` - Get available regions
- `getMusicDetail(method, music_url)` - Get music details

## Example Response

```javascript
// getUserInfo response example:
{
  user: {
    id: '6818563029089682434',
    uniqueId: 'huykaiser.it',
    nickname: 'HuyKaiser',
    avatarThumb: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/407836f4f406fc4a5324fc79231fa7e1~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=f7078260&x-expires=1754647200&x-signature=uGErzLG4XUsifpehyWdkOqn2bcM%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=2472a6c6&idc=maliva',
    avatarMedium: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/407836f4f406fc4a5324fc79231fa7e1~tplv-tiktokx-cropcenter:720:720.jpeg?dr=14579&refresh_token=cee7318b&x-expires=1754647200&x-signature=KT3RL0p5Eb8Aiix1NXhTpyVQtac%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=2472a6c6&idc=maliva',
    avatarLarger: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/407836f4f406fc4a5324fc79231fa7e1~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=8d1c9c1b&x-expires=1754647200&x-signature=B4nZCFgJi0scfyLdickUuGmgWVY%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=2472a6c6&idc=maliva',
    signature: 'HuyKaiser',
    verified: false,
    secUid: 'MS4wLjABAAAA0g1V9SC5clkjxEpwiQ9hzo-zRdSzub5vYq4aHhfIVOIqHjxfM7IrRw_-Qz5a6AqM',
    secret: false,
    ftc: false,
    relation: 0,
    openFavorite: true,
    commentSetting: null,
    duetSetting: null,
    stitchSetting: null,
    privateAccount: false,
    isADVirtual: false,
    isUnderAge18: false,
    ins_id: '',
    twitter_id: '',
    youtube_channel_title: '',
    youtube_channel_id: '',
    bio_email: 'nguyenhuy34789@gmail.com'
  },
  stats: {
    followingCount: 9353,
    followerCount: 1183,
    heartCount: 159,
    videoCount: 6,
    diggCount: 33223,
    heart: 159
  }
}
```

## Rate Limits

Please be aware of the API rate limits:

* Most endpoints: 1 request per 10 seconds
* Some endpoints: 1 request per 1 second  
* User following/followers: max 50 count per request

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Nguyễn Văn Huy (HuyKaiser)**
- Email: nguyenhuy34789@gmail.com
- GitHub: [@hksvn](https://github.com/hksvn)

## Support

If you find this package helpful, please consider giving it a ⭐ on GitHub!
