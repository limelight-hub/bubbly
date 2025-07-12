"use client";

import React from "react";

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";

export function SocketIndicator() {
  const { isConnected } = useSocket();

return (
    <Badge
      variant="outline"
      className={`border-none flex items-center gap-1 ${
        isConnected ? "bg-emerald-600" : "bg-yellow-600"
      } text-white`}
    >
      <Circle className="w-2 h-2 fill-current" />
      {isConnected ? "Live: Real-time updates" : "Fallback: Polling every 1s"}
    </Badge>
  );
}
