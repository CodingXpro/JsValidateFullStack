// models/User.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/databaseConnection.js";


const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    
      },
    password: {
      type: DataTypes.STRING, // Corrected data type to string
      allowNull: false,
    },
    confirmPassword: {
        type: DataTypes.STRING, // Corrected data type to string
        allowNull: false,
      },
  },
  { timestamps: true }
);


export default User;