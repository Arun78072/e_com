const mongoose = require('mongoose')

const userPostsSchema = mongoose.Schema({
    userId:{
        type:String,
        index: true
    },
    caption:{
        type:String,
    },
    location:{
        type:String,
    },
    createdAt:{
        type: Number,
        required: true
    },
    image :{
        type :String,
    },
    likeCount : {
        type : Number,
    },
    comments : {
        type : Object,
    },
})

module.exports = mongoose.model("userPosts",userPostsSchema)
