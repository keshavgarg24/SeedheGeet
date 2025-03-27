import { axiosInstance } from "@/lib/axios";
import { Album, Song, Stats } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface MusicStore {
	songs: Song[];
	albums: Album[];
	isLoading: boolean;
	error: string | null;
	currentAlbum: Album | null;
	featuredSongs: Song[];
	madeForYouSongs: Song[];
	trendingSongs: Song[];
	stats: Stats;

	fetchAlbums: () => Promise<void>;
	fetchAlbumById: (id: string) => Promise<void>;
	fetchFeaturedSongs: () => Promise<void>;
	fetchMadeForYouSongs: () => Promise<void>;
	fetchTrendingSongs: () => Promise<void>;
	fetchStats: () => Promise<void>;
	fetchSongs: () => Promise<void>;
	deleteSong: (id: string) => Promise<void>;
	deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
	albums: [],
	songs: [],
	isLoading: false,
	error: null,
	currentAlbum: null,
	madeForYouSongs: [],
	featuredSongs: [],
	trendingSongs: [],
	stats: {
		totalSongs: 0,
		totalAlbums: 0,
		totalUsers: 0,
		totalArtists: 0,
	},

	deleteSong: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/songs/${id}`);
			set((state) => ({
				songs: state.songs.filter((song) => song._id !== id),
			}));
			toast.success("Song deleted successfully");
		} catch (error: any) {
			console.error("Error in deleteSong:", error);
			toast.error("Error deleting song");
		} finally {
			set({ isLoading: false });
		}
	},

	deleteAlbum: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/albums/${id}`);
			set((state) => ({
				albums: state.albums.filter((album) => album._id !== id),
				songs: state.songs.map((song) =>
					song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song
				),
			}));
			toast.success("Album deleted successfully");
		} catch (error: any) {
			console.error("Error in deleteAlbum:", error);
			toast.error("Failed to delete album: " + (error.response?.data?.message || error.message));
		} finally {
			set({ isLoading: false });
		}
	},

	fetchSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs");
			console.log("Fetched songs:", response.data);
			set({ songs: Array.isArray(response.data) ? response.data : [] });
		} catch (error: any) {
			console.error("Error fetching songs:", error);
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchStats: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/stats");
			console.log("Fetched stats:", response.data);
			set({ stats: response.data });
		} catch (error: any) {
			console.error("Error fetching stats:", error);
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchAlbums: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/albums");
			console.log("Fetched albums:", response.data);
			set({ albums: Array.isArray(response.data) ? response.data : [] });
		} catch (error: any) {
			console.error("Error fetching albums:", error);
			set({ error: error.response?.data?.message || "Failed to fetch albums" });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchAlbumById: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/albums/${id}`);
			console.log("Fetched album by ID:", response.data);
			set({ currentAlbum: response.data });
		} catch (error: any) {
			console.error("Error fetching album by ID:", error);
			set({ error: error.response?.data?.message || "Failed to fetch album" });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchFeaturedSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs/featured");
			console.log("Fetched featured songs:", response.data);
			set({ featuredSongs: Array.isArray(response.data) ? response.data : [] });
		} catch (error: any) {
			console.error("Error fetching featured songs:", error);
			set({ error: error.response?.data?.message || "Failed to fetch featured songs" });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchMadeForYouSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs/made-for-you");
			console.log("Fetched made-for-you songs:", response.data);
			set({ madeForYouSongs: Array.isArray(response.data) ? response.data : [] });
		} catch (error: any) {
			console.error("Error fetching made-for-you songs:", error);
			set({ error: error.response?.data?.message || "Failed to fetch made-for-you songs" });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchTrendingSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs/trending");
			console.log("Fetched trending songs:", response.data);
			set({ trendingSongs: Array.isArray(response.data) ? response.data : [] });
		} catch (error: any) {
			console.error("Error fetching trending songs:", error);
			set({ error: error.response?.data?.message || "Failed to fetch trending songs" });
		} finally {
			set({ isLoading: false });
		}
	},
}));
