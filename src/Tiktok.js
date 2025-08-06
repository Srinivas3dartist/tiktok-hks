const axios = require('axios');
const _ = require('lodash');
const { buildExternalUrl } = require('./helpers');

class Tiktok {
    host = "https://www.tikwm.com";
    path_api_get_similar_users = "api/user/discover";
    path_api_get_video_by_hashtag = "api/challenge/posts";
    path_api_get_hashtag_detail = "api/challenge/info";
    path_api_search_hashtag_by_keyword = "api/challenge/search";
    path_api_search_videos_by_keyword = "api/feed/search";
    path_api_get_user_liked = "api/user/favorite";
    path_api_get_video_comment = "api/comment/list";
    path_api_get_regions = "api/region";
    path_api_get_trending_video = "api/feed/list";
    path_api_get_music_detail = "api/music/info";
    path_api_get_music_feed_video = "api/music/posts";
    path_api_get_user_following = "api/user/following";
    path_api_get_user_followers = "api/user/followers";
    path_api_get_user_feed_videos = "api/user/posts";
    path_api_get_video_no_watermark = "api";

    /**
     * Construct class TikWMApi
     * @param {object} client - HTTP client (default: axios)
     */
    constructor(client = axios) {
        this.client = client;
    }

    /**
     * Get Similar Users, limit 1 req/10 sec, unique_id or user_id, count max 50
     *
     * @param {string} method - HTTP method
     * @param {string} unique_id - User unique ID
     * @param {number} count - Number of results (default: 10)
     * @return {Promise<Array>}
     */
    async getSimilarUsers(method, unique_id, count = 10) {
        try {
            const query = { unique_id, count };
            const endpoint = buildExternalUrl(this.host, this.path_api_get_similar_users, query);
            const response = await this.client({ method, url: endpoint });
            const contents = response.data;
            if (contents.msg === "success") {
                return contents.data.map(user => {
                    const _user_info = _.pick(user.user || {}, ['id', 'uniqueId', 'nickname', 'signature', 'verified']);
                    const _user_stats = user.stats || {};
                    return { ..._user_info, ..._user_stats };
                });
            }
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    /**
     * Get Video List By Challenge(HashTag), limit 1 req/10 sec
     * @param {string} method - HTTP method
     * @param {number} challenge_id - Challenge ID
     * @param {number} count - Number of results (default: 10)
     * @param {number} cursor - Cursor for pagination (default: 0)
     * @return {Promise<Array>}
     */
    async getVideoByHashTag(method, challenge_id, count = 10, cursor = 0) {
        try {
            const query = { challenge_id, count, cursor };
            const endpoint = buildExternalUrl(this.host, this.path_api_get_video_by_hashtag, query);
            const response = await this.client({ method, url: endpoint });
            const contents = response.data;
            if (contents.msg === "success") {
                return contents.data.videos.map(video => _.pick(video || {}, ['video_id', 'region', 'duration', 'title', 'play_count', 'digg_count', 'comment_count', 'share_count', 'download_count', 'create_time', 'music_info', 'author']));
            }
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    /**
     * Get hashtag detail by name, limit 1 req/1 sec
     * @param {string} method - HTTP method
     * @param {string} challenge_name - Challenge name
     * @return {Promise<Object>}
     */
    async getHashTagDetail(method, challenge_name) {
        try {
            const query = { challenge_name };
            const endpoint = buildExternalUrl(this.host, this.path_api_get_hashtag_detail, query);
            const response = await this.client({ method, url: endpoint });
            const contents = response.data;
            if (contents.msg === "success") {
                return _.pick(contents.data, ['id', 'cha_name', 'user_count', 'view_count']);
            }
        } catch (e) {
            console.error(e);
        }
        return {};
    }

    /**
     * Search Challenge(HashTag) By Keywords, limit 1 req/10 sec
     * @param {string} method - HTTP method
     * @param {string} keyword - Search keyword
     * @param {number} count - Number of results (default: 10)
     * @param {number} cursor - Cursor for pagination (default: 0)
     * @return {Promise<Array>}
     */
    async getHashTagBYKeyword(method, keyword, count = 10, cursor = 0) {
        try {
            const query = { keywords: keyword, count, cursor };
            const endpoint = buildExternalUrl(this.host, this.path_api_search_hashtag_by_keyword, query);
            const response = await this.client({ method, url: endpoint });
            const contents = response.data;
            if (contents.msg === "success") {
                return contents.data.challenge_list.map(challenge => _.pick(challenge || {}, ['id', 'cha_name', 'user_count', 'view_count']));
            }
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    /**
     * Search Videos By Keywords, limit 1 req/10 sec
     * @param {string} method - HTTP method
     * @param {string} keyword - Search keyword
     * @param {number} count - Number of results (default: 10)
     * @param {number} cursor - Cursor for pagination (default: 0)
     * @return {Promise<Array>}
     */
    async getVideoByKeyword(method, keyword, count = 10, cursor = 0) {
        try {
            const query = { keywords: keyword, count, cursor };
            const endpoint = buildExternalUrl(this.host, this.path_api_search_videos_by_keyword, query);
            const response = await this.client({ method, url: endpoint });
            const contents = response.data;
            if (contents.msg === "success") {
                return contents.data.videos.map(video => _.pick(video || {}, ['video_id', 'region', 'duration', 'title', 'play_count', 'digg_count', 'comment_count', 'share_count', 'download_count', 'create_time', 'music_info', 'author']));
            }
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    /**
     * Get User Liked, limit 1 req/10 sec
     *
     * @param {string} method - HTTP method
     * @param {string} unique_id - User unique ID
     * @param {number} count - Number of results (default: 10)
     * @param {number} cursor - Cursor for pagination (default: 0)
     * @return {Promise<Array>}
     */
    async getUserLiked(method, unique_id, count = 10, cursor = 0) {
        try {
            const query = { unique_id, count, cursor };
            const endpoint = buildExternalUrl(this.host, this.path_api_get_user_liked, query);
            const response = await this.client({ method, url: endpoint });
            const contents = response.data;
            if (contents.msg === "success") {
                return contents.data.videos.map(video => _.pick(video || {}, ['video_id', 'region', 'duration', 'title', 'play_count', 'digg_count', 'comment_count', 'share_count', 'download_count', 'create_time', 'music_info', 'author']));
            }
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    /**
     * Get comments of video
     *
     * @param {string} method - HTTP method
     * @param {string} video_url - Video URL
     * @param {number} count - Number of results (default: 10)
     * @param {number} cursor - Cursor for pagination (default: 0)
     * @return {Promise<Array>}
     */
    async getCommentsVideo(method, video_url, count = 10, cursor = 0) {
        try {
            const query = { url: video_url, count, cursor };
            const endpoint = buildExternalUrl(this.host, this.path_api_get_video_comment, query);
            const response = await this.client({ method, url: endpoint });
            const contents = response.data;
            if (contents.msg === "success") {
                return contents.data.comments;
            }
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    /**
     * Get region list
     * @param {string} method - HTTP method
     * @return {Promise<Array>}
     */
    async getRegions(method) {
        try {
            const endpoint = buildExternalUrl(this.host, this.path_api_get_regions);
            const response = await this.client({ method, url: endpoint });
            const contents = response.data;
            if (contents.msg === "success") {
                return contents.data;
            }
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    /**
     * Get trending feed, limit 1 req/10 sec
     * @param {string} method - HTTP method
     * @param {string} region - Region code
     * @param {number} count - Number of results (default: 10)
     * @return {Promise<Array>}
     */
    async getTrendingVideo(method, region, count = 10) {
        try {
            const query = { region, count };
            const endpoint = buildExternalUrl(this.host, this.path_api_get_trending_video, query);
            const response = await this.client({ method, url: endpoint });
            const contents = response.data;
            if (contents.msg === "success") {
                return contents.data.map(video => _.pick(video || {}, ['video_id', 'wmplay', 'region', 'duration', 'title', 'play_count', 'digg_count', 'comment_count', 'share_count', 'download_count', 'create_time', 'music_info', 'author']));
            }
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    /**
     * Get music detail, limit 1 req/1 sec
     * @param {string} method - HTTP method
     * @param {string} music_url - Music URL
     * @return {Promise<Object>}
     */
    async getMusicDetail(method, music_url) {
        try {
            const query = { url: music_url };
            const endpoint = buildExternalUrl(this.host, this.path_api_get_music_detail, query);
            const response = await this.client({ method, url: endpoint });
            const contents = response.data;
            if (contents.msg === "success") {
                return _.pick(contents.data, ['id', 'title', 'duration', 'video_count']);
            }
        } catch (e) {
            console.error(e);
        }
        return {};
    }

    /**
     * Get music feed videos, limit 1 req/10 sec
     * @param {string} method - HTTP method
     * @param {number} music_id - Music ID
     * @param {number} count - Number of results (default: 10)
     * @param {number} cursor - Cursor for pagination (default: 0)
     * @return {Promise<Array>}
     */
    async getVideosByMusicId(method, music_id, count = 10, cursor = 0) {
        try {
            const query = { music_id, count, cursor };
            const endpoint = buildExternalUrl(this.host, this.path_api_get_music_feed_video, query);
            const response = await this.client({ method, url: endpoint });
            const contents = response.data;
            if (contents.msg === "success") {
                return contents.data.videos.map(video => _.pick(video || {}, ['video_id', 'region', 'duration', 'title', 'play_count', 'digg_count', 'comment_count', 'share_count', 'download_count', 'create_time', 'music_info', 'author']));
            }
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    /**
     * Get user following, limit 1 req/10 sec, unique_id, count max 50
     *
     * @param {string} method - HTTP method
     * @param {number} user_id - User ID
     * @param {number} count - Number of results (default: 50)
     * @param {number} time - Time parameter (default: 0)
     * @param {number} cursor - Cursor for pagination (default: 0)
     * @return {Promise<Array>}
     */
    async getUserFollowing(method, user_id, count = 50, time = 0, cursor = 0) {
        try {
            const query = { user_id, count, cursor, time };
            const endpoint = buildExternalUrl(this.host, this.path_api_get_user_following, query);
            const response = await this.client({ method, url: endpoint });
            const contents = response.data;
            if (contents.msg === "success") {
                return contents.data.followings.map(user => _.pick(user || {}, ['id', 'unique_id', 'nickname', 'signature', 'verified']));
            }
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    /**
     * Get user follower, limit 1 req/10 sec, unique_id, count max 50
     *
     * @param {string} method - HTTP method
     * @param {number} user_id - User ID
     * @param {number} count - Number of results (default: 50)
     * @param {number} time - Time parameter (default: 0)
     * @param {number} cursor - Cursor for pagination (default: 0)
     * @return {Promise<Array>}
     */
    async getUserFollowers(method, user_id, count = 50, time = 0, cursor = 0) {
        try {
            const query = { user_id, count, cursor, time };
            const endpoint = buildExternalUrl(this.host, this.path_api_get_user_followers, query);
            const response = await this.client({ method, url: endpoint });
            const contents = response.data;
            if (contents.msg === "success") {
                return contents.data.followers.map(user => _.pick(user || {}, ['id', 'unique_id', 'nickname', 'signature', 'verified']));
            }
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    /**
     * Get user feed videos, limit 1 req/10 sec
     * @param {string} method - HTTP method
     * @param {string} unique_id - User unique ID
     * @param {number} count - Number of results (default: 10)
     * @param {number} cursor - Cursor for pagination (default: 0)
     * @return {Promise<Array>}
     */
    async getVideosByUser(method, unique_id, count = 10, cursor = 0) {
        try {
            const query = { unique_id, count, cursor };
            const endpoint = buildExternalUrl(this.host, this.path_api_get_user_feed_videos, query);
            const response = await this.client({ method, url: endpoint });
            const contents = response.data;
            if (contents.msg === "success") {
                return contents.data.videos.map(video => _.pick(video || {}, ['video_id', 'region', 'duration', 'title', 'play_count', 'digg_count', 'comment_count', 'share_count', 'download_count', 'create_time', 'music_info', 'author']));
            }
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    /**
     * Get video without watermark
     * @param {string} method - HTTP method
     * @param {string} tiktok_url - TikTok video URL
     * @param {number} hd - HD quality flag (1: HD, 0: normal) (default: 1)
     * @return {Promise<Object>}
     */
    async getVideoNoWaterMark(method, tiktok_url, hd = 1) {
        try {
            if (hd !== 0 && hd !== 1) hd = 1;
            const query = { url: tiktok_url, hd };
            const endpoint = buildExternalUrl(this.host, this.path_api_get_video_no_watermark, query);
            const response = await this.client({ method, url: endpoint });
            const contents = response.data;
            if (contents.msg === "success") {
                return contents.data;
            }
        } catch (e) {
            console.error(e);
        }
        return {};
    }
}

module.exports = Tiktok;
