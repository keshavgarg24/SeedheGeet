import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const SignInOAuthButtons = () => {
	const { signIn, isLoaded } = useSignIn();
	const [loading, setLoading] = useState(false);

	if (!isLoaded) {
		return null;
	}

	const signInWithGoogle = () => {
		setLoading(true);
		signIn.authenticateWithRedirect({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/auth-callback",
		});
	};

	return (
		<Button
			onClick={signInWithGoogle}
			variant="secondary"
			disabled={loading}
			className="w-full h-12 flex items-center gap-3 justify-center 
				border border-blue-500 rounded-lg bg-zinc-900/80 
				backdrop-blur-md shadow-lg transition-all duration-200
				hover:bg-zinc-800 hover:border-white hover:scale-105
				active:scale-100 disabled:opacity-50"
		>
			{loading ? (
				<Loader2 className="animate-spin size-5 text-zinc-400" />
			) : (
				<img src="/google.png" alt="Google" className="size-5" />
			)}
			<span className="font-semibold text-sm">
				<span className="text-red-500">Continue</span> 
				<span className="text-yellow-500"> with </span> 
				<span className="text-green-500">Google</span>
			</span>
		</Button>
	);
};

export default SignInOAuthButtons;
