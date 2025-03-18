import axios from "../axios";
const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

const getClinicsList = () => {
  return axios.get("/api/get-clinics-list");
};

export { createNewClinic, getClinicsList };
