import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; // Assumes you've initialized Firestore here
import { collection, query, where, getDocs } from "firebase/firestore";

const SearchCreators = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (search.length < 2) return;

    const fetchResults = async () => {
      const q = query(
        collection(db, "creators"),
        where("mentions", "array-contains", search.toLowerCase())
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data());
      setResults(data);
    };

    fetchResults();
  }, [search]);

  return (
    <div className="w-full mb-6">
      <Input
        placeholder="Search creators by interest, region, or quote…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />
      <ul className="mt-4 space-y-2">
        {results.map((creator, idx) => (
          <li key={idx} className="text-sm">{creator.handle} – {creator.region}</li>
        ))}
      </ul>
    </div>
  );
};

