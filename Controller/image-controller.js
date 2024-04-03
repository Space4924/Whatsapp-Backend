const url="http://localhost:8000";
export const uploadFile=(req,resp)=>{
    try{
        if(!req.file)return resp.status(404).json("File Not Found");
        console.log(req.file);
        const imageUrl=`${url}/file/${req.file.filename}`
        return resp.status(200).json(imageUrl);

    }catch(err){
        resp.status(500).json(err);

    }
}