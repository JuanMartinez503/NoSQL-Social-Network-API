const { User, Thought } = require("../models");

module.exports = {
  resError(res, err) {
    return res.status(500).json(err);
  },
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      this.resError(res, err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const singleUser = await User.findOne({ _id: req.params.userId });
      if (!singleUser) {
        res.status(404).json({ message: "User with this id was not found" });
      } else {
        res.json(singleUser);
      }
    } catch (err) {
      this.resError(res, err);
    }
  },
  async postUser(req, res) {
    try {
      const createdUser = await User.create(req.body);
      res.json(createdUser);
    } catch (err) {
      this.resError(res, err);
    }
  },
  async deleteUser(req, res) {
    try {
      const deleteUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });
      if (!deleteUser) {
        res.status(404).json({ message: "User with this id was not found" });
      } else {
        res.json(deleteUser);
      }
    } catch (err) {
      this.resError(res, err);
    }
  },
  async updateUser(req, res) {
    try {
      const updateUser = User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true, runValidators: true }
      );
      if (!updateUser) {
        res.status(404).json({ message: "user with this id was not found" });
      } else {
        res.json(updateUser);
      }
    } catch (err) {
      this.resError(res, err);
    }
  },
  async addUserFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: { friendId: req.params.friendId } } },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ message: "no user with this id was found" });
      } else {
        res.json(user);
      }
    } catch (err) {
      this.resError(res, err);
    }
  },
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $pull: { friends: { friendId: req.params.friendId } },
        },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: "no user with this id was found" });
      } else {
        res.json(user);
      }
    } catch (err) {
      this.resError(res, err);
    }
  },
};
