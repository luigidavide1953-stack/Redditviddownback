import axios from 'axios';
import { REDDIT_USER_AGENT } from '../utils/constants';
import logger from '../utils/logger';

class RedditService {
  public async fetchPostData(url: string): Promise<any> {
    try {
      // Convert Reddit URL to JSON URL and ensure it doesn't have trailing slashes before adding .json
      const cleanUrl = url.split('?')[0].replace(/\/$/, '');
      const jsonUrl = cleanUrl.endsWith('.json') ? cleanUrl : `${cleanUrl}.json`;
      
      logger.info(`Fetching Reddit data from: ${jsonUrl}`);
      
      const response = await axios.get(jsonUrl, {
        headers: {
          'User-Agent': REDDIT_USER_AGENT,
          'Accept': 'application/json',
        },
        timeout: 10000,
      });

      if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
        logger.error(`Invalid Reddit response structure for URL: ${jsonUrl}`);
        throw new Error('Invalid Reddit response structure');
      }

      const postData = response.data[0]?.data?.children[0]?.data;
      if (!postData) {
        throw new Error('Could not find post data in Reddit response');
      }

      return postData;
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      
      logger.error(`Error fetching Reddit post (${status}): ${message}`);
      
      if (status === 403) {
        throw new Error('Reddit access forbidden (403). Reddit might be blocking the server IP or requires authentication.');
      } else if (status === 404) {
        throw new Error('Reddit post not found (404). Please check the URL.');
      }
      
      throw new Error(`Failed to fetch Reddit post: ${message}`);
    }
  }
}

export default new RedditService();
