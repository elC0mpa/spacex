/* eslint-disable no-async-promise-executor */
import axios from "../config/axios";
export const nextLaunchInfo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get("v5/launches/next");
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
