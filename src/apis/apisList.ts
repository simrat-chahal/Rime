import axios from "axios";
const localhostPort = "http://localhost:5000/"

const postAPI = (apiURL: string, data: object) => {
    axios.post(`${localhostPort}${apiURL}`, data);
}


export const addNewUserAPI = (data: object) => {
    postAPI("addUser",data)
}