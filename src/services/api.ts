import { Room } from "@/types/room";
import API from "./interceptor";

//Appointments
export const getAllAppointment = () => API.get("/appointment");
export const getAppointmentByRoomID = (roomId: number) =>
  API.get(`/appointment/room/${roomId}`);

//Rooms
export const getAllRooms = () => API.get("/room");
export const addRoom = (roomData: Room) => API.post("/room", roomData);
export const updateRoom = (id: number, roomData: Room) =>
  API.patch(`room/${id}`, roomData);
export const getRoomById = (id: number) => API.get(`/room/${id}`);
