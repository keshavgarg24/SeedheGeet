import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";

const AuthCallbackPage = () => {
	const { isLoaded, user } = useUser();
	const navigate = useNavigate();
	const syncAttempted = useRef(false);

	useEffect(() => {
		const syncUser = async () => {
			if (!isLoaded || !user || syncAttempted.current) return;

			try {
				syncAttempted.current = true;

				await axiosInstance.post("/auth/callback", {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					imageUrl: user.imageUrl,
				});
			} catch (error) {
				console.log("Error in auth callback", error);
			} finally {
				navigate("/");
			}
		};

		syncUser();
	}, [isLoaded, user, navigate]);

	return (
		<div className="h-screen w-full bg-black flex items-center justify-center">
			<Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800 shadow-lg shadow-blue-500/20">
				<CardContent className="flex flex-col items-center gap-6 pt-6">
					{/* Animated Boombox */}
					<motion.div
						className="relative flex items-center justify-center"
						initial={{ scale: 1 }}
						animate={{ scale: [1, 1.1, 1] }}
						transition={{ duration: 0.8, repeat: Infinity }}
					>
						<motion.div
							className="absolute w-16 h-16 rounded-full bg-blue-700 opacity-30 blur-xl"
							animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						/>
						<Radio className="size-10 text-blue-400 animate-pulse" />
					</motion.div>

					<h3 className="text-zinc-400 text-xl font-bold uppercase">Bass Drop Incoming</h3>
					<p className="text-zinc-400 text-sm">Hold tight, setting up the vibe 🎧</p>
				</CardContent>
			</Card>
		</div>
	);
};
export default AuthCallbackPage;
