import mongoose from 'mongoose';
const newConversationSchema = new mongoose.Schema(
    {
        members: { type: Array },
        message: { type: String }
    },
    {
        timestamps:true
    }
)
const conversation = mongoose.model('Conversation', newConversationSchema);
export default conversation;
