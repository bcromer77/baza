// hooks/useVideoAnalysis.ts
import { useState, useEffect } from 'react';

export const useVideoAnalysis = (videoId: string) => {
  const [loading, setLoading] = useState(true);
  const [timestamps, setTimestamps] = useState<VideoTimestamp[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimestamps = async () => {
      try {
        const response = await fetch(`/api/videos/${videoId}/timestamps`);
        const data = await response.json();
        setTimestamps(data);
      } catch (err) {
        setError('Failed to fetch timestamps');
      } finally {
        setLoading(false);
      }
    };

    fetchTimestamps();
  }, [videoId]);

  const addTimestamp = async (timestamp: Omit<VideoTimestamp, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch(`/api/videos/${videoId}/timestamps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(timestamp),
      });
      const newTimestamp = await response.json();
      setTimestamps(prev => [...prev, newTimestamp]);
      return newTimestamp;
    } catch (err) {
      setError('Failed to add timestamp');
      throw err;
    }
  };

  return { timestamps, loading, error, addTimestamp };
};
