import express from "express";
import {
  deleteBooking,
  getBookingById,
  newBooking,
} from "../controllers/booking_controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/", newBooking);
bookingRouter.get("/:id", getBookingById);
bookingRouter.delete("/:id", deleteBooking);

export default bookingRouter;
