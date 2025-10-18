'use client';

import { type LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
}

export function StatsCard({ title, value, icon: Icon, trend, variant = 'primary' }: StatsCardProps) {
  const variantColors = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger',
  };

  return (
    <div className="glass-effect rounded-lg p-6 hover:shadow-lg transition-all duration-200 border border-fg/10">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${variantColors[variant]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <h3 className="text-3xl font-bold text-fg mb-1">{value}</h3>
      <p className="text-sm text-fg/60 mb-2">{title}</p>
      {trend && (
        <p className="text-xs text-fg/40">{trend}</p>
      )}
    </div>
  );
}
