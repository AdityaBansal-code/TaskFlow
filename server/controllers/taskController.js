const Task = require('../models/Task');

exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (err) {
        next(err);
    }
};

exports.createTask = async (req, res, next) => {
    const { title, description, status } = req.body;

    try {
        // Validation
        if (!title) {
            return res.status(400).json({
                success: false,
                error: 'Please provide a title'
            });
        }

        const task = await Task.create({
            title,
            description,
            status: status || 'pending',
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            data: task
        });
    } catch (err) {
        next(err);
    }
};

exports.updateTask = async (req, res, next) => {
    const { title, description, status } = req.body;

    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }

        // Ownership check
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to update this task'
            });
        }

        task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }

        // Ownership check
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                error: 'Not authorized to delete this task'
            });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        next(err);
    }
};
