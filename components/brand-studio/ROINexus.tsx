"use client";

import { BarChart4 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ROINexus = () => {
  return (
    <Card className="mb-6 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-lg font-medium">
          <BarChart4 className="h-5 w-5 text-green-500" />
          ROI Nexus
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Avg ROI of your shortlisted creators: <strong>2.8x</strong>
        </p>
        <div className="mt-3 text-xs text-muted-foreground">
          High performers: @bigdropmama, @zenlifecoach
        </div>
      </CardContent>
    </Card>
  );
};

export default ROINexus;

