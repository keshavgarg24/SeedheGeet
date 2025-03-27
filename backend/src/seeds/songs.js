import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
	{ title: "11K", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/11K.mp3", duration: 176 },
	{ title: "Akatsuki", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/Akatsuki.mp3", duration: 155 },
	{ title: "Anaadi", artist: "Seedhe Maut", imageUrl: "/cover-images/2.jpg", audioUrl: "/songs/Anaadi.mp3", duration: 198 },
	{ title: "Brahamachari", artist: "Seedhe Maut", imageUrl: "/cover-images/4.jpg", audioUrl: "/songs/Brahamachari.mp3", duration: 214 },
	{ title: "Brand New", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/Brand New.mp3", duration: 139 },
	{ title: "Champion", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/Champion.mp3", duration: 214 },
	{ title: "Hoshiyaar", artist: "Seedhe Maut", imageUrl: "/cover-images/2.jpg", audioUrl: "/songs/Hoshiyaar.mp3", duration: 193 },
	{ title: "I Don't Miss That Life", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/I Don't Miss That Life.mp3", duration: 174 },
	{ title: "Joint in the Booth", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/Joint in the Booth.mp3", duration: 166 },
	{ title: "Khatta Flow", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/Khatta Flow.mp3", duration: 152 },
	{ title: "Kya Challa", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/Kya Challa.mp3", duration: 101 },
	{ title: "Maina", artist: "Seedhe Maut", imageUrl: "/cover-images/2.jpg", audioUrl: "/songs/Maina.mp3", duration: 228 },
	{ title: "Moon Comes Up", artist: "Seedhe Maut", imageUrl: "/cover-images/4.jpg", audioUrl: "/songs/Moon Comes Up.mp3", duration: 300 },
	{ title: "Shakti Aur Kshama", artist: "Seedhe Maut", imageUrl: "/cover-images/4.jpg", audioUrl: "/songs/Shakti Aur Kshama.mp3", duration: 255 },
	{ title: "Shaktimaan", artist: "Seedhe Maut", imageUrl: "/cover-images/1.jpg", audioUrl: "/songs/Shaktimaan.mp3", duration: 195 },
	{ title: "Swah!", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/Swah!.mp3", duration: 284 },
	{ title: "Taakat", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/Taakat.mp3", duration: 156 },
	{ title: "Toh Kya", artist: "Seedhe Maut", imageUrl: "/cover-images/2.jpg", audioUrl: "/songs/Toh Kya.mp3", duration: 180 },
	{ title: "Uss Din", artist: "Seedhe Maut", imageUrl: "/cover-images/1.jpg", audioUrl: "/songs/Uss Din.mp3", duration: 182 },
    { title: "W", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/W.mp3", duration: 180 },
];

const seedSongs = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		await Song.deleteMany({});
		await Song.insertMany(songs);
		console.log("Songs seeded successfully!");
	} catch (error) {
		console.error("Error seeding songs:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedSongs();
