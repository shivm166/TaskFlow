import mongoose from 'mongoose';
import Meeting from '../models/meeting.js';

const getAllMeetings = async (req, res) => {
	try {
		const meetings = await Meeting.find({ userId: req.user.id });

		res.status(200).json(meetings);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const getUserMeetings = async (req, res) => {
	const { id } = req.params;
	try {
		const userMeetings = await Meeting.find({ userId: id });

		res.status(200).json(userMeetings);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const createMeeting = async (req, res) => {
	try {
		const meeting = await Meeting.create(req.body);

		res.status(200).json(meeting);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const deleteMeeting = async (req, res) => {
	const { id } = req.params;

	try {
		const meeting = await Meeting.findByIdAndDelete(id);

		if (!mongoose.Types.ObjectId.isValid(id))
			return res.status(400).json({ error: "Note's id is invalid" });

		res.status(200).json(meeting);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const updateMeeting = async (req, res) => {
	const { id } = req.params;

	try {
		const meeting = await Meeting.findOneAndUpdate(
			{ _id: id },
			{ ...req.body }
		);

		res.status(200).json(meeting);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const deleteAllMeetings = async (req, res) => {
	try {
		await Meeting.deleteMany();
		res.status(204);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export {
	getAllMeetings,
	getUserMeetings,
	createMeeting,
	deleteMeeting,
	updateMeeting,
	deleteAllMeetings,
};
