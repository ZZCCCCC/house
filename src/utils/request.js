import axios from "axios";
const request = axios.create({
    // 指定请求的根路径
    baseURL: 'http://localhost:81'
})
export default request