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

export const latestLaunchesInfo = (page, pageSize) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post("v5/launches/query", {
        query: {
          upcoming: false,
        },
        options: {
          page,
          limit: pageSize,
          sort: {
            date_utc: "desc",
          },
        },
      });
      resolve(data);
    } catch (error) {
      console.error("ERROR: 💥 ", error);
      reject(error);
    }
  });
};

export const launchDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post("v5/launches/query", {
        query: {
          _id: id,
        },
        options: {
          populate: [
            {
              path: "launchpad",
              select: {
                full_name: 1,
                latitude: 1,
                longitude: 1,
                details: 1,
                wikipedia: 1,
              },
            },
            {
              path: "ships",
              select: {
                name: 1,
                latitude: 1,
                longitude: 1,
                active: 1,
                image: 1,
                launches: 1,
                type: 1,
              },
            },
            {
              path: "rocket",
              select: {
                name: 1,
              },
            },
          ],
        },
      });
      resolve(data.docs[0]);
    } catch (error) {
      console.error("ERROR: 💥 ", error);
      reject(error);
    }
  });
};
