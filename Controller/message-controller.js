import message from "../model/Message.js";
import conversation from "../model/Conversation.js";
import OpenAI from 'openai';
import dotenv from 'dotenv';
// import { text } from "body-parser";
dotenv.config();
export const newMessage = async (req, resp) => {
    try {
        const saveMessage = new message(req.body);
        await saveMessage.save();
        await conversation.findByIdAndUpdate(req.body.conversationId, { message: req.body.text });
        if (req.body.receiverId === "886482492412345678910") {
            const openai = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
            });
            console.log("step1");
            const messages = [{
                role: "user",
                content:req.body.text
        }]
            console.log("step2");
            console.log(messages);
            const response = await openai.chat.completions.create({
                messages: messages,
                model: 'gpt-3.5-turbo',
            });
            const saveMessage = new message({
                conversationId:req.body.conversationId,
                senderId:req.body.conversationId,
                receiverId:req.body.receiverId,
                text:response?.choices[0].message.content,
                type:"text"
            });
            await saveMessage.save();
            // console.log("step3");
            // console.log(response,"response",response?.choices[0].message.content);

            return resp.json({ message: response?.choices[0].message.content });
        }
        console.log("working after ai");
        return resp.status(200).json("Message has been sent successfully");
    } catch (err) {
        resp.status(500).json("error while newMessage Api");
    }
}

export const getMessage = async (req, resp) => {
    try {
        const Messages = await message.find({ conversationId: req.params.id });
        return resp.status(200).json(Messages);
    } catch (err) {
        return resp.status(500).json(err.message);
    }
}