// components/TimestampList.tsx
import { VideoTimestamp } from '../types';
import { formatDistance } from 'date-fns';

interface TimestampListProps {
  timestamps: VideoTimestamp[];
  onExport: () => void;
}

export const TimestampList: React.FC<TimestampListProps> = ({ timestamps, onExport }) => {
  return (
    <div className="bg-zinc-900 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Timestamps</h3>
        <button
          onClick={onExport}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Export
        </button>
      </div>
      <div className="space-y-2">
        {timestamps.map(timestamp => (
          <div
            key={timestamp.id}
            className="flex items-center justify-between bg-zinc-800 p-3 rounded"
          >
            <div>
              <span className="text-sm text-zinc-400">
                {Math.floor(timestamp.time / 60)}:{Math.floor(timestamp.time % 60).toString().padStart(2, '0')}
              </span>
              <p className="text-white">{timestamp.note}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-sm ${
                timestamp.category === 'risk' ? 'bg-red-500' :
                timestamp.category === 'trend' ? 'bg-blue-500' :
                'bg-green-500'
              }`}>
                {timestamp.category}
              </span>
              <span className="text-sm text-zinc-400">
                {formatDistance(new Date(timestamp.createdAt), new Date(), { addSuffix: true })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
