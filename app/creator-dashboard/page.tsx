'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CreatorDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [creatorId, setCreatorId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get('id');
    setCreatorId(id);
  }, [searchParams]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Creator Dashboard</h1>
      <p className="mt-4 text-sm text-gray-600">Creator ID: 
{creatorId}</p>
    </div>
  );
}

