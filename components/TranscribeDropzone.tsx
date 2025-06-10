"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Player } from "@lottiefiles/react-lottie-player";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface Props {
  userId: string;
}

export default function TranscribeDropzone({ userId }: Props) {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      setUploaded(false);
      setError("");

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", userId);
        formData.append("videoTitle", file.name);
        formData.append("videoId", file.name);

        const res = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          setUploaded(true);
        } else {
          const err = await res.json();
          setError(err?.message || "Upload failed.");
        }
      } catch (err) {
        console.error("Upload error:", err);
        setError("Unexpected error occurred.");
      } finally {
        setUploading(false);
      }
    },
    [userId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"],
    },
    maxSize: 500 * 1024 * 1024, // 500MB
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl p-6 text-center bg-white shadow-md transition duration-300
        ${isDragActive ? "border-blue-600" : "border-gray-400 hover:border-blue-500"}
      `}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <div className="flex flex-col items-center">
          <Player
            autoplay
            loop
            src="https://lottie.host/43a1789d-509f-4b7e-9080-c91bced42bdf/ZFNj9yOaX8.json"
            style={{ height: "140px" }}
          />
          <p className="text-blue-500 font-medium mt-2">
            Transcribing your video…
          </p>
        </div>
      ) : uploaded ? (
        <div className="flex flex-col items-center">
          <CheckCircle2 className="text-green-600" size={48} />
          <p className="text-green-600 font-semibold mt-2">
            Transcript is processing!
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center">
          <AlertCircle className="text-red-500" size={36} />
          <p className="text-red-500 mt-2">{error}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-gray-600">
            Drag & drop your <strong>.mp4</strong> or <strong>.mov</strong>{" "}
            video here (max 500MB), or click to select.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            You must first download your video from YouTube Studio —{" "}
            <span className="underline text-blue-600">this keeps it compliant</span>.
          </p>
        </div>
      )}
    </div>
  );
}

