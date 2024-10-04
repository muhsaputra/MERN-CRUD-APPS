import User from "../model/userModel.js";

// Create User
export const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const { name } = newUser;

    const userExist = await User.findOne({ name });
    if (userExist) {
      return res.status(400).json({ message: "User Sudah Ada" });
    }

    const saveData = await newUser.save();
    // res.status(200).json(saveData);
    res.status(200).json({ message: "User Berhasil Dibuat " });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All User
export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "User Data Tidak Ditemukan" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get User Id
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User Tidak Ditemukan" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update user
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User Tidak Di Temukan." });
    }

    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // res.status(200).json(updatedData);
    res.status(200).json({ message: "User Berhasil di Update " });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Delete User

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User Tidak Ditemukan." });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
