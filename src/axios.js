import axios from "axios";
const makeRequest = axios.create({
    baseURL:"http://localhost:4000/api/",
    withCredentials:true,
});
export default makeRequest;