const UsersListSkeleton = () => {
	return Array.from({ length: 4 }).map((_, i) => (
		<div
			key={i}
			className="flex items-center justify-center lg:justify-start gap-4 p-3 rounded-lg 
			bg-gradient-to-r from-zinc-800/40 to-blue-900/40 animate-pulse shadow-md"
		>
			<div className="h-12 w-12 rounded-full bg-blue-800/50" />
			<div className="flex-1 lg:block hidden">
				<div className="h-4 w-24 bg-blue-700/50 rounded mb-2" />
				<div className="h-3 w-32 bg-blue-700/40 rounded" />
			</div>
		</div>
	));
};

export default UsersListSkeleton;