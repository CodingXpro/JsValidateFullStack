import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const register = async (req, res, next) => {
    try {
      const { firstname, lastname, email, username,password,confirmPassword } =
        req.body;
  
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const maxUserId = await User.max("id");
  
      // Check if the table is empty
      const count = await User.count();
      const id = count > 0 ? maxUserId + 1 : 1;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({
        id,
        firstname,
        lastname,
        email,
        username,
        password:hashedPassword,
        confirmPassword
      });
  
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      // Handle errors
      console.error("Error during user registration:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  };
  
  //Login for the User
  
  export const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Authentication failed" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Authentication failed" });
      }
  
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h", // Token expires in 1 hour
        }
      );
  
      res.status(200).json({message:"Login Successfully!" ,token });
    } catch (error) {
      next(error);
    }
  };
  