import user from "../model/User.js";
export const addUser = async (req, resp) => {
    try {
        let exist = await user.findOne({ sub: req.body.sub });
        if (exist) {
            return resp.status(200).json({ msg: "user Already Exist" });
        }
        const new_user = new user(req.body);
        await new_user.save();
        return resp.status(200).json(new_user);
    } catch (err) {
        return resp.status(500).json(err);
    }
}

export const getUsers = async (req, resp) => {
    try {
        let users = await user.find();
        return resp.status(200).json(users);
    } catch (err) {
        return resp.status(500).json(err);

    }
}