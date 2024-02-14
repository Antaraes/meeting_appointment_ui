import API from "./interceptor";

//Appointments
export const getAllAppointment = () => API.get("/appointment");
export const getAppointmentByRoomID = (roomId: number) =>
  API.get(`/appointment/room/${roomId}`);
export const createAppointment = (data) => API.post("/appointment", data);
export const comparePassCode = ({ data, id }) =>
  API.post(`/appointment/${id}`, data);

//department
export const getDepartment = () => API.get("/department");

//Room
export const getRoom = () => API.get("/room");
