import express from "express";
import { updateuser } from "../../controller/employee/updateuserprofile.js";
const router = express.Router();

router.put('/updateuserprofile/:name',updateuser)


export default router;