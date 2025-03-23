import axios from "../axios";
const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

const getClinicsList = () => {
  return axios.get("/api/get-clinics-list");
};

const getDetailClinicById = (clinicId) => {
  return axios.get(`/api/get-detail-clinic-by-id?clinicId=${clinicId}`);
}

export { createNewClinic, getClinicsList, getDetailClinicById };
