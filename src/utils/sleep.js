/**
 *
 * @param ms
 * @description Sleeps for the given amount of milliseconds
 * @returns {Promise<unknown>}
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default sleep;