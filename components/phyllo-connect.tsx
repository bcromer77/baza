"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface PhylloConnectProps {
  sdkToken: string;
  onSuccess?: (account_id: string, work_platform_id: string, user_id: string) => void;
  onAccountConnected?: (account_id: string) => void;
  onError?: (error: any) => void;
  onExit?: () => void;
}

declare global {
  interface Window {
    PhylloConnect: any;
  }
}

export default function PhylloConnect({
  sdkToken,
  onSuccess,
  onAccountConnected,
  onError,
  onExit,
}: PhylloConnectProps) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [phylloConnect, setPhylloConnect] = useState<any>(null);

  useEffect(() => {
    if (isScriptLoaded && !phylloConnect && window.PhylloConnect) {
      const connect = window.PhylloConnect.initialize({
        sdkToken,
        onSuccess: (account_id, work_platform_id, user_id) => {
          console.log("✅ Success!", { account_id, work_platform_id, user_id });
          onSuccess?.(account_id, work_platform_id, user_id);
        },
        onAccountConnected: (account_id) => {
          console.log("Account connected:", account_id);
          onAccountConnected?.(account_id);
        },
        onError: (error) => {
          console.error("Something went wrong:", error);
          onError?.(error);
        },
        onExit: () => {
          console.log("User exited the flow");
          onExit?.();
        },
      });

      setPhylloConnect(connect);
    }
  }, [isScriptLoaded, sdkToken, onSuccess, onAccountConnected, onError, onExit, phylloConnect]);

  const openConnect = () => {
    if (phylloConnect) {
      phylloConnect.open();
    } else {
      console.error("PhylloConnect is not initialized yet");
    }
  };

  return (
    <>
      <Script
        src="https://cdn.getphyllo.com/connect/v2/phyllo-connect.js"
        onLoad={() => setIsScriptLoaded(true)}
        strategy="lazyOnload"
      />
      <button
        onClick={openConnect}
        className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium transition-all hover:shadow-lg"
      >
        Connect Your Creator Account
      </button>
    </>
  );
}

