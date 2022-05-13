import feedbackRoutes from "./feedbackRoutes";
import organizationRoutes from "./organizationRoutes";
import userRoutes from "./userRoutes";

const routes = require("express").Router();

routes.use("/users", userRoutes);
routes.use("/feedbacks", feedbackRoutes);
routes.use("/organizations", organizationRoutes);

export default routes;