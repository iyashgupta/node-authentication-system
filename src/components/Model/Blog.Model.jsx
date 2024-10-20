const mongoose=require('mongoose')


const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    likes: { type: Number, default: 0 },
},
{
    versionKey:false,
    timestamps:true
}
)

const BlogModel = mongoose.model('Blog',BlogSchema)

module.exports = {
    BlogModel
}