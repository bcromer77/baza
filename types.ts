// types.ts
export interface Creator {
  id: string;
  name: string;
  platforms: string[];
  image: string;
  metrics: {
    followers: number;
    engagement: number;
    riskScore: number;
  };
}

export interface VideoTimestamp {
  id: string;
  videoId: string;
  time: number;
  note: string;
  sentiment: number;
  category: 'risk' | 'trend' | 'insight';
  createdAt: Date;
  createdBy: string;
}

export interface Video {
  id: string;
  creatorId: string;
  platform: string;
  url: string;
  title: string;
  duration: number;
  thumbnailUrl: string;
  timestamps: VideoTimestamp[];
  metrics: {
    views: number;
    likes: number;
    comments: number;
  };
}
