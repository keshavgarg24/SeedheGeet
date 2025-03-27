import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { 
  Clock, 
  Pause, 
  Play, 
  Heart, 
  Share2, 
  MoreVertical,
  Download
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();
  const [showOptions, setShowOptions] = useState<string | null>(null);

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-pulse w-20 h-20 bg-blue-500/50 rounded-full"></div>
    </div>
  );

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;

    const isCurrentAlbumPlaying = currentAlbum?.songs.some((song) => song._id === currentSong?._id);
    if (isCurrentAlbumPlaying) togglePlay();
    else {
      playAlbum(currentAlbum?.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;
    playAlbum(currentAlbum?.songs, index);
  };

  const toggleSongOptions = (songId: string) => {
    setShowOptions(showOptions === songId ? null : songId);
  };

  return (
    <div className='h-full bg-gradient-to-br from-[#0f172a] via-[#1e3a8a]/80 to-[#3b82f6]/40'>
      <ScrollArea className='h-full rounded-md'>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='relative min-h-full'
        >
          {/* Content */}
          <div className='relative z-10'>
            {/* Album Header */}
            <div className='flex flex-col md:flex-row p-6 gap-6 pb-8'>
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className='w-full md:w-[240px] mx-auto md:mx-0'
              >
                <img
                  src={currentAlbum?.imageUrl}
                  alt={currentAlbum?.title}
                  className='w-full h-[240px] object-cover shadow-2xl rounded-xl 
                  transform transition-all duration-300 hover:scale-[1.02] 
                  hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]'
                />
              </motion.div>
              
              <div className='flex flex-col justify-end flex-grow'>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className='text-sm font-medium text-blue-300'
                >
                  Album
                </motion.p>
                <motion.h1 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className='text-4xl md:text-6xl lg:text-7xl font-bold my-4 
                  bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-500'
                >
                  {currentAlbum?.title}
                </motion.h1>
                <motion.div 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className='flex items-center gap-4 text-sm text-zinc-100'
                >
                  <span className='font-bold text-white'>{currentAlbum?.artist}</span>
                  <span className='text-blue-300'>• {currentAlbum?.songs.length} songs</span>
                  <span className='text-blue-300'>• {currentAlbum?.releaseYear}</span>
                </motion.div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className='px-6 pb-4 flex items-center gap-6'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handlePlayAlbum}
                  size='icon'
                  className='w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-400 
                  transition-all shadow-xl hover:shadow-blue-500/50'
                >
                  {isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? (
                    <Pause className='h-7 w-7 text-black' />
                  ) : (
                    <Play className='h-7 w-7 text-black' />
                  )}
                </Button>
              </motion.div>

              {/* Additional Action Buttons */}
              <div className='flex items-center gap-4'>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  className='text-white hover:text-blue-300'
                >
                  <Heart className='h-6 w-6' />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  className='text-white hover:text-blue-300'
                >
                  <Share2 className='h-6 w-6' />
                </motion.button>
              </div>
            </div>

            {/* Tracks Section */}
            <div className='bg-black/30 backdrop-blur-md rounded-xl mx-6 overflow-hidden'>
              {/* Table Header */}
              <div
                className='grid grid-cols-[16px_4fr_2fr_1fr_auto] gap-4 px-6 py-3 text-sm 
                text-zinc-400 border-b border-white/10 sticky top-0 bg-black/40 backdrop-blur-sm z-10'
              >
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className='h-4 w-4' />
                </div>
                <div></div>
              </div>

              {/* Song List */}
              <div className=''>
                <AnimatePresence>
                  {currentAlbum?.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <motion.div
                        key={song._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className={`grid grid-cols-[16px_4fr_2fr_1fr_auto] gap-4 px-6 py-3 text-sm 
                        text-zinc-400 hover:bg-white/5 group cursor-pointer relative
                        ${isCurrentSong ? 'bg-blue-500/10' : ''}`}
                      >
                        {/* Song Index/Play Indicator */}
                        <div className='flex items-center justify-center'>
                          {isCurrentSong && isPlaying ? (
                            <motion.div 
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 0.6 }}
                              className='size-4 text-blue-500'
                            >
                              ♫
                            </motion.div>
                          ) : (
                            <span className='group-hover:hidden'>{index + 1}</span>
                          )}
                          {!isCurrentSong && (
                            <Play 
                              onClick={() => handlePlaySong(index)}
                              className='h-4 w-4 hidden group-hover:block' 
                            />
                          )}
                        </div>

                        {/* Song Details */}
                        <div 
                          onClick={() => handlePlaySong(index)}
                          className='flex items-center gap-3'
                        >
                          <img 
                            src={song.imageUrl} 
                            alt={song.title} 
                            className='size-10 rounded object-cover' 
                          />
                          <div>
                            <div className={`font-medium text-white ${isCurrentSong ? 'text-blue-400' : ''}`}>
                              {song.title}
                            </div>
                            <div>{song.artist}</div>
                          </div>
                        </div>

                        <div className='flex items-center'>{song.createdAt.split("T")[0]}</div>
                        <div className='flex items-center'>{formatDuration(song.duration)}</div>

                        {/* Song Options */}
                        <div className='relative'>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => toggleSongOptions(song._id)}
                            className='text-zinc-400 hover:text-white'
                          >
                            <MoreVertical className='h-4 w-4' />
                          </motion.button>

                          <AnimatePresence>
                            {showOptions === song._id && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className='absolute right-0 top-full z-50 mt-2 
                                bg-black/80 backdrop-blur-md rounded-md shadow-xl'
                              >
                                <div className='flex flex-col p-2'>
                                  <button 
                                    className='flex items-center gap-2 px-3 py-2 
                                    text-sm text-white hover:bg-white/10 rounded'
                                  >
                                    <Download className='h-4 w-4' /> Download
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;