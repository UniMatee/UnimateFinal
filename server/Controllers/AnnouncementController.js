const Announcement = require('../Models/AnnouncementModel');

const createAnnouncement = async (req, res) => {
    try {
        const { photo, message } = req.body;

        if (!photo || !message) {
            return res.status(400).json({ error: 'Photo and message are required' });
        }

        const newAnnouncement = new Announcement({
            photo,
            message,
            likes,
            likedBy
        });

        await newAnnouncement.save();

        res.status(201).json(newAnnouncement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ date: -1 });
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createAnnouncement,
    getAllAnnouncements
};
