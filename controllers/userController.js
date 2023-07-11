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
        const createdUser = await User.create(req.body)
        res.json(createdUser)
    } catch (err) {
        this.resError(res,err)
    }
  },
  async deleteUser(req, res ){
    try {
        const deleteUser = await User.findOneAndDelete({_id: req.params.userId})
        if(!deleteUser){
            res.status(404).json({message:'User with this id was not found'})
        } else{
        res.json(deleteUser)

        }
        } catch (err) {
        this.resError(res, err)
    }
  },
  async updateUser (req, res){
    try {
        const updateUser = User.findOneAndUpdate({_id: req.params.userId},{$set: req.body}, {new:true, runValidators:true})
        if(!updateUser){
            res.status(404).json({message:'user with this id was not found'})
        } else {
            res.json(updateUser)
        }
    } catch (err) {
        this.resError(res,err)
    }
  },
  async addUserFriend(req, res){
    try {
      const user = await User.findOne({_id:req.params.userId})
      const friend = await User.findOne({_id:req.params.friendId})
      if (!user || !friend){
        res.status(404).json({message:"cannot find user or friend"})
      } else{
      user.friends.push(friend)
      await user.save()
      res.json({message:"friend was added successfully!"})
      }

    } catch (err) {
      this.resError(res,err)
    }
  },
  async deleteFriend(req,res){
    try {
      const user = User.findOne({_id:req.params.userId})
      const friend = await User.findOne({_id:red.params.friendId})
      if (!user || !friend){
        res.status(404).json({message:"cannot find user or friend"})
      } else {
      user.friends.splice(user.friends.indexOf(friend), 1);
      await user.save()
      res.json({message:"friend was removed successfully!"})

      }

    } catch (err) {
      this.resError(res,err)
    }
  }
};
