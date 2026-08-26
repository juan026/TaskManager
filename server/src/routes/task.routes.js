const express = require('express');
const prisma = require("../config/prisma");

const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

router.get("/", authMiddleware, async (req, res) => {

    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({
                message: "User ID is missing"
            });
        }
        const tasks = await prisma.task.findMany({
            where: { userId }
        });
        res.json({ tasks });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching tasks" });
    }

   
});


router.get("/:id", authMiddleware, async (req, res) => {

    try {
        const taskId = parseInt(req.params.id);
        const userId = req.user.id;


        const task = await prisma.task.findFirst({
            where: { id: taskId, userId: userId }
        });

        if (!task) {

            return res.status(404).json({ message: "Task not found" });
            
        }
        return res.json({task});  
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching task" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {

    try {
        const taskId = parseInt(req.params.id);
        const userId = req.user.id;

        const {title, description, completed} = req.body;

        if (!title || description === undefined || completed === undefined) {
            return res.status(400).json({
                message: "Title, description and completed are required"
            });
        }


        const task = await prisma.task.findFirst({
            where: { id: taskId, userId: userId }
        });

        if (!task) {

            return res.status(404).json({ message: "Task not found" });
            
        }

        const taskU= await prisma.task.update({
            where: { id: taskId },
            data: {
                title,
                description,
                completed
            }
        });
        res.status(201).json({ message: "Task updated successfully", taskU });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching task" });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {

    try {
        const taskId = parseInt(req.params.id);
        const userId = req.user.id;

      
        const task = await prisma.task.findFirst({
            where: { id: taskId, userId: userId }
        });

        if (!task) {

            return res.status(404).json({ message: "Task not found" });
            
        }

        const deletedTask= await prisma.task.delete({
            where: { id: taskId }
            
        });
        res.status(201).json({ message: "Task deleted successfully", deletedTask });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting task" });
    }
});


router.post("/", authMiddleware,  async (req, res) => {
    try {

        const {title, description} = req.body;

        if (!title || !description){
            return res.status(400).json({
                message: "Title and description are required"
            });
        }
        const task= await prisma.task.create({
            data: {
                title,
                description,
                userId: req.user.id
            }
        });
        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating task" });
    }
});

module.exports = router;
