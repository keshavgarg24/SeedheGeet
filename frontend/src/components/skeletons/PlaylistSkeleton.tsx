const PlaylistSkeleton = () => {
	return Array.from({ length: 7 }).map((_, i) => (
		<div
			key={i}
			className="p-3 rounded-lg flex items-center gap-4 bg-zinc-800/50 animate-pulse 
			shadow-md hover:shadow-lg transition-all"
		>
			<div className="w-12 h-12 bg-blue-800/40 rounded-lg flex-shrink-0" />
			<div className="flex-1 min-w-0 hidden md:block space-y-3">
				<div className="h-4 bg-blue-700/50 rounded w-3/4" />
				<div className="h-3 bg-blue-700/40 rounded w-1/2" />
			</div>
		</div>
	));
};

export default PlaylistSkeleton;