import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing data
    await Album.deleteMany({});
    await Song.deleteMany({});

    // Define all songs
    const songsData = [
      { title: "11K", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/11K.mp3", plays: Math.floor(Math.random() * 5000), duration: 176 },
      { title: "Akatsuki", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/Akatsuki.mp3", plays: Math.floor(Math.random() * 5000), duration: 155 },
      { title: "Anaadi", artist: "Seedhe Maut", imageUrl: "/cover-images/2.jpg", audioUrl: "/songs/Anaadi.mp3", plays: Math.floor(Math.random() * 5000), duration: 198 },
      { title: "Brahamachari", artist: "Seedhe Maut", imageUrl: "/cover-images/4.jpg", audioUrl: "/songs/Brahamachari.mp3", plays: Math.floor(Math.random() * 5000), duration: 214 },
      { title: "Brand New", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/Brand New.mp3", plays: Math.floor(Math.random() * 5000), duration: 139 },
      { title: "Champion", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/Champion.mp3", plays: Math.floor(Math.random() * 5000), duration: 214 },
      { title: "Hoshiyaar", artist: "Seedhe Maut", imageUrl: "/cover-images/2.jpg", audioUrl: "/songs/Hoshiyaar.mp3", plays: Math.floor(Math.random() * 5000), duration: 193 },
      { title: "I Don't Miss That Life", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/I Don't Miss That Life.mp3", plays: Math.floor(Math.random() * 5000), duration: 174 },
      { title: "Joint in the Booth", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/Joint in the Booth.mp3", plays: Math.floor(Math.random() * 5000), duration: 166 },
      { title: "Khatta Flow", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/Khatta Flow.mp3", plays: Math.floor(Math.random() * 5000), duration: 152 },
      { title: "Kya Challa", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/Kya Challa.mp3", plays: Math.floor(Math.random() * 5000), duration: 101 },
      { title: "Maina", artist: "Seedhe Maut", imageUrl: "/cover-images/2.jpg", audioUrl: "/songs/Maina.mp3", plays: Math.floor(Math.random() * 5000), duration: 228 },
      { title: "Moon Comes Up", artist: "Seedhe Maut", imageUrl: "/cover-images/4.jpg", audioUrl: "/songs/Moon Comes Up.mp3", plays: Math.floor(Math.random() * 5000), duration: 300 },
      { title: "Shakti Aur Kshama", artist: "Seedhe Maut", imageUrl: "/cover-images/4.jpg", audioUrl: "/songs/Shakti Aur Kshama.mp3", plays: Math.floor(Math.random() * 5000), duration: 255 },
      { title: "Shaktimaan", artist: "Seedhe Maut", imageUrl: "/cover-images/1.jpg", audioUrl: "/songs/Shaktimaan.mp3", plays: Math.floor(Math.random() * 5000), duration: 195 },
      { title: "Swah!", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/Swah!.mp3", plays: Math.floor(Math.random() * 5000), duration: 284 },
      { title: "Taakat", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/Taakat.mp3", plays: Math.floor(Math.random() * 5000), duration: 156 },
      { title: "Toh Kya", artist: "Seedhe Maut", imageUrl: "/cover-images/2.jpg", audioUrl: "/songs/Toh Kya.mp3", plays: Math.floor(Math.random() * 5000), duration: 180 },
      { title: "Uss Din", artist: "Seedhe Maut", imageUrl: "/cover-images/1.jpg", audioUrl: "/songs/Uss Din.mp3", plays: Math.floor(Math.random() * 5000), duration: 182 },
      { title: "W", artist: "Seedhe Maut", imageUrl: "/cover-images/3.jpg", audioUrl: "/songs/W.mp3", plays: Math.floor(Math.random() * 5000), duration: 180 },
    ];

    // Create all songs
    const createdSongs = await Song.insertMany(songsData);

    // Group songs by album (based on imageUrl)
    const bayaanSongs = createdSongs.filter(song => song.imageUrl === "/cover-images/1.jpg").map(song => song._id);
    const nayaabSongs = createdSongs.filter(song => song.imageUrl === "/cover-images/2.jpg").map(song => song._id);
    const lunchBreakSongs = createdSongs.filter(song => song.imageUrl === "/cover-images/3.jpg").map(song => song._id);
    const kshamaSongs = createdSongs.filter(song => song.imageUrl === "/cover-images/4.jpg").map(song => song._id);

    // Create albums with references to song IDs
    const albums = [
      {
        title: "Bayaan",
        artist: "Seedhe Maut",
        imageUrl: "/albums/1.jpg",
        releaseYear: 2018,
        songs: bayaanSongs,
      },
      {
        title: "Nayaab",
        artist: "Seedhe Maut",
        imageUrl: "/albums/2.jpg",
        releaseYear: 2022,
        songs: nayaabSongs,
      },
      {
        title: "LunchBreak",
        artist: "Seedhe Maut",
        imageUrl: "/albums/3.jpg",
        releaseYear: 2023,
        songs: lunchBreakSongs,
      },
      {
        title: "Kshama",
        artist: "Seedhe Maut",
        imageUrl: "/albums/4.jpg",
        releaseYear: 2024,
        songs: kshamaSongs,
      },
    ];

    // Insert all albums
    const createdAlbums = await Album.insertMany(albums);

    // Update songs with their album references
    await Promise.all([
      Song.updateMany({ _id: { $in: bayaanSongs } }, { albumId: createdAlbums[0]._id }),
      Song.updateMany({ _id: { $in: nayaabSongs } }, { albumId: createdAlbums[1]._id }),
      Song.updateMany({ _id: { $in: lunchBreakSongs } }, { albumId: createdAlbums[2]._id }),
      Song.updateMany({ _id: { $in: kshamaSongs } }, { albumId: createdAlbums[3]._id }),
    ]);

    console.log("Database seeded successfully!");
    
    // Log summary of what was seeded
    console.log(`Created ${createdSongs.length} songs across ${createdAlbums.length} albums:`);
    console.log(`- Bayaan: ${bayaanSongs.length} songs`);
    console.log(`- Nayaab: ${nayaabSongs.length} songs`);
    console.log(`- LunchBreak: ${lunchBreakSongs.length} songs`);
    console.log(`- Kshama: ${kshamaSongs.length} songs`);
    
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();