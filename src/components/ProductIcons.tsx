import React from "react";

export function SmartBmsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

export function VibrationPadsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 8c1.5 0 2-2 3.5-2s2 2 3.5 2 2-2 3.5-2 2 2 3.5 2 2-2 3.5-2 2 2 3.5 2" />
      <path d="M2 13c1.5 0 2-2 3.5-2s2 2 3.5 2 2-2 3.5-2 2 2 3.5 2 2-2 3.5-2 2 2 3.5 2" />
      <path d="M2 18c1.5 0 2-2 3.5-2s2 2 3.5 2 2-2 3.5-2 2 2 3.5 2 2-2 3.5-2 2 2 3.5 2" />
    </svg>
  );
}

export function RemoteAssistanceIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M14 2a8 8 0 0 1 8 8" />
      <path d="M14 6a4 4 0 0 1 4 4" />
    </svg>
  );
}

export function TemperatureSensorsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      <line x1="11.5" y1="7" x2="11.5" y2="12" />
    </svg>
  );
}

export function Ip67RatingIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      <path d="M12 12v6" />
      <path d="m9 15 3 3 3-3" />
    </svg>
  );
}

export function BluetoothIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
    </svg>
  );
}

export function GprsTrackerIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
    </svg>
  );
}

export function ConnectorsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="6" width="8" height="12" rx="1" />
      <rect x="14" y="6" width="8" height="12" rx="1" />
      <line x1="10" y1="10" x2="14" y2="10" strokeWidth="2.5" />
      <line x1="10" y1="14" x2="14" y2="14" strokeWidth="2.5" />
    </svg>
  );
}

export function FrGradeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

export function AluminiumCasingIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

export function ProductFeatureIcon({
  name,
  className = "w-5 h-5",
}: {
  name: string;
  className?: string;
}) {
  switch (name) {
    case "bms":
      return <SmartBmsIcon className={className} />;
    case "vibration":
      return <VibrationPadsIcon className={className} />;
    case "remote":
      return <RemoteAssistanceIcon className={className} />;
    case "temp":
      return <TemperatureSensorsIcon className={className} />;
    case "ip67":
      return <Ip67RatingIcon className={className} />;
    case "bluetooth":
      return <BluetoothIcon className={className} />;
    case "gprs":
      return <GprsTrackerIcon className={className} />;
    case "connectors":
      return <ConnectorsIcon className={className} />;
    case "frGrade":
      return <FrGradeIcon className={className} />;
    case "aluminium":
      return <AluminiumCasingIcon className={className} />;
    default:
      return <SmartBmsIcon className={className} />;
  }
}

