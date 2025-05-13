"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Shortlist = () => {
  return (
    <Card className="mb-6 p-4">
      <h3 className="text-lg font-semibold mb-2">Your Shortlist</h3>
      <ul className="text-sm text-muted-foreground mb-4">
        <li>• @bigdropmama</li>
        <li>• @lisbonsurfer</li>
        <li>• @skincarezen</li>
      </ul>
      <Button variant="outline">Export List</Button>
    </Card>
  );
};

export default Shortlist;

