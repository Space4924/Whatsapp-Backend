import conversation from "../model/Conversation.js";
export const newConversation=async(req,resp)=>{
    try{
        const senderId=req.body.senderId;
        const receiverId=req.body.receiverId;

        const exist=await conversation.findOne({members:{$all:[receiverId,senderId]}});
        if(exist)return resp.status(200).json('conversation already exist');

        const newConversation=new conversation({
            members:[senderId,receiverId]
        })
        await newConversation.save();
        return resp.status(200).json("Conversation Saved Successfully");

        
    }catch(err){
     resp.status(500).json(err.message);
    }
}

export const getConversation=async(req,resp)=>{
    try{
        const senderId=req.body.senderId;
        const receiverId=req.body.receiverId;
         let Connection=await conversation.findOne({members:{$all:[receiverId,senderId]}});
         return resp.status(200).json(Connection);
    }catch(err){
        return resp.status(500).json("Error while getConversation");

    }
}