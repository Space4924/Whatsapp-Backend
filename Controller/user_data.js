import user_data from "../model/User_data.js";
export const GetUserData=async(req,resp)=>{
    console.log(req.body,"this is req.bodys");
  try{
    let exist=user_data.findOne({email:req.body.email})
    if(exist){
        resp.status(200).json("user already Exist from this EmailId")
    }

    let data=new user_data(req.body);
    await data.save();
    resp.status(200).json(response);
  }catch(err){
    resp.status(500).json("eror while pushing the data of model");
  }
}