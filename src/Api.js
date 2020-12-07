/**
 * @file The file "Api.js" is used for implementing CRUD operations
 */

/**
 * "axios" - JavaScript library. It is an HTTP client.
 */
import axios from "axios";

/**
 * Class "RandomuserApi" - contains methods for getting data from the server.
 */
class RandomuserApi {
  constructor() {
    this.baseUrl = 'https://randomuser.me/api/'
  }
  /**
   * Sending a request to the server to get information about the user
   * 
   * @async
   * @property {Function} showRandomuser - retrieves data from the server.
   * @returns {Array} - all user data.
   */
  async showRandomuser() {
    // console.log("APIjs -- Function SHOW Randomuser run.");

    try {
      const { data } = await axios.get(this.baseUrl);
      // console.log("APIjs -- Randomuser = ", data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getRandomuser() {
    return Promise.resolve(this.randomuser);
  }
}

export const Randomuser = new RandomuserApi();