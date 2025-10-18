'use client';

import { AlertTriangle, MapPin, Clock, TrendingUp } from 'lucide-react';

interface Disruption {
  id: string;
  type: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  timestamp: string;
  impactedAssets: number;
  status: 'active' | 'resolved' | 'monitoring';
}

interface DisruptionCardProps {
  disruption: Disruption;
}

export function DisruptionCard({ disruption }: DisruptionCardProps) {
  const severityColors = {
    high: 'bg-danger/10 text-danger border-danger/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    low: 'bg-success/10 text-success border-success/20',
  };

  const statusColors = {
    active: 'bg-danger text-white',
    monitoring: 'bg-warning text-white',
    resolved: 'bg-success text-white',
  };

  const timeAgo = (timestamp: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <div className="glass-effect rounded-lg p-6 hover:shadow-lg transition-all duration-200 border border-fg/10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${severityColors[disruption.severity]}`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-fg">{disruption.type}</h3>
            <p className="text-sm text-fg/60 mt-1">{disruption.description}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[disruption.status]}`}>
          {disruption.status}
        </span>
      </div>

      <div className="flex items-center gap-6 text-sm text-fg/60">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{timeAgo(disruption.timestamp)}</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          <span>{disruption.impactedAssets} assets impacted</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-fg/10 flex gap-2">
        <button className="flex-1 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-accent transition-colors duration-200">
          View Details
        </button>
        <button className="flex-1 px-4 py-2 rounded-lg bg-surface text-fg text-sm font-medium hover:bg-surface/80 transition-colors duration-200">
          Generate Plans
        </button>
      </div>
    </div>
  );
}
