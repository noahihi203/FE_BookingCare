import axios from "../axios";
const createNewClinic = (data) => {
  console.log("Noah check data: ", data)
  return axios.post("/api/create-new-clinic", data);
};

export { createNewClinic };
