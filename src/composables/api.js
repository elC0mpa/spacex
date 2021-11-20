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

export const rocketsInfo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get("v4/rockets");
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const rocketDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`v4/rockets/${id}`);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
