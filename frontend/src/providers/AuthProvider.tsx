import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

const updateApiToken = (token: string | null) => {
	if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { getToken, userId } = useAuth();
	const [loading, setLoading] = useState(true);
	const { checkAdminStatus } = useAuthStore();
	const { initSocket, disconnectSocket } = useChatStore();

	useEffect(() => {
		const initAuth = async () => {
			try {
				const token = await getToken();
				updateApiToken(token);
				if (token) {
					await checkAdminStatus();
					if (userId) initSocket(userId);
				}
			} catch (error: any) {
				updateApiToken(null);
				console.log("Error in auth provider", error);
			} finally {
				setLoading(false);
			}
		};

		initAuth();
		return () => disconnectSocket();
	}, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket]);

	if (loading)
		return (
			<div className="h-screen w-full flex items-center justify-center bg-black">
				<motion.div
					className="relative flex items-center justify-center"
					initial={{ opacity: 0.6, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1.1 }}
					transition={{ duration: 0.8, repeat: Infinity }}
				>
					<motion.div
						className="absolute w-20 h-20 rounded-full bg-blue-700 opacity-40 blur-lg"
						animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
						transition={{ duration: 1.5, repeat: Infinity }}
					/>
					<Mic className="size-12 text-blue-400 animate-pulse" />
				</motion.div>
			</div>
		);

	return <>{children}</>;
};

export default AuthProvider;
