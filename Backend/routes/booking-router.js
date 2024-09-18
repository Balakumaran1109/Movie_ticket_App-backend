import express from "express";
import {
  deleteBooking,
  getBookingById,
  newBooking,
} from "../controllers/booking_controller.js";
import protect from "../middlewares/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/", protect, newBooking);
bookingRouter.get("/:id", getBookingById);
bookingRouter.delete("/:id", deleteBooking);

export default bookingRouter;
