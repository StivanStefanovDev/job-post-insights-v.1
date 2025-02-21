'use client';

import { useEffect, useState } from 'react';
import { Analytics, fetchAnalytics } from '../api/api';
import { 
  ChartBarIcon, 
  BriefcaseIcon, 
  AcademicCapIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Home() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics()
      .then(setAnalytics)
      .catch(err => setError(err.message));
  }, []);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-dark-400">
      <div className="bg-dark-200 p-6 rounded-lg border border-red-500/20 backdrop-blur-lg">
        <h3 className="text-red-400 font-semibold">Error</h3>
        <p className="text-red-300">{error}</p>
      </div>
    </div>
  );

  if (!analytics) return (
    <div className="min-h-screen flex items-center justify-center bg-dark-400">
      <div className="relative">
        <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary opacity-30 blur animate-gradient"></div>
        <div className="relative animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary"></div>
      </div>
    </div>
  );

  // Prepare chart data
  const skillsChartData = {
    labels: analytics.top_skills.slice(0, 10).map(item => item.skill),
    datasets: [{
      label: 'Skill Demand',
      data: analytics.top_skills.slice(0, 10).map(item => item.count),
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    }]
  };

  const jobTypesChartData = {
    labels: analytics.job_types.map(item => item.job_type),
    datasets: [{
      data: analytics.job_types.map(item => item.count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    }]
  };

  return (
    <main className="min-h-screen bg-dark-400 p-8 text-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 relative">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary opacity-20 blur-lg"></div>
          <div className="relative">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary text-transparent bg-clip-text">
              Job Market Analytics Dashboard
            </h1>
            <p className="text-gray-400">Real-time insights into the job market trends and demands</p>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "Total Skills Analyzed",
              value: analytics.top_skills.length,
              icon: ChartBarIcon,
              color: "primary"
            },
            {
              title: "Job Types Available",
              value: analytics.job_types.length,
              icon: BriefcaseIcon,
              color: "secondary"
            },
            {
              title: "Companies Hiring",
              value: analytics.top_companies.length,
              icon: BuildingOfficeIcon,
              color: "tertiary"
            }
          ].map((card, index) => (
            <div key={index} className="group relative animate-float" style={{ animationDelay: `${index * 200}ms` }}>
              <div className={`absolute -inset-0.5 bg-accent-${card.color} opacity-20 rounded-xl blur group-hover:opacity-30 transition duration-300`}></div>
              <div className="relative bg-dark-200 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition duration-300">
                <div className="flex items-center gap-4">
                  <div className={`bg-accent-${card.color}/10 p-3 rounded-lg group-hover:scale-110 transition duration-300`}>
                    <card.icon className={`h-6 w-6 text-accent-${card.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{card.title}</p>
                    <p className="text-xl font-semibold text-gray-100">{card.value}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Skills Chart */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-accent-primary opacity-20 rounded-xl blur group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-dark-200 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition duration-300">
              <h2 className="text-xl font-semibold mb-6 text-gray-100">Top 10 In-Demand Skills</h2>
              <Bar 
                data={{
                  ...skillsChartData,
                  datasets: [{
                    ...skillsChartData.datasets[0],
                    backgroundColor: 'rgba(59, 130, 246, 0.3)',
                    borderColor: 'rgba(59, 130, 246, 0.8)',
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                      titleColor: '#fff',
                      bodyColor: '#fff',
                      borderColor: 'rgba(59, 130, 246, 0.2)',
                      borderWidth: 1,
                    }
                  },
                  scales: {
                    y: { 
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(75, 85, 99, 0.2)',
                      },
                      ticks: { color: '#9ca3af' }
                    },
                    x: {
                      grid: {
                        color: 'rgba(75, 85, 99, 0.2)',
                      },
                      ticks: { color: '#9ca3af' }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Job Types Distribution */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-accent-secondary opacity-20 rounded-xl blur group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-dark-200 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition duration-300">
              <h2 className="text-xl font-semibold mb-6 text-gray-100">Job Types Distribution</h2>
              <Doughnut 
                data={{
                  ...jobTypesChartData,
                  datasets: [{
                    ...jobTypesChartData.datasets[0],
                    backgroundColor: [
                      'rgba(59, 130, 246, 0.5)',
                      'rgba(16, 185, 129, 0.5)',
                      'rgba(139, 92, 246, 0.5)',
                      'rgba(244, 63, 94, 0.5)',
                    ],
                    borderColor: [
                      'rgba(59, 130, 246, 0.8)',
                      'rgba(16, 185, 129, 0.8)',
                      'rgba(139, 92, 246, 0.8)',
                      'rgba(244, 63, 94, 0.8)',
                    ],
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { 
                      position: 'bottom',
                      labels: { color: '#9ca3af' }
                    },
                    tooltip: {
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                      titleColor: '#fff',
                      bodyColor: '#fff',
                      borderColor: 'rgba(16, 185, 129, 0.2)',
                      borderWidth: 1,
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Detailed Lists Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Top Companies",
              icon: BuildingOfficeIcon,
              data: analytics.top_companies.slice(0, 5),
              color: "primary",
              keyField: "company",
            },
            {
              title: "Top Cities",
              icon: MapPinIcon,
              data: analytics.top_search_cities.slice(0, 5),
              color: "secondary",
              keyField: "city",
            },
            {
              title: "Common Keywords",
              icon: ChatBubbleBottomCenterTextIcon,
              data: analytics.top_summary_words.slice(0, 5),
              color: "tertiary",
              keyField: "word",
            }
          ].map((section, index) => (
            <div key={index} className="relative group">
              <div className={`absolute -inset-0.5 bg-accent-${section.color} opacity-20 rounded-xl blur group-hover:opacity-30 transition duration-300`}></div>
              <div className="relative bg-dark-200 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <section.icon className={`h-5 w-5 text-accent-${section.color}`} />
                  <h2 className="text-xl font-semibold text-gray-100">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.data.map((item: any) => (
                    <li key={item[section.keyField]} className="flex justify-between items-center p-2 hover:bg-dark-100/50 rounded transition duration-300">
                      <span className="text-gray-300">{item[section.keyField]}</span>
                      <span className={`bg-accent-${section.color}/10 text-accent-${section.color} px-2 py-1 rounded-full text-sm`}>
                        {item.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}