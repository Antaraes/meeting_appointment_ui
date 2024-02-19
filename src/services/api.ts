import { Room } from "@/types/room";
import API from "./interceptor";

//Appointments
export const getAllAppointment = () => API.get("/appointment");
export const getAppointmentByRoomID = (roomId: number) =>
  API.get(`/appointment/room/${roomId}`);
export const createAppointment = (data) => API.post("/appointment", data);
export const comparePassCode = ({ data, id }) =>
  API.post(`/appointment/${id}`, data);
export const updateAppointment = ({data,id}) => API.patch(`/appointment/${id}`, data)
export const getAppointmentsCount = () => API.get("/appointment/count");

//department
export const getDepartment = () => API.get("/department");

//Rooms
export const getAllRooms = () => API.get("/room");
export const addRoom = (roomData: Room) => API.post("/room", roomData);
export const updateRoom = (id: number, roomData: Room) =>
  API.patch(`room/${id}`, roomData);
export const getRoomById = (id: number) => API.get(`/room/${id}`);
