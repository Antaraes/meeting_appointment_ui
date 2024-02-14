import API from "./interceptor";

//Appointments
export const getAllAppointment = () => API.get("/appointment");
export const getAppointmentByRoomID = (roomId: number) => API.get(`/appointment/room/${roomId}`);
