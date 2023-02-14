import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.jsonbin.io/v3/b/63e9fd05c0e7653a05761887",
});


export default instance;