// components/VideoPlayer.tsx
import { useState, useRef } from 'react';
import { Video, VideoTimestamp } from '../types';

interface VideoPlayerProps {
  video: Video;
  onAddTimestamp: (timestamp: Omit<VideoTimestamp, 'id' | 'createdAt'>) => Promise<void>;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onAddTimestamp }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleAddTimestamp = () => {
    if (videoRef.current) {
      onAddTimestamp({
        videoId: video.id,
        time: videoRef.current.currentTime,
        note: '',
        sentiment: 0,
        category: 'insight',
        createdBy: 'current-user', // Replace with actual user ID
      });
    }
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={video.url}
        className="w-full rounded-lg"
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => videoRef.current?.play()}
            className="bg-white text-black px-4 py-2 rounded"
          >
            {playing ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={handleAddTimestamp}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Timestamp
          </button>
          <span className="text-white">
            {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};
