import React, { useEffect, useState } from 'react';
import { getHistory, getStats } from '../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Activity, Database, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyData, statsData] = await Promise.all([
          getHistory(),
          getStats()
        ]);
        setHistory(historyData);
        setStats(statsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[60vh]">
        <div className="animate-spin text-primary">
          <Activity size={48} />
        </div>
      </div>
    );
  }

  const doughnutData = {
    labels: ['Authentic', 'Fabricated'],
    datasets: [{
      data: [stats?.total_real || 0, stats?.total_fake || 0],
      backgroundColor: ['#10B981', '#EF4444'],
      borderColor: ['#0B0F19', '#0B0F19'],
      borderWidth: 4,
    }]
  };

  const doughnutOptions = {
    plugins: {
      legend: { position: 'bottom', labels: { color: '#E2E8F0', padding: 20 } }
    },
    cutout: '75%',
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 pt-4 pb-16 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Analytics Dashboard</h1>
        <p className="text-dark-muted">Overview of all analyzed articles and texts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="glass-card p-6 border-t-2 border-t-primary">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-dark-muted mb-1 font-medium">Total Analyzed</p>
              <h3 className="text-3xl font-bold text-white">{stats?.total_analyzed || 0}</h3>
            </div>
            <div className="p-3 bg-primary/10 text-primary rounded-lg">
              <Database size={24} />
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6 border-t-2 border-t-success">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-dark-muted mb-1 font-medium">Authentic Found</p>
              <h3 className="text-3xl font-bold text-success">{stats?.total_real || 0}</h3>
            </div>
            <div className="p-3 bg-success/10 text-success rounded-lg">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 border-t-2 border-t-danger">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-dark-muted mb-1 font-medium">Fabricated Found</p>
              <h3 className="text-3xl font-bold text-danger">{stats?.total_fake || 0}</h3>
            </div>
            <div className="p-3 bg-danger/10 text-danger rounded-lg">
              <AlertTriangle size={24} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 border-t-2 border-t-primary-light">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-dark-muted mb-1 font-medium">Avg Confidence</p>
              <h3 className="text-3xl font-bold text-primary-light">
                {((stats?.avg_confidence || 0) * 100).toFixed(1)}%
              </h3>
            </div>
            <div className="p-3 bg-primary-light/10 text-primary-light rounded-lg">
              <Activity size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Doughnut Chart */}
        <div className="glass-card p-6 lg:col-span-1 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-white mb-6 w-full text-left">Distribution</h3>
          <div className="w-64 h-64">
             <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        {/* Recent History Table */}
        <div className="glass-card p-6 lg:col-span-2 overflow-hidden flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Analysis History</h3>
          <div className="overflow-x-auto flex-grow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-dark-border text-dark-muted text-sm">
                  <th className="pb-3 font-medium px-4">Content Snippet</th>
                  <th className="pb-3 font-medium px-4">Verdict</th>
                  <th className="pb-3 font-medium px-4">Confidence</th>
                  <th className="pb-3 font-medium px-4 text-right">Time</th>
                </tr>
              </thead>
              <tbody>
                {history.slice(0, 10).map((record) => (
                  <tr key={record.id} className="border-b border-dark-border/50 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 text-sm text-gray-300">
                      <div className="max-w-[250px] truncate" title={record.text}>
                        {record.url ? <span className="text-primary mr-2">[URL]</span> : null}
                        {record.text || record.url}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        record.prediction === 'REAL' ? 'bg-success/10 text-success border border-success/20' : 'bg-danger/10 text-danger border border-danger/20'
                      }`}>
                        {record.prediction === 'REAL' ? 'Authentic' : 'Fabricated'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium">
                      {(record.confidence * 100).toFixed(1)}%
                    </td>
                    <td className="py-4 px-4 text-sm text-dark-muted text-right flex items-center justify-end gap-1.5">
                      <Clock size={14} />
                      {new Date(record.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {history.length === 0 && (
              <div className="text-center py-10 text-dark-muted text-sm italic">
                No articles analyzed yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
