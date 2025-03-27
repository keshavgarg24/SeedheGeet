import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
	const { isAdmin } = useAuthStore();
	console.log({ isAdmin });

	return (
		<div
			className="flex items-center justify-between px-6 py-3 sticky top-0 bg-zinc-900/60 
			backdrop-blur-xl shadow-lg border-b border-zinc-800 z-20"
		>
			{/* Logo & Branding */}
			<Link to="/" className="flex items-center gap-2 text-white font-semibold">
				<img src="/seedhegeet.png" className="h-10 w-10 rounded-lg object-contain shadow-md" alt="SeedheGeet logo" />
				<div className="flex flex-col leading-tight">
					<span className="text-lg tracking-wide">SeedheGeet</span>
					<span className="text-[10px] mr-2 text-zinc-400">lean into dhh music</span>
				</div>
			</Link>

			{/* Actions */}
			<div className="flex items-center gap-4">
				{isAdmin && (
					<Link
						to={"/admin"}
						className={cn(
							buttonVariants({
								variant: "outline",
								className:
									"flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/80 text-white border-zinc-700 transition-all hover:bg-zinc-700/90 hover:border-white hover:scale-105 active:scale-100 shadow-md"
							})
						)}
					>
						<LayoutDashboardIcon className="size-5 text-zinc-300" />
						<span className="hidden md:inline">Admin</span>
					</Link>
				)}

				<SignedOut>
					<SignInOAuthButtons />
				</SignedOut>

				<UserButton afterSignOutUrl="/" />
			</div>
		</div>
	);
};
export default Topbar;
