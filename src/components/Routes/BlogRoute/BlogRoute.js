const { Router } = require('express');
const BlogRouter = Router();
const {BlogModel} = require("../../Model/Blog.Model");
const UserModel = require('../../Model/Users.Model');
const mongoose = require('mongoose');

BlogRouter.post("/register", async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        // Validate required fields
        if (!title || !content) {
            return res.status(400).send({
                status: false,
                message: "Blog title and content are required"
            });
        }

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({
                status: false,
                message: "Invalid userId"
            });
        }

        // Fetch user data by userId
        const userData = await UserModel.findOne({ _id: userId });

        if (!userData) {
            return res.status(404).send({
                status: false,
                message: "User not found"
            });
        }

        // Create new blog post
        const newBlog = new BlogModel({
            author: userData.name,
            content,
            title,
            userId
        });

        // Save the new blog post
        const data = await newBlog.save();

        res.status(200).send({
            status: true,
            message: 'Blog created successfully',
            data
        });
    } catch (err) {
        console.error('Error creating blog:', err);
        res.status(500).send({
            status: false,
            message: "Internal Server Error"
        });
    }
});


BlogRouter.get("/users", async (req, res) => {
    try {
        // Fetch all users
        const allUsers = await UserModel.find();

        // Use Promise.all to fetch blog counts for all users
        const userBlogCounts = await Promise.all(
            allUsers.map(async (user) => {
                const totalBlogs = await BlogModel.countDocuments({ userId: user._id });
                const {userName,email,name,createdAt} = user // destracturing the keys
                return {
                    userName,email,name,createdAt, 
                    totalBlogs // Added total blog count
                };
            })
        );

        res.status(200).send({ data:userBlogCounts,status:true});
    } catch (err) {
        console.error('Error fetching users and blog counts:', err);
        res.status(500).send({ message: 'Internal server error', status: false });
    }
});

module.exports = {
    BlogRouter
};
