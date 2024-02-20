import { Room } from "@/types/room";
import API from "./interceptor";
import { working_hour } from "@/types/workingHours";
import { Department } from "@/types/department";
import { HolidayData } from "@/types/holiday";
import { login } from "@/types/login";

//Appointments
export const getAllAppointment = () => API.get("/appointment");
export const getAppointmentByRoomID = (roomId: number) =>
  API.get(`/appointment/room/${roomId}`);
export const createAppointment = (data: any) => API.post("/appointment", data);
export const comparePassCode = ({ data, id }: { data: any; id: number }) =>
  API.post(`/appointment/${id}`, data);
export const updateAppointment = ({ data, id }) =>
  API.patch(`/appointment/${id}`, data);
export const getAppointmentsCount = () => API.get("/appointment/count");
export const getAppointmentById = ({ id }) =>
  API.get(`/appointment/detail/${id}`);

//Working Hours
export const createWorkingHours = (data: working_hour) =>
  API.post("/working_hour", data);
export const getAllWorkingHours = () => API.get("/working_hour");
export const deleteWorkingHours = (id: number) =>
  API.delete(`/working_hour/${id}`);
export const updateWorkingHours = (id: number, data: any) =>
  API.patch(`/working_hour/${id}`, data);
export const activateWorkingHours = (id: number) =>
  API.post(`working_hour/${id}`);

//department
export const getDepartment = () => API.get("/department");
export const addDepartment = (departmentData: Department) =>
  API.post("/department", departmentData);
export const updateDepartment = (id: number, departmentData: Department) =>
  API.patch(`department/${id}`, departmentData);
export const getDepartmentById = (id: number) => API.get(`/department/${id}`);

//Rooms
export const getAllRooms = () => API.get("/room");
export const addRoom = (roomData: Room) => API.post("/room", roomData);
export const updateRoom = (id: number, roomData: Room) =>
  API.patch(`room/${id}`, roomData);
export const getRoomById = (id: number) => API.get(`/room/${id}`);

//Holidays 
export const getAllHolidays = () => API.get("/holiday");
export const createHolidays = (holidayData: HolidayData) => API.post("/holiday", holidayData);

//login
export const auth = (data: login) => API.post("/auth/login", data);
