"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

const SearchCreators = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full mb-6">
      <Input
        placeholder="Search creators by interest, region, or quote…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default SearchCreators;

