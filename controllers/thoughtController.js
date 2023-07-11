const { User, Thought } = require("../models");


module.exports = {
    resError(res, err) {
      return res.status(500).json(err);
    },
    async allThought(req, res){
        try {
            const thoughts = await Thought.find()

            res.json(thoughts)
            
        } catch (err) {
           this.resError(res,err) 
        }
    },
    async singleThought(req, res){
        try {
            const thought = await Thought.findOne({_id:req.params.thoughtId})
            if(!thought){
                res.status(404).json({message:"thought with this id was not found!"})
            } else {
                res.json(thought)
            }
        } catch (err) {
            this.resError(res,err)
        }
    },
    async createThought (req, res){
        try {
            const thought = await Thought.create(req.body)
            const user = await User.findOneAndUpdate({_id: req.body.userId},{
                $addToSet:{ thoughts: thought._id}
            }, {new:true})
            if(!user){
                res.status(404).json({message:'Thought created but the user Id was not found'})
            }else{
                res.json({message:"Thought was created successfully!"})
            }
        } catch (err) {
            this.resError(res,err)
        }
    },
    async updateThought(req, res ){
        try {
            const thought = await Thought.findOneAndUpdate({_id:req.params.thoughtId},{$set:req.body},{runValidators:true, new:true})
            if(!thought){
                res.status(404).json({message:"thought with this id was not found!"})
            } else{
                res.json(thought)
            }
        } catch (err) {
            this.resError(res,err)
        }
    }, 
    async deleteThought(req, res){
        try {
            const thought = await Thought.findOneAndDelete({_id:req.params.thoughtId},)
            if(!thought){
                res.status(404).json({message:"thought with this id was not found!"})
            } else {
                res.json({message:"Thought was deleted successfully!"})
            }
        } catch (err) {
            this.resError(res, err)
        }
    }
}
