import User from "../models/user.js";
import bcrypt from "bcryptjs";
import Bookings from "../models/bookings.js";
import jwt from "jsonwebtoken";

// to get all users
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }
  if (!users) {
    return res.status(500).json({ message: "unexpected error occured" });
  }
  return res.status(200).json({ users });
};

// to create user signup
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = new User({ name, email, password: hashedPassword });
    user = await user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }
  return res.status(201).json({ id: user._id });
};

// to update a user
export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
    user = await user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ message: "Updated successfully" });
};

// to delete a user
export const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  let user;
  try {
    user = await User.findByIdAndDelete(id);
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ message: "Deleted successfully" });
};

// for user login authentication
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({
      email,
    });
  } catch (error) {
    return console.log(error);
  }

  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Unable to find user in this email " });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Password Incorrect" });
  }

  const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  // Save token using HTTP only cookie
  if (isPasswordCorrect) {
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });
  }

  return res
    .status(200)
    .json({ message: "Login successful", id: existingUser._id, token });
};

// to get the bookings of a user
export const getBookingsOfUser = async (req, res, next) => {
  const id = req.params.id;
  let bookings;

  try {
    bookings = await Bookings.find({
      user: id,
    })
      .populate("movie")
      .populate("user");
  } catch (error) {
    return console.log(error);
  }

  if (!bookings) {
    return res.status(504).json({ message: "Unable to get bookings" });
  }

  return res.status(200).json({ bookings });
};

// to get a user by userId
export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "unexpected error occured" });
  }
  return res.status(200).json({ user });
};
