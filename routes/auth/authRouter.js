import { Router } from "express";
import { errorResponse } from "../../helper/serverResponse.js";

const authRouter = Router();

authRouter.post("/signin", signinHandler);

export default authRouter;

async function signinHandler(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(res, 400, "some params are missing");
    }
    
  } catch (error) {
    console.log("error", error);
    errorResponse(res, 500, "internal server error");
  }
}
