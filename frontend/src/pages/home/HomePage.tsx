import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useState } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Disc3, Waves, TrendingUp, Sparkles } from "lucide-react";

const getSectionIcon = (title: string) => {
  const icons: Record<string, React.ReactNode> = {
    "Made For You": <Sparkles className="text-blue-400 size-6" />,
    Trending: <TrendingUp className="text-blue-400 size-6" />,
  };
  return icons[title] || <Disc3 className="text-blue-400 size-6" />;
};

const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    featuredSongs,
    trendingSongs,
  } = useMusicStore();
  const { initializeQueue } = usePlayerStore();
  const [timeOfDay, setTimeOfDay] = useState<string>("");

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (madeForYouSongs.length && featuredSongs.length && trendingSongs.length) {
      initializeQueue([...featuredSongs, ...madeForYouSongs, ...trendingSongs]);
    }
  }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

  useEffect(() => {
    const hour = new Date().getHours();
    setTimeOfDay(
      hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : hour < 21 ? "Evening" : "Night"
    );
  }, []);

  const sections = [
    {
      title: "Made For You",
      songs: madeForYouSongs,
      bgClass: "bg-blue-900/20 hover:bg-blue-900/30 border-blue-800/40",
    },
    {
      title: "Trending",
      songs: trendingSongs,
      bgClass: "bg-blue-900/20 hover:bg-blue-900/30 border-blue-800/40",
    },
  ];

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-br from-[#1e40af] via-[#1e3a8a] to-[#0f172a] 
    backdrop-blur-md shadow-2xl text-white">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-6 space-y-6">
          {/* Dynamic Greeting */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-blue-700/50 to-blue-800/50 p-4 
          rounded-xl border border-blue-700/40 transition-all duration-300 hover:border-blue-500/50 shadow-md">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-full 
            shadow-md transform transition-transform hover:scale-110">
              <Waves className="size-8 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Good {timeOfDay}!
              </h1>
              <p className="text-sm text-blue-200">
                Find your next favorite song today.
              </p>
            </div>
          </div>

          {/* Featured Section */}
          <FeaturedSection />

          {/* Dynamic Sections */}
          <div className="space-y-8">
            {sections.map(({ title, songs, bgClass }) => (
              <div 
                key={title} 
                className={`
                  rounded-xl p-4 transition-all duration-300 shadow-lg 
                  border ${bgClass} group
                `}
              >
                <div className="flex items-center gap-3 mb-4">
                  {getSectionIcon(title)}
                  <h2 className="text-xl font-bold text-white 
                  group-hover:text-blue-300 transition-colors">
                    {title}
                  </h2>
                </div>
                <SectionGrid title={title} songs={songs} isLoading={isLoading} />
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
