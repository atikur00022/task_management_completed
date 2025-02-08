import {TokenDecode} from "../utility/TokenUtility.js";

// User Authentication
export default (req, res, next) => {

    const token = req.headers["token"];
    const decoded = TokenDecode(token);

    if(decoded === null){
        return res.status(401).json({status: "fail", message: "Unauthorized"});
    }else{

        const email = decoded['email'];
        const userId = decoded['userId'];
        req.headers.email = email;
        req.headers.userId = userId;
        next();

    }

}