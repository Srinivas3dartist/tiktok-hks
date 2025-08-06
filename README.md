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

// Get trending videos
async function getTrendingVideos() {
    try {
        const trending = await tiktok.getTrendingVideo('GET', 'VN', 1);
        console.log(trending);
    } catch (error) {
        console.error(error);
    }
}

getTrendingVideos();
```

### Using the Service Provider:

```javascript
const { TiktokApiServiceProvider } = require('tiktok-hks');

// Create service provider instance
const serviceProvider = new TiktokApiServiceProvider();
const tiktokApi = serviceProvider.register();

// Use the API
async function example() {
    const trending = await tiktokApi.getTrendingVideo('GET', 'VN', 1);
    console.log(trending);
}

example();
```

### Using the Facade (Static methods):

```javascript
const { TiktokApiFacade } = require('tiktok-hks');

// Use static methods
async function example() {
    const trending = await TiktokApiFacade.getTrendingVideo('GET', 'VN', 1);
    console.log(trending);
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
// getTrendingVideo response example:
[
  {
  id: '7396189922417265941',
  region: 'VN',
  title: '✈️✈️✈️ #CapCut #huyit #huykaiser #xuhuongtiktok #xuhuong #xuhuong2024 #xyzbca #xh ',
  cover: 'https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/oQoLiAAiwEJ8yIAwrNCUYWIksdiiBfHAq5SzIk~tplv-tiktokx-cropcenter:300:400.jpeg?dr=14579&refresh_token=599af4b0&x-expires=1754557200&x-signature=d3t6Gv%2BN1Y4JGy5t6QJ7spB5uyU%3D&t=4d5b0474&ps=13740610&shp=d05b14bd&shcp=34ff8df6&idc=maliva&s=AWEME_DETAIL',
  ai_dynamic_cover: 'https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/3a0ef7fac9a84176a618cd1d1dc93f92_1722059671~tplv-tiktokx-origin.image?dr=14575&refresh_token=81a76fe2&x-expires=1754557200&x-signature=bq5EymgAKRZ8uis5JbaGWjfAauI%3D&t=4d5b0474&ps=13740610&shp=d05b14bd&shcp=34ff8df6&idc=maliva&s=AWEME_DETAIL',
  origin_cover: 'https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/29c4b718e60a4629b49948fd645dfcfb_1722059671~tplv-tiktokx-360p.webp?dr=14555&refresh_token=07b4fc5e&x-expires=1754557200&x-signature=cZ38W9qeUMdEN25c%2F3w9MRpG7fw%3D&t=4d5b0474&ps=13740610&shp=d05b14bd&shcp=34ff8df6&idc=maliva&s=AWEME_DETAIL&ftpl=1',
  duration: 18,
  play: 'https://v16m-default.tiktokcdn.com/413a1bcf207dc5f9e933cd61a9826b6c/68937391/video/tos/alisg/tos-alisg-pve-0037c001/okA4AC5zqiiQCIJEWdkfAiiUOBFnrkI8YKwoIw/?a=0&bti=OUBzOTg7QGo6OjZAL3AjLTAzYCMxNDNg&ch=0&cr=0&dr=0&er=0&lr=all&net=0&cd=0%7C0%7C0%7C0&cv=1&br=2490&bt=1245&cs=0&ds=6&ft=EeF4ntZWD03Q12NvPIPGWIxRSfYFpq_45SY&mime_type=video_mp4&qs=0&rc=ZmdmMzQ0Ojo4NTRpNWY7OEBpanI2bHY5cms7dDMzODczNEAuLy1eMWNeXjIxNmIxXjAwYSNiLTJpMmRjamZgLS1kMTFzcw%3D%3D&vvpl=1&l=2025080617234395A4D753AA902B01641B&btag=e000b8000',
  wmplay: 'https://v16m-default.tiktokcdn.com/413a1bcf207dc5f9e933cd61a9826b6c/68937391/video/tos/alisg/tos-alisg-pve-0037c001/okA4AC5zqiiQCIJEWdkfAiiUOBFnrkI8YKwoIw/?a=0&bti=OUBzOTg7QGo6OjZAL3AjLTAzYCMxNDNg&ch=0&cr=0&dr=0&er=0&lr=all&net=0&cd=0%7C0%7C0%7C0&cv=1&br=2490&bt=1245&cs=0&ds=6&ft=EeF4ntZWD03Q12NvPIPGWIxRSfYFpq_45SY&mime_type=video_mp4&qs=0&rc=ZmdmMzQ0Ojo4NTRpNWY7OEBpanI2bHY5cms7dDMzODczNEAuLy1eMWNeXjIxNmIxXjAwYSNiLTJpMmRjamZgLS1kMTFzcw%3D%3D&vvpl=1&l=2025080617234395A4D753AA902B01641B&btag=e000b8000',
  hdplay: 'https://v16m-default.tiktokcdn.com/f73af218c836a10daca0fd3a7ff063df/68937391/video/tos/alisg/tos-alisg-pve-0037c001/oc4IAofBqI8hIwzCriUdmUYkkA9ANiWZiQBiEw/?a=0&bti=OUBzOTg7QGo6OjZAL3AjLTAzYCMxNDNg&ch=0&cr=13&dr=0&er=0&lr=all&net=0&cd=0%7C0%7C0%7C&cv=1&br=1210&bt=605&cs=2&ds=3&ft=EeF4ntZWD03Q12NvPIPGWIxRSfYFpq_45SY&mime_type=video_mp4&qs=14&rc=OWY5PDhlZDk4O2Q1Omk4OEBpanI2bHY5cms7dDMzODczNEAzLzBjXzZiXmMxLTYvY2AtYSNiLTJpMmRjamZgLS1kMTFzcw%3D%3D&vvpl=1&l=202508061723431F6B4FE09041D300C83E&btag=e000b8000',
  size: 3017817,
  wm_size: 0,
  hd_size: 1467805,
  music: 'https://v16-ies-music.tiktokcdn.com/c66714a73d6857b55e8c8b8134cb45cd/689c59c3/video/tos/alisg/tos-alisg-v-27dcd7/oAEoMQ6f9JhIeVUJV1kmNEFSPx7DL2gBC6lkTB/?a=583965&bti=OUBzOTg7QGo6OjZAL3AjLTAzYCMxNDNg&ch=0&cr=0&dr=0&er=0&lr=default&cd=0%7C0%7C0%7C0&br=250&bt=125&ft=EKFInkZWD03Q12NvPIPGWIxRSfYFpq_45SY&mime_type=audio_mpeg&qs=6&rc=NjlpOzRoaDY8PDo7OWk5NkBpajR1PGw5cjh3dDMzODU8NEBhMTQvX2MtNWIxYy9iMi8xYSM0aWNnMmRjNjZgLS1kMS1zcw%3D%3D&vvpl=1&l=2025080617234395A4D753AA902B01641B&btag=e000b8000&shp=d05b14bd&shcp=-',
  music_info: {
    id: '7391485171746982672',
    title: 'original sound - conngubian',
    play: 'https://v16-ies-music.tiktokcdn.com/c66714a73d6857b55e8c8b8134cb45cd/689c59c3/video/tos/alisg/tos-alisg-v-27dcd7/oAEoMQ6f9JhIeVUJV1kmNEFSPx7DL2gBC6lkTB/?a=583965&bti=OUBzOTg7QGo6OjZAL3AjLTAzYCMxNDNg&ch=0&cr=0&dr=0&er=0&lr=default&cd=0%7C0%7C0%7C0&br=250&bt=125&ft=EKFInkZWD03Q12NvPIPGWIxRSfYFpq_45SY&mime_type=audio_mpeg&qs=6&rc=NjlpOzRoaDY8PDo7OWk5NkBpajR1PGw5cjh3dDMzODU8NEBhMTQvX2MtNWIxYy9iMi8xYSM0aWNnMmRjNjZgLS1kMS1zcw%3D%3D&vvpl=1&l=2025080617234395A4D753AA902B01641B&btag=e000b8000&shp=d05b14bd&shcp=-',
    cover: 'https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/917d4e40fb207b61685136735d62c46e~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=c245f60d&x-expires=1754557200&x-signature=sBCMqTlH61xyhCvZfENgkjbEVjo%3D&t=4d5b0474&ps=13740610&shp=d05b14bd&shcp=34ff8df6&idc=maliva',
    author: 'Con ngừ 🪷',
    original: true,
    duration: 18,
    album: ''
  },
  play_count: 221815,
  digg_count: 5,
  comment_count: 0,
  share_count: 0,
  download_count: 0,
  collect_count: 1,
  create_time: 1722059668,
  anchors: null,
  anchors_extras: '',
  is_ad: false,
  commerce_info: {
    adv_promotable: false,
    auction_ad_invited: false,
    branded_content_type: 0,
    organic_log_extra: '{"req_id":"2025080617234395A4D753AA902B01641B"}',
    with_comment_filter_words: false
  },
  commercial_video_info: '',
  item_comment_settings: 0,
  mentioned_users: '',
  },
  play_count: 221815,
  digg_count: 5,
  comment_count: 0,
  share_count: 0,
  download_count: 0,
  collect_count: 1,
  create_time: 1722059668,
  anchors: null,
  anchors_extras: '',
  is_ad: false,
  commerce_info: {
    adv_promotable: false,
    auction_ad_invited: false,
    branded_content_type: 0,
    organic_log_extra: '{"req_id":"2025080617234395A4D753AA902B01641B"}',
    with_comment_filter_words: false
  },
  },
  play_count: 221815,
  digg_count: 5,
  comment_count: 0,
  share_count: 0,
  download_count: 0,
  collect_count: 1,
  create_time: 1722059668,
  anchors: null,
  anchors_extras: '',
  is_ad: false,
  commerce_info: {
    adv_promotable: false,
    auction_ad_invited: false,
    branded_content_type: 0,
  },
  play_count: 221815,
  digg_count: 5,
  comment_count: 0,
  share_count: 0,
  download_count: 0,
  collect_count: 1,
  create_time: 1722059668,
  anchors: null,
  anchors_extras: '',
  is_ad: false,
  commerce_info: {
  },
  play_count: 221815,
  digg_count: 5,
  comment_count: 0,
  share_count: 0,
  download_count: 0,
  collect_count: 1,
  create_time: 1722059668,
  anchors: null,
  },
  play_count: 221815,
  digg_count: 5,
  comment_count: 0,
  share_count: 0,
  download_count: 0,
  collect_count: 1,
  },
  play_count: 221815,
  digg_count: 5,
  comment_count: 0,
  share_count: 0,
  },
  play_count: 221815,
  digg_count: 5,
  comment_count: 0,
  share_count: 0,
  download_count: 0,
  digg_count: 5,
  comment_count: 0,
  share_count: 0,
  share_count: 0,
  download_count: 0,
  download_count: 0,
  collect_count: 1,
  create_time: 1722059668,
  anchors: null,
  anchors_extras: '',
  is_ad: false,
  commerce_info: {
    adv_promotable: false,
    auction_ad_invited: false,
    branded_content_type: 0,
    organic_log_extra: '{"req_id":"2025080617234395A4D753AA902B01641B"}',
    with_comment_filter_words: false
  },
  commercial_video_info: '',
  item_comment_settings: 0,
  mentioned_users: '',
  author: {
    id: '6818563029089682434',
    unique_id: 'huykaiser.it',
    nickname: 'HuyKaiser',
    avatar: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/407836f4f406fc4a5324fc79231fa7e1~tplv-tiktokx-cropcenter:300:300.jpeg?dr=14577&refresh_token=8e8aefc8&x-expires=1754557200&x-signature=wuzR3fZPdKujWsQBkZsLYm4lFbU%3D&t=4d5b0474&ps=13740610&shp=d05b14bd&shcp=34ff8df6&idc=maliva'
  }
}
]
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
