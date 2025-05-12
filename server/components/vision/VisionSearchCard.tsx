import Image from 'next/image';

export function VisionSearchCard({ creatorId, imagePath, explanation }) {
  return (
    <div className="rounded-xl shadow-xl p-4 bg-white space-y-4">
      <Image src={imagePath} alt={creatorId} width={300} height={300} className="rounded-lg" />
      <p className="text-lg font-medium">Here’s why this creator matches:</p>
      <p className="text-gray-600">{explanation}</p>
      <button className="bg-black text-white py-2 px-4 rounded">Book This Creator</button>
    </div>
  );
}

