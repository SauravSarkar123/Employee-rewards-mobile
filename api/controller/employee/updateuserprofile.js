import User from "../../modals/User.js";
import bcrypt from "bcryptjs";

export const updateuser = async (req, res) => {
  const name = req.params.name;
  const mobile = req.body.mobile;
  const password = req.body.password;
  const address = req.body.address;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    const updatedUser = await User.findOneAndUpdate(
      { name: name },
      { $set: { mobile: mobile, password: hash, address: address } }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
