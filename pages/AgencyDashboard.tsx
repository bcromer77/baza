import { useState } from 'react';
import { VideoPlayer } from '../components/VideoPlayer';
import { TimestampList } from '../components/TimestampList';
import { useVideoAnalysis } from '../hooks/useVideoAnalysis';
import { exportToExcel } from '../utils/export';
import { Video, Creator } from '../types';

export default function AgencyDashboard() {
  // TEMP: Mocked video and creator
  const selectedVideo: Video = {
    id: "video1",
    creatorId: "creator1",
    platform: "YouTube",
    url: "/sample-video.mp4", // Add a sample video file to your public folder
    title: "Lisbon Retreat Recap",
    duration: 300,
    thumbnailUrl: "/thumbnail.jpg",
    timestamps: [],
    metrics: {
      views: 12000,
      likes: 850,
      comments: 120,
    },
  };

  const selectedCreator: Creator = {
    id: "creator1",
    name: "Elena Wellness",
    platforms: ["YouTube", "Instagram"],
    image: "/elena.jpg",
    metrics: {
      followers: 54000,
      engagement: 6.2,
      riskScore: 0.2,
    },
  };

  const { timestamps, loading, error, addTimestamp } = useVideoAnalysis(selectedVideo.id);

  const handleExport = async () => {
    const exportData = {
      video: selectedVideo,
      creator: selectedCreator,
      timestamps,
    };

    await exportToExcel(exportData);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Agency Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <VideoPlayer video={selectedVideo} onAddTimestamp={addTimestamp} />
          </div>
          <div>
            <TimestampList timestamps={timestamps} onExport={handleExport} />
          </div>
        </div>
      </div>
    </div>
  );
}

