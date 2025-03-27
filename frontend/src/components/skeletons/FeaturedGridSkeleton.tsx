const FeaturedGridSkeleton = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
			{Array.from({ length: 6 }).map((_, i) => (
				<div
					key={i}
					className="flex items-center bg-gradient-to-r from-blue-900/40 to-zinc-800/50 
					rounded-lg overflow-hidden animate-pulse shadow-lg"
				>
					<div className="w-16 sm:w-20 h-16 sm:h-20 bg-blue-700/30 rounded-md flex-shrink-0" />
					<div className="flex-1 p-4">
						<div className="h-4 bg-blue-700/40 rounded-lg w-3/4 mb-2" />
					</div>
				</div>
			))}
		</div>
	);
};

export default FeaturedGridSkeleton;