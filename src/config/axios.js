import axios from "axios";
const defaultOptions = {
  baseURL: "https://api.spacexdata.com/",
};
const instance = axios.create(defaultOptions);
export { instance as default };
