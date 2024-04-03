import multer from 'multer';
import dotenv from 'dotenv';
import  {GridFsStorage}  from 'multer-gridfs-storage';
dotenv.config();
const storage = new GridFsStorage({
    url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@web.ujpvkbx.mongodb.net/`,
    // options:{useUnifiedTopology:true,useNewUrlParser:true},
    file:(request,file)=>{
        
        const match=["image/png","image/jpg"];

        if(!match.includes(file.mimetype)){
            return {
                bucketName:"files",
                filename:`${Date.now()}-file-${file.originalname}`
            }
        }
        return {
            bucketName:"photoes",
            filename:`${Date.now()}-file-${file.originalname}`
        }

    }

});
const upload=multer({storage});
export default upload;
