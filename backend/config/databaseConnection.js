import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "sql12768756",
  "sql12768756",
  "nq1mh2T1sN", // <-- Provide your password here
  {
    host: "sql12.freesqldatabase.com",
    dialect: "mysql",
    define: {
      timestamps: true,
    },
  }
);
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected Successfully😍😍 !!");
  } catch (error) {
    console.error("Error in connecting to the database:", error);
  }
};