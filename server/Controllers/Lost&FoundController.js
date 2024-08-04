const LostFoundItem = require('../Models/Lost&FoundModel');

exports.createLostFoundItem = async (req, res) => {
    const { itemPhoto, itemMessage, itemCharacteristics, lastSeenDate } = req.body;

    try {
        const newLostFoundItem = new LostFoundItem({
            user: req.user._id,
            itemPhoto,
            itemMessage,
            itemCharacteristics,
            lastSeenDate
        });

        await newLostFoundItem.save();
        res.status(201).json({ message: "Lost and Found item added successfully", lostFoundItem: newLostFoundItem });
    } catch (error) {
        res.status(500).json({ message: "Unable to add Lost and Found item", error: error.message });
    }
};

exports.getAllLostFoundItems = async (req, res) => {
    try {
        const lostFoundItems = await LostFoundItem.find().populate('user', 'username');
        res.status(200).json(lostFoundItems);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve Lost and Found items", error: error.message });
    }
};
