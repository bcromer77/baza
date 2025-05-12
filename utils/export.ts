// utils/export.ts
import * as XLSX from 'xlsx';
import { VideoTimestamp, Video, Creator } from '../types';

interface ExportData {
  video: Video;
  creator: Creator;
  timestamps: VideoTimestamp[];
}

export const exportToExcel = (data: ExportData) => {
  const worksheetData = data.timestamps.map(timestamp => ({
    'Video Title': data.video.title,
    'Creator': data.creator.name,
    'Platform': data.video.platform,
    'Timestamp': `${Math.floor(timestamp.time / 60)}:${Math.floor(timestamp.time % 60).toString().padStart(2, '0')}`,
    'Note': timestamp.note,
    'Category': timestamp.category,
    'Sentiment': timestamp.sentiment,
    'Created At': new Date(timestamp.createdAt).toLocaleString(),
    'Created By': timestamp.createdBy,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Timestamps');
  
  // Export to Excel file
  XLSX.writeFile(workbook, `${data.video.title}_timestamps.xlsx`);
};

export const exportToGoogleSheets = async (data: ExportData) => {
  // Implement Google Sheets API integration
  // This would require OAuth2 authentication and Google Sheets API setup
};
