import axios from "axios";
const instance = axios.create({
  baseURL: "https://react-my-recipe-cf95f.firebaseio.com/"
});
export default instance;
