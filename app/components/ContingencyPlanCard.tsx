'use client';

import { CheckCircle2, XCircle, Clock, DollarSign, TrendingUp, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ContingencyPlan {
  id: string;
  disruptionId: string;
  title: string;
  description: string;
  estimatedCost: string;
  estimatedTime: string;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'proposed' | 'approved' | 'executing' | 'completed';
  votes: { approve: number; reject: number };
}

interface ContingencyPlanCardProps {
  plan: ContingencyPlan;
}

export function ContingencyPlanCard({ plan }: ContingencyPlanCardProps) {
  const riskColors = {
    low: 'bg-success/10 text-success',
    medium: 'bg-warning/10 text-warning',
    high: 'bg-danger/10 text-danger',
  };

  const statusColors = {
    proposed: 'bg-primary/10 text-primary',
    approved: 'bg-success/10 text-success',
    executing: 'bg-warning/10 text-warning',
    completed: 'bg-success text-white',
  };

  return (
    <div className="glass-effect rounded-lg p-6 hover:shadow-lg transition-all duration-200 border border-fg/10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-fg">{plan.title}</h3>
          <p className="text-sm text-fg/60 mt-1">{plan.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[plan.status]}`}>
          {plan.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-fg/60" />
          <div>
            <p className="text-xs text-fg/60">Cost</p>
            <p className="text-sm font-medium text-fg">{plan.estimatedCost}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-fg/60" />
          <div>
            <p className="text-xs text-fg/60">Time</p>
            <p className="text-sm font-medium text-fg">{plan.estimatedTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-fg/60" />
          <div>
            <p className="text-xs text-fg/60">Risk</p>
            <p className={`text-sm font-medium ${riskColors[plan.riskLevel].split(' ')[1]}`}>
              {plan.riskLevel}
            </p>
          </div>
        </div>
      </div>

      {plan.status === 'proposed' && (
        <>
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2 text-success">
              <ThumbsUp className="w-4 h-4" />
              <span>{plan.votes.approve} approve</span>
            </div>
            <div className="flex items-center gap-2 text-danger">
              <ThumbsDown className="w-4 h-4" />
              <span>{plan.votes.reject} reject</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 rounded-lg bg-success text-white text-sm font-medium hover:bg-success/90 transition-colors duration-200 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Approve
            </button>
            <button className="flex-1 px-4 py-2 rounded-lg bg-danger text-white text-sm font-medium hover:bg-danger/90 transition-colors duration-200 flex items-center justify-center gap-2">
              <XCircle className="w-4 h-4" />
              Reject
            </button>
          </div>
        </>
      )}

      {plan.status === 'approved' && (
        <button className="w-full px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-accent transition-colors duration-200">
          Execute Plan
        </button>
      )}

      {plan.status === 'executing' && (
        <div className="flex items-center gap-3 text-sm text-warning">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-warning"></div>
          <span>Executing plan...</span>
        </div>
      )}

      {plan.status === 'completed' && (
        <div className="flex items-center gap-2 text-sm text-success">
          <CheckCircle2 className="w-4 h-4" />
          <span>Plan completed successfully</span>
        </div>
      )}
    </div>
  );
}
