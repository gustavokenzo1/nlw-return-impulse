import feedbackRoutes from "./feedbackRoutes";
import userRoutes from "./userRoutes";

const routes = require("express").Router();

routes.use("/users", userRoutes);
routes.use("/feedbacks", feedbackRoutes);

export default routes;