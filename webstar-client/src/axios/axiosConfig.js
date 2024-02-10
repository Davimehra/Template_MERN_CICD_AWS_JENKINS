import axios from "axios";
import requestURL from "../config/requestURL";

export const axiosConfig = new axios.create({
    baseURL: process.env.REACT_APP_NODE_ENV === "dev" ? requestURL.devURL + '/api' : requestURL.prodURL + '/api',
    withCredentials: true
})


export { requestURL };


