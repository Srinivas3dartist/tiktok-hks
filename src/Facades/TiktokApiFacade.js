const TiktokApiServiceProvider = require('../TiktokApiServiceProvider');

class TiktokApiFacade {
    constructor() {
        this.serviceProvider = new TiktokApiServiceProvider();
        this.instance = null;
    }

    /**
     * Get the singleton instance of Tiktok API
     * @return {Tiktok}
     */
    getInstance() {
        if (!this.instance) {
            this.instance = this.serviceProvider.register();
        }
        return this.instance;
    }

    /**
     * Static method to get the facade instance
     * @return {Tiktok}
     */
    static getFacadeRoot() {
        return new TiktokApiFacade().getInstance();
    }

    /**
     * Get Similar Users
     */
    static async getSimilarUsers(method, unique_id, count = 10) {
        return await this.getFacadeRoot().getSimilarUsers(method, unique_id, count);
    }

    /**
     * Get Video By HashTag
     */
    static async getVideoByHashTag(method, challenge_id, count = 10, cursor = 0) {
        return await this.getFacadeRoot().getVideoByHashTag(method, challenge_id, count, cursor);
    }

    /**
     * Get HashTag Detail
     */
    static async getHashTagDetail(method, challenge_name) {
        return await this.getFacadeRoot().getHashTagDetail(method, challenge_name);
    }

    /**
     * Get HashTag By Keyword
     */
    static async getHashTagBYKeyword(method, keyword, count = 10, cursor = 0) {
        return await this.getFacadeRoot().getHashTagBYKeyword(method, keyword, count, cursor);
    }

    /**
     * Get Video By Keyword
     */
    static async getVideoByKeyword(method, keyword, count = 10, cursor = 0) {
        return await this.getFacadeRoot().getVideoByKeyword(method, keyword, count, cursor);
    }

    /**
     * Get User Liked
     */
    static async getUserLiked(method, unique_id, count = 10, cursor = 0) {
        return await this.getFacadeRoot().getUserLiked(method, unique_id, count, cursor);
    }

    /**
     * Get Comments Video
     */
    static async getCommentsVideo(method, video_url, count = 10, cursor = 0) {
        return await this.getFacadeRoot().getCommentsVideo(method, video_url, count, cursor);
    }

    /**
     * Get Regions
     */
    static async getRegions(method) {
        return await this.getFacadeRoot().getRegions(method);
    }

    /**
     * Get Trending Video
     */
    static async getTrendingVideo(method, region, count = 10) {
        return await this.getFacadeRoot().getTrendingVideo(method, region, count);
    }

    /**
     * Get Music Detail
     */
    static async getMusicDetail(method, music_url) {
        return await this.getFacadeRoot().getMusicDetail(method, music_url);
    }

    /**
     * Get Videos By Music ID
     */
    static async getVideosByMusicId(method, music_id, count = 10, cursor = 0) {
        return await this.getFacadeRoot().getVideosByMusicId(method, music_id, count, cursor);
    }

    /**
     * Get User Following
     */
    static async getUserFollowing(method, user_id, count = 50, time = 0, cursor = 0) {
        return await this.getFacadeRoot().getUserFollowing(method, user_id, count, time, cursor);
    }

    /**
     * Get User Followers
     */
    static async getUserFollowers(method, user_id, count = 50, time = 0, cursor = 0) {
        return await this.getFacadeRoot().getUserFollowers(method, user_id, count, time, cursor);
    }

    /**
     * Get Videos By User
     */
    static async getVideosByUser(method, unique_id, count = 10, cursor = 0) {
        return await this.getFacadeRoot().getVideosByUser(method, unique_id, count, cursor);
    }

    /**
     * Get Video No WaterMark
     */
    static async getVideoNoWaterMark(method, tiktok_url, hd = 1) {
        return await this.getFacadeRoot().getVideoNoWaterMark(method, tiktok_url, hd);
    }
}

module.exports = TiktokApiFacade;
