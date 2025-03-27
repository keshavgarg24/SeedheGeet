import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
	try {
		// -1 = Descending => newest -> oldest
		// 1 = Ascending => oldest -> newest
		const songs = await Song.find().sort({ createdAt: -1 });
		res.json(songs);
	} catch (error) {
		next(error);
	}
};

export const getFeaturedSongs = async (req, res, next) => {
	try {
		// Fetch the first 6 songs in ascending order of createdAt
		const songs = await Song.find()
			.sort({ createdAt: 1 }) // Oldest first
			.limit(6)
			.select("_id title artist imageUrl audioUrl");

		res.json(songs);
	} catch (error) {
		next(error);
	}
};

export const getMadeForYouSongs = async (req, res, next) => {
	try {
		// Fetch every 3rd song (skipping some songs to create variety)
		const songs = await Song.aggregate([
			{
				$match: { _id: { $exists: true } }, // Ensuring valid documents
			},
			{
				$group: {
					_id: null,
					songs: { $push: "$$ROOT" },
				},
			},
			{
				$project: {
					songs: {
						$filter: {
							input: "$songs",
							as: "song",
							cond: { $eq: [{ $mod: [{ $indexOfArray: ["$songs._id", "$$song._id"] }, 3] }, 0] },
						},
					},
				},
			},
			{
				$unwind: "$songs",
			},
			{
				$replaceRoot: { newRoot: "$songs" },
			},
			{
				$limit: 4,
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				},
			},
		]);

		res.json(songs);
	} catch (error) {
		next(error);
	}
};

export const getTrendingSongs = async (req, res, next) => {
	try {
		// Fetch 4 random songs from the last 10 entries
		const songs = await Song.aggregate([
			{
				$sort: { createdAt: -1 },
			},
			{
				$limit: 10,
			},
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				},
			},
		]);

		res.json(songs);
	} catch (error) {
		next(error);
	}
};
