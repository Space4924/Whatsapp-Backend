import express from "express";
const route=express.Router();
import { addUser ,getUsers} from "../Controller/user-controller.js";
import { newConversation,getConversation } from "../Controller/conversation-controller.js";
import { getMessage, newMessage } from "../Controller/message-controller.js";
import { uploadFile } from "../Controller/image-controller.js";
import upload from "../utils/upload.js";
import { GetUserData } from "../Controller/user_data.js";
route.post('/add',addUser)
route.get('/users',getUsers);
route.post('/conversation/add',newConversation);
route.post('/conversation/get',getConversation);
route.post('/message/add',newMessage);
route.get('/message/get/:id',getMessage);
route.post('/file/upload',uploadFile);
route.post('/userData',GetUserData)

export default route;