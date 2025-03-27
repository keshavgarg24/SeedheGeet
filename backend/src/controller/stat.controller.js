import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
	try {
		const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
            Song.countDocuments(), // Counts total number of songs
            Album.countDocuments(), // Counts total number of albums
            User.countDocuments(), // Counts total number of users
			Song.aggregate([
				{
					$unionWith: {
						coll: "albums", // songs and albums are treted as a single dataset and merged togther
						pipeline: [],
					},
				},
				{
					$group: {
						_id: "$artist", // the dataset are grouped by artist into columns with unqiue artisr names
					},
				},
				{
					$count: "count", // counts the number of unqiue artists
				},
			]),
		]);

		res.status(200).json({
			totalAlbums,
			totalSongs,
			totalUsers,
			totalArtists: uniqueArtists[0]?.count || 0,
		});
	} catch (error) {
		next(error);
	}
};