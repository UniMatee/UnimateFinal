const Profile = require('../Models/ProfileModel');

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id }).populate('user', 'username');
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve profile", error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    const { username, name, email, linkedIn, otherLink } = req.body;
    try {
        let profile = await Profile.findOne({ user: req.user._id });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        profile.username = username;
        profile.name = name;
        profile.email = email;
        profile.linkedIn = linkedIn;
        profile.otherLink = otherLink;

        await profile.save();
        res.status(200).json({ message: "Profile updated successfully", profile });
    } catch (error) {
        res.status(500).json({ message: "Unable to update profile", error: error.message });
    }
};

exports.patchProfile = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'name', 'email', 'linkedIn', 'otherLink'];

    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: "Invalid updates!" });
    }

    try {
        const profile = await Profile.findOne({ user: req.user._id });

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        updates.forEach(update => profile[update] = req.body[update]);
        await profile.save();

        res.status(200).json({ message: "Profile updated successfully", profile });
    } catch (error) {
        res.status(500).json({ message: "Unable to update profile", error: error.message });
    }
};
