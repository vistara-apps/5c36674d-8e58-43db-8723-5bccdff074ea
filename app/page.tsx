'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, Package, Globe, Bell, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { DisruptionCard } from './components/DisruptionCard';
import { ContingencyPlanCard } from './components/ContingencyPlanCard';
import { AppShell } from './components/AppShell';
import { StatsCard } from './components/StatsCard';

interface Disruption {
  id: string;
  type: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  timestamp: string;
  impactedAssets: number;
  status: 'active' | 'resolved' | 'monitoring';
}

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

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'disruptions' | 'plans'>('dashboard');
  const [disruptions, setDisruptions] = useState<Disruption[]>([]);
  const [plans, setPlans] = useState<ContingencyPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setDisruptions([
        {
          id: '1',
          type: 'Port Congestion',
          severity: 'high',
          description: 'Major congestion at Shanghai Port affecting 15 shipments',
          timestamp: new Date().toISOString(),
          impactedAssets: 15,
          status: 'active',
        },
        {
          id: '2',
          type: 'Weather Event',
          severity: 'medium',
          description: 'Tropical storm approaching Southeast Asia routes',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          impactedAssets: 8,
          status: 'monitoring',
        },
      ]);

      setPlans([
        {
          id: '1',
          disruptionId: '1',
          title: 'Alternative Port Route',
          description: 'Reroute shipments through Busan Port with expedited customs',
          estimatedCost: '$45,000',
          estimatedTime: '3-5 days',
          riskLevel: 'low',
          status: 'proposed',
          votes: { approve: 3, reject: 0 },
        },
        {
          id: '2',
          disruptionId: '1',
          title: 'Air Freight Upgrade',
          description: 'Convert critical shipments to air freight for faster delivery',
          estimatedCost: '$120,000',
          estimatedTime: '1-2 days',
          riskLevel: 'medium',
          status: 'proposed',
          votes: { approve: 1, reject: 2 },
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const stats = {
    activeDisruptions: disruptions.filter(d => d.status === 'active').length,
    totalAssets: disruptions.reduce((sum, d) => sum + d.impactedAssets, 0),
    pendingPlans: plans.filter(p => p.status === 'proposed').length,
    resolvedToday: 5,
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-bg">
        {/* Header */}
        <header className="glass-effect border-b border-fg/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-fg">SupplyChainGPT</h1>
                  <p className="text-sm text-fg/60">AI-Powered Supply Chain Intelligence</p>
                </div>
              </div>
              <button className="relative p-2 rounded-lg hover:bg-surface/50 transition-colors duration-200">
                <Bell className="w-5 h-5 text-fg" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-2 border-b border-fg/10">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'disruptions', label: 'Disruptions', icon: AlertTriangle },
              { id: 'plans', label: 'Plans', icon: Package },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-fg/60 hover:text-fg'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <div className="space-y-6 animate-fade-in">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                      title="Active Disruptions"
                      value={stats.activeDisruptions}
                      icon={AlertTriangle}
                      trend="+2 from yesterday"
                      variant="danger"
                    />
                    <StatsCard
                      title="Impacted Assets"
                      value={stats.totalAssets}
                      icon={Package}
                      trend="Across 3 regions"
                      variant="warning"
                    />
                    <StatsCard
                      title="Pending Plans"
                      value={stats.pendingPlans}
                      icon={Clock}
                      trend="Awaiting approval"
                      variant="primary"
                    />
                    <StatsCard
                      title="Resolved Today"
                      value={stats.resolvedToday}
                      icon={CheckCircle2}
                      trend="95% success rate"
                      variant="success"
                    />
                  </div>

                  {/* Recent Disruptions */}
                  <div>
                    <h2 className="text-xl font-bold text-fg mb-4">Recent Disruptions</h2>
                    <div className="space-y-4">
                      {disruptions.slice(0, 2).map((disruption) => (
                        <DisruptionCard key={disruption.id} disruption={disruption} />
                      ))}
                    </div>
                  </div>

                  {/* Proposed Plans */}
                  <div>
                    <h2 className="text-xl font-bold text-fg mb-4">Proposed Contingency Plans</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {plans.slice(0, 2).map((plan) => (
                        <ContingencyPlanCard key={plan.id} plan={plan} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'disruptions' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-fg">All Disruptions</h2>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 rounded-lg bg-surface text-fg text-sm hover:bg-surface/80 transition-colors duration-200">
                        Filter
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-accent transition-colors duration-200">
                        Export
                      </button>
                    </div>
                  </div>
                  {disruptions.map((disruption) => (
                    <DisruptionCard key={disruption.id} disruption={disruption} />
                  ))}
                </div>
              )}

              {activeTab === 'plans' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-fg">Contingency Plans</h2>
                    <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-accent transition-colors duration-200">
                      Generate New Plan
                    </button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {plans.map((plan) => (
                      <ContingencyPlanCard key={plan.id} plan={plan} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </AppShell>
  );
}
