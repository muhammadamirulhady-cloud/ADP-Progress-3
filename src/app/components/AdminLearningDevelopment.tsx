import { useState } from 'react';
import { TrendingUp, LogOut, MessageSquare, AlertCircle, CheckCircle, X, ThumbsUp, ThumbsDown, Calendar, Filter, BarChart3, Lightbulb, ArrowLeft, Users, Eye, FileText, Activity, Brain as BrainIcon, Clock, UserCheck, UserCog } from 'lucide-react';
import { Header } from './Header';
import { UserActivityDashboard } from './analytics/UserActivityDashboard';
import { VisitorTrackingAnalytics } from './analytics/VisitorTrackingAnalytics';
import { ManagementReporting } from './analytics/ManagementReporting';
import { CustomerBehaviourAnalysis } from './analytics/CustomerBehaviourAnalysis';
import { ComplaintPatternDetection } from './analytics/ComplaintPatternDetection';
import { ServiceRequestAnalysis } from './analytics/ServiceRequestAnalysis';
import { FAQTrendForecasting } from './analytics/FAQTrendForecasting';
import { PeakHourPrediction } from './analytics/PeakHourPrediction';
import { ServiceDemandForecasting } from './analytics/ServiceDemandForecasting';

interface AdminLearningDevelopmentProps {
  onBackToKiosk: () => void;
  onBackToHub?: () => void;
}

interface InteractionLog {
  id: string;
  timestamp: string;
  userQuestion: string;
  botResponse: string;
  confidence: 'high' | 'medium' | 'low';
  wasHelpful: boolean | null;
  category: string;
}

interface SuggestedKnowledge {
  id: string;
  question: string;
  frequency: number;
  suggestedAnswerEn: string;
  suggestedAnswerMs: string;
  suggestedCategory: string;
  keywords: string[];
  status: 'pending' | 'approved' | 'rejected';
}

interface AnalyticsMetric {
  label: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

type AnalyticsView = 'overview' | 'user-activity' | 'visitor-tracking' | 'management-reporting' | 'customer-behaviour' | 'complaint-pattern' | 'service-request' | 'faq-forecast' | 'peak-hour' | 'service-demand';

export function AdminLearningDevelopment({ onBackToKiosk, onBackToHub }: AdminLearningDevelopmentProps) {
  const [activeTab, setActiveTab] = useState<'logs' | 'analytics' | 'suggestions'>('analytics');
  const [filterConfidence, setFilterConfidence] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [dateRange, setDateRange] = useState('7days');
  const [selectedSuggestion, setSelectedSuggestion] = useState<SuggestedKnowledge | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [analyticsView, setAnalyticsView] = useState<AnalyticsView>('overview');

  // Mock interaction logs
  const [interactionLogs] = useState<InteractionLog[]>([
    {
      id: 'INT-001',
      timestamp: '2024-06-05 14:23:45',
      userQuestion: 'How do I renew my business license?',
      botResponse: 'Business license renewal can be done online or at our office. Visit the Licensing Department with your documents.',
      confidence: 'high',
      wasHelpful: true,
      category: 'Licensing',
    },
    {
      id: 'INT-002',
      timestamp: '2024-06-05 14:18:30',
      userQuestion: 'What time does the office close on Friday?',
      botResponse: 'Our office hours are Monday to Friday, 8:00 AM to 5:00 PM.',
      confidence: 'high',
      wasHelpful: true,
      category: 'Operating Hours',
    },
    {
      id: 'INT-003',
      timestamp: '2024-06-05 13:55:12',
      userQuestion: 'Can I pay my assessment tax online?',
      botResponse: 'Yes, we accept online banking and e-wallet payments.',
      confidence: 'medium',
      wasHelpful: true,
      category: 'Assessment Tax',
    },
    {
      id: 'INT-004',
      timestamp: '2024-06-05 13:42:08',
      userQuestion: 'Where can I get a dog license?',
      botResponse: 'Thank you for your question. Our team is processing your inquiry.',
      confidence: 'low',
      wasHelpful: false,
      category: 'Unknown',
    },
    {
      id: 'INT-005',
      timestamp: '2024-06-05 12:30:55',
      userQuestion: 'How to apply for parking permit?',
      botResponse: 'Thank you for your question. Our team is processing your inquiry.',
      confidence: 'low',
      wasHelpful: null,
      category: 'Unknown',
    },
    {
      id: 'INT-006',
      timestamp: '2024-06-05 11:15:20',
      userQuestion: 'What documents needed for renovation permit?',
      botResponse: 'Submit renovation permit application with architectural plans, structural engineer approval, and property ownership documents.',
      confidence: 'high',
      wasHelpful: true,
      category: 'Permits',
    },
    {
      id: 'INT-007',
      timestamp: '2024-06-05 10:45:33',
      userQuestion: 'Is there a discount for early tax payment?',
      botResponse: 'Thank you for your question. Our team is processing your inquiry.',
      confidence: 'low',
      wasHelpful: false,
      category: 'Unknown',
    },
  ]);

  // Mock suggested knowledge entries
  const [suggestions, setSuggestions] = useState<SuggestedKnowledge[]>([
    {
      id: 'SUG-001',
      question: 'Where can I get a dog license?',
      frequency: 12,
      suggestedAnswerEn: 'Dog licenses can be obtained at the Public Health Department. Required documents: vaccination certificate, proof of residence, and pet registration form. Fee: RM30 per year.',
      suggestedAnswerMs: 'Lesen anjing boleh diperolehi di Jabatan Kesihatan Awam. Dokumen diperlukan: sijil vaksinasi, bukti kediaman, dan borang pendaftaran haiwan. Yuran: RM30 setahun.',
      suggestedCategory: 'Licensing',
      keywords: ['dog', 'pet', 'license', 'anjing', 'haiwan', 'lesen'],
      status: 'pending',
    },
    {
      id: 'SUG-002',
      question: 'How to apply for parking permit?',
      frequency: 8,
      suggestedAnswerEn: 'Parking permits are available for residents and businesses. Submit application at Counter Services with vehicle registration, IC, and proof of address. Processing time: 3-5 working days.',
      suggestedAnswerMs: 'Permit parkir tersedia untuk penduduk dan perniagaan. Kemukakan permohonan di Kaunter Perkhidmatan dengan pendaftaran kenderaan, IC, dan bukti alamat. Masa pemprosesan: 3-5 hari bekerja.',
      suggestedCategory: 'Permits',
      keywords: ['parking', 'permit', 'vehicle', 'parkir', 'permit', 'kenderaan'],
      status: 'pending',
    },
    {
      id: 'SUG-003',
      question: 'Is there a discount for early tax payment?',
      frequency: 15,
      suggestedAnswerEn: 'Yes! Early payment discount of 5% is available if you pay your full annual assessment tax before January 31st each year.',
      suggestedAnswerMs: 'Ya! Diskaun pembayaran awal sebanyak 5% tersedia jika anda membayar cukai taksiran tahunan penuh sebelum 31 Januari setiap tahun.',
      suggestedCategory: 'Assessment Tax',
      keywords: ['discount', 'early payment', 'tax', 'diskaun', 'pembayaran awal', 'cukai'],
      status: 'pending',
    },
  ]);

  // Analytics metrics
  const analyticsMetrics: AnalyticsMetric[] = [
    { label: 'Total Interactions (7 days)', value: 247, trend: 'up', color: 'bg-blue-500' },
    { label: 'High Confidence Responses', value: 182, trend: 'up', color: 'bg-green-500' },
    { label: 'Low Confidence Responses', value: 42, trend: 'down', color: 'bg-red-500' },
    { label: 'Unanswered Questions', value: 23, trend: 'down', color: 'bg-yellow-500' },
  ];

  const topQuestions = [
    { question: 'Operating hours inquiry', count: 45 },
    { question: 'Assessment tax payment', count: 38 },
    { question: 'Business license application', count: 32 },
    { question: 'Parking permit', count: 28 },
    { question: 'Renovation permit documents', count: 24 },
  ];

  const categories = ['All', 'Licensing', 'Operating Hours', 'Assessment Tax', 'Permits', 'Unknown'];

  const analyticsModules = [
    // User Statistics
    { id: 'user-activity', title: 'User Activity', titleMs: 'Aktiviti Pengguna', icon: UserCheck, color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600', module: 'User Statistics' },
    { id: 'visitor-tracking', title: 'Visitor Tracking', titleMs: 'Penjejakan Pelawat', icon: Users, color: 'bg-green-500', hoverColor: 'hover:bg-green-600', module: 'User Statistics' },
    { id: 'management-reporting', title: 'Management Reports', titleMs: 'Laporan Pengurusan', icon: UserCog, color: 'bg-purple-500', hoverColor: 'hover:bg-purple-600', module: 'User Statistics' },
    // Pattern Recognition
    { id: 'customer-behaviour', title: 'Customer Behaviour', titleMs: 'Tingkah Laku Pelanggan', icon: Activity, color: 'bg-orange-500', hoverColor: 'hover:bg-orange-600', module: 'Pattern Recognition' },
    { id: 'complaint-pattern', title: 'Complaint Patterns', titleMs: 'Corak Aduan', icon: AlertCircle, color: 'bg-red-500', hoverColor: 'hover:bg-red-600', module: 'Pattern Recognition' },
    { id: 'service-request', title: 'Service Requests', titleMs: 'Permintaan Perkhidmatan', icon: MessageSquare, color: 'bg-indigo-500', hoverColor: 'hover:bg-indigo-600', module: 'Pattern Recognition' },
    // Predictive Forecasting
    { id: 'faq-forecast', title: 'FAQ Trends', titleMs: 'Trend Soalan Lazim', icon: BrainIcon, color: 'bg-teal-500', hoverColor: 'hover:bg-teal-600', module: 'Predictive Forecasting' },
    { id: 'peak-hour', title: 'Peak Hour Prediction', titleMs: 'Ramalan Waktu Puncak', icon: Clock, color: 'bg-pink-500', hoverColor: 'hover:bg-pink-600', module: 'Predictive Forecasting' },
    { id: 'service-demand', title: 'Service Demand', titleMs: 'Permintaan Perkhidmatan', icon: TrendingUp, color: 'bg-cyan-500', hoverColor: 'hover:bg-cyan-600', module: 'Predictive Forecasting' },
  ];

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredLogs = interactionLogs.filter((log) => {
    const matchesConfidence = filterConfidence === 'All' || log.confidence === filterConfidence.toLowerCase();
    const matchesCategory = filterCategory === 'All' || log.category === filterCategory;
    return matchesConfidence && matchesCategory;
  });

  const handleApproveSuggestion = (id: string) => {
    setSuggestions(suggestions.map((s) => (s.id === id ? { ...s, status: 'approved' } : s)));
    setShowDetailModal(false);
  };

  const handleRejectSuggestion = (id: string) => {
    setSuggestions(suggestions.map((s) => (s.id === id ? { ...s, status: 'rejected' } : s)));
    setShowDetailModal(false);
  };

  const viewSuggestionDetail = (suggestion: SuggestedKnowledge) => {
    setSelectedSuggestion(suggestion);
    setShowDetailModal(true);
  };

  return (
    <div className="size-full bg-slate-50 flex flex-col h-screen overflow-hidden">
      <Header />

      <div className="bg-[#1B2A4A] py-4 px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl text-white flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-[#C9A84C]" />
            Admin Dashboard: Learning & Development
          </h1>
          <div className="flex gap-3">
            {onBackToHub && (
              <button
                onClick={onBackToHub}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-[16px] transition-all duration-200 active:scale-95 flex items-center gap-2 border border-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
                Admin Hub
              </button>
            )}
            <button
              onClick={onBackToKiosk}
              className="bg-[#C9A84C] hover:bg-[#B8973B] text-white px-6 py-3 rounded-[16px] transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Back to Kiosk
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b-2 border-slate-200 px-8">
        <div className="max-w-7xl mx-auto flex gap-2">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-8 py-4 text-lg font-bold transition-all border-b-4 ${
              activeTab === 'analytics'
                ? 'border-[#C9A84C] text-[#C9A84C]'
                : 'border-transparent text-slate-600 hover:text-[#1B2A4A]'
            }`}
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Analytics & Insights
            </div>
          </button>
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`px-8 py-4 text-lg font-bold transition-all border-b-4 ${
              activeTab === 'suggestions'
                ? 'border-[#C9A84C] text-[#C9A84C]'
                : 'border-transparent text-slate-600 hover:text-[#1B2A4A]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Suggested Improvements ({suggestions.filter((s) => s.status === 'pending').length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-8 py-4 text-lg font-bold transition-all border-b-4 ${
              activeTab === 'logs'
                ? 'border-[#C9A84C] text-[#C9A84C]'
                : 'border-transparent text-slate-600 hover:text-[#1B2A4A]'
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Interaction Logs
            </div>
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-8">
        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="max-w-7xl mx-auto space-y-8">
            {analyticsView === 'overview' ? (
              <>
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {analyticsMetrics.map((metric, idx) => (
                    <div key={idx} className="bg-white rounded-[24px] shadow-lg border-2 border-slate-100 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-3 h-3 rounded-full ${metric.color}`}></div>
                        <div className="flex items-center gap-1 text-sm">
                          {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                          {metric.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
                        </div>
                      </div>
                      <p className="text-4xl font-bold text-[#1B2A4A] mb-2">{metric.value}</p>
                      <p className="text-sm text-slate-600">{metric.label}</p>
                    </div>
                  ))}
                </div>

                {/* Analytics & Insight Modules */}
                <div className="bg-white rounded-[24px] shadow-lg border-2 border-slate-100 p-8">
                  <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6 flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-[#C9A84C]" />
                    Analytics & Insight
                  </h2>

                  {/* User Statistics */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-[#1B2A4A] mb-4">User Statistics</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {analyticsModules.filter(m => m.module === 'User Statistics').map((module) => {
                        const IconComponent = module.icon;
                        return (
                          <button
                            key={module.id}
                            onClick={() => setAnalyticsView(module.id as AnalyticsView)}
                            className={`${module.color} ${module.hoverColor} text-white rounded-[16px] p-6 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg`}
                          >
                            <div className="flex flex-col items-center gap-3">
                              <IconComponent className="w-12 h-12" strokeWidth={1.5} />
                              <div className="text-center">
                                <div className="text-lg font-bold mb-1">{module.title}</div>
                                <div className="text-sm opacity-90">{module.titleMs}</div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pattern Recognition */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-[#1B2A4A] mb-4">Pattern Recognition</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {analyticsModules.filter(m => m.module === 'Pattern Recognition').map((module) => {
                        const IconComponent = module.icon;
                        return (
                          <button
                            key={module.id}
                            onClick={() => setAnalyticsView(module.id as AnalyticsView)}
                            className={`${module.color} ${module.hoverColor} text-white rounded-[16px] p-6 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg`}
                          >
                            <div className="flex flex-col items-center gap-3">
                              <IconComponent className="w-12 h-12" strokeWidth={1.5} />
                              <div className="text-center">
                                <div className="text-lg font-bold mb-1">{module.title}</div>
                                <div className="text-sm opacity-90">{module.titleMs}</div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Predictive Forecasting */}
                  <div>
                    <h3 className="text-xl font-bold text-[#1B2A4A] mb-4">Predictive Forecasting</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {analyticsModules.filter(m => m.module === 'Predictive Forecasting').map((module) => {
                        const IconComponent = module.icon;
                        return (
                          <button
                            key={module.id}
                            onClick={() => setAnalyticsView(module.id as AnalyticsView)}
                            className={`${module.color} ${module.hoverColor} text-white rounded-[16px] p-6 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg`}
                          >
                            <div className="flex flex-col items-center gap-3">
                              <IconComponent className="w-12 h-12" strokeWidth={1.5} />
                              <div className="text-center">
                                <div className="text-lg font-bold mb-1">{module.title}</div>
                                <div className="text-sm opacity-90">{module.titleMs}</div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Top Questions */}
                <div className="bg-white rounded-[24px] shadow-lg border-2 border-slate-100 p-8">
                  <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6 flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-[#C9A84C]" />
                    Most Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {topQuestions.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="bg-[#C9A84C] text-white rounded-[12px] w-12 h-12 flex items-center justify-center font-bold text-lg">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-semibold text-slate-800">{item.question}</p>
                        </div>
                        <div className="bg-slate-100 px-4 py-2 rounded-[12px]">
                          <p className="text-xl font-bold text-[#1B2A4A]">{item.count} times</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insights and Recommendations */}
                <div className="bg-white rounded-[24px] shadow-lg border-2 border-slate-100 p-8">
                  <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6 flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-[#C9A84C]" />
                    AI-Generated Insights
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-green-50 border-2 border-green-200 rounded-[16px] p-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-green-800 mb-2">Strong Performance Areas</h3>
                          <p className="text-green-700">
                            Operating hours and licensing questions have 95% high-confidence responses with positive feedback.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-[16px] p-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-yellow-600 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-yellow-800 mb-2">Improvement Opportunity</h3>
                          <p className="text-yellow-700">
                            Pet licensing questions (12 occurrences) have low confidence. Recommend adding dedicated knowledge entry.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-[16px] p-6">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-6 h-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-blue-800 mb-2">Recommended Actions</h3>
                          <ul className="text-blue-700 space-y-2">
                            <li>• Review 3 pending suggested knowledge entries</li>
                            <li>• Add FAQ section for parking permits (8 low-confidence responses)</li>
                            <li>• Update assessment tax entry with early payment discount information</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Back Button */}
                <button
                  onClick={() => setAnalyticsView('overview')}
                  className="bg-white hover:bg-slate-50 text-[#1B2A4A] px-6 py-3 rounded-[16px] transition-all duration-200 active:scale-95 flex items-center gap-2 border-2 border-slate-200 shadow-sm"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Analytics Overview
                </button>

                {/* Render Analytics Component */}
                <div className="bg-white rounded-[24px] shadow-lg border-2 border-slate-100 p-8">
                  {analyticsView === 'user-activity' && <UserActivityDashboard />}
                  {analyticsView === 'visitor-tracking' && <VisitorTrackingAnalytics />}
                  {analyticsView === 'management-reporting' && <ManagementReporting />}
                  {analyticsView === 'customer-behaviour' && <CustomerBehaviourAnalysis />}
                  {analyticsView === 'complaint-pattern' && <ComplaintPatternDetection />}
                  {analyticsView === 'service-request' && <ServiceRequestAnalysis />}
                  {analyticsView === 'faq-forecast' && <FAQTrendForecasting />}
                  {analyticsView === 'peak-hour' && <PeakHourPrediction />}
                  {analyticsView === 'service-demand' && <ServiceDemandForecasting />}
                </div>
              </>
            )}
          </div>
        )}

        {/* Suggestions Tab */}
        {activeTab === 'suggestions' && (
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-[24px] shadow-lg border-2 border-slate-100 p-8">
              <h2 className="text-2xl font-bold text-[#1B2A4A] mb-6">
                AI-Generated Knowledge Suggestions (Based on Interaction Analysis)
              </h2>
              <div className="space-y-4">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className={`border-2 rounded-[16px] p-6 transition-all ${
                      suggestion.status === 'pending'
                        ? 'border-slate-200 bg-white'
                        : suggestion.status === 'approved'
                        ? 'border-green-200 bg-green-50'
                        : 'border-red-200 bg-red-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm font-bold text-slate-500">{suggestion.id}</span>
                          <span
                            className={`px-3 py-1 rounded-[8px] text-sm font-bold ${
                              suggestion.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : suggestion.status === 'approved'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {suggestion.status.charAt(0).toUpperCase() + suggestion.status.slice(1)}
                          </span>
                          <span className="px-3 py-1 bg-[#C9A84C]/20 text-[#C9A84C] rounded-[8px] text-sm font-bold">
                            Asked {suggestion.frequency} times
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">{suggestion.question}</h3>
                        <p className="text-slate-600 mb-2">
                          <span className="font-semibold">Suggested Category:</span> {suggestion.suggestedCategory}
                        </p>
                        <p className="text-slate-700 line-clamp-2">{suggestion.suggestedAnswerEn}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        {suggestion.status === 'pending' && (
                          <>
                            <button
                              onClick={() => viewSuggestionDetail(suggestion)}
                              className="bg-[#1B2A4A] hover:bg-[#2A4070] text-white px-6 py-2 rounded-[12px] transition-all duration-200 active:scale-95 font-bold"
                            >
                              Review
                            </button>
                            <button
                              onClick={() => handleApproveSuggestion(suggestion.id)}
                              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-[12px] transition-all duration-200 active:scale-95 font-bold flex items-center gap-2"
                            >
                              <ThumbsUp className="w-4 h-4" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectSuggestion(suggestion.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-[12px] transition-all duration-200 active:scale-95 font-bold flex items-center gap-2"
                            >
                              <ThumbsDown className="w-4 h-4" />
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Interaction Logs Tab */}
        {activeTab === 'logs' && (
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-[24px] shadow-lg border-2 border-slate-100 p-8">
              {/* Filters */}
              <div className="flex gap-4 mb-6 pb-6 border-b-2 border-slate-100">
                <div className="relative">
                  <select
                    value={filterConfidence}
                    onChange={(e) => setFilterConfidence(e.target.value)}
                    className="appearance-none px-6 py-3 pr-10 text-lg border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C] bg-white cursor-pointer"
                  >
                    <option value="All">All Confidence Levels</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="appearance-none px-6 py-3 pr-10 text-lg border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C] bg-white cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === 'All' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                  <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="appearance-none px-6 py-3 pr-10 text-lg border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C] bg-white cursor-pointer"
                  >
                    <option value="24hours">Last 24 Hours</option>
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                  </select>
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Logs Table */}
              <div className="space-y-4">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="border-2 border-slate-200 rounded-[16px] p-6 hover:border-[#C9A84C] transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-500">{log.id}</span>
                        <span
                          className={`px-3 py-1 rounded-[8px] text-sm font-bold border-2 ${getConfidenceColor(
                            log.confidence
                          )}`}
                        >
                          {log.confidence.charAt(0).toUpperCase() + log.confidence.slice(1)} Confidence
                        </span>
                        <span className="text-sm text-slate-500">{log.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {log.wasHelpful === true && <ThumbsUp className="w-5 h-5 text-green-500" />}
                        {log.wasHelpful === false && <ThumbsDown className="w-5 h-5 text-red-500" />}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">User Question:</p>
                        <p className="text-lg text-slate-800">{log.userQuestion}</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">Bot Response:</p>
                        <p className="text-base text-slate-700 bg-slate-50 p-4 rounded-[12px]">{log.botResponse}</p>
                      </div>
                      <div>
                        <span className="px-3 py-1 bg-[#1B2A4A]/10 text-[#1B2A4A] rounded-[8px] text-sm font-semibold">
                          {log.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Suggestion Detail Modal */}
      {showDetailModal && selectedSuggestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[24px] shadow-2xl max-w-4xl w-full p-10 relative animate-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowDetailModal(false)}
              className="absolute top-6 right-6 p-2 rounded-[12px] hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>

            <h2 className="text-3xl font-bold text-[#1B2A4A] mb-8 border-b-2 border-slate-100 pb-4">
              Review Suggested Knowledge Entry
            </h2>

            <div className="space-y-6">
              <div className="bg-[#C9A84C]/10 border-2 border-[#C9A84C] rounded-[16px] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-[#C9A84C]" />
                  <p className="text-lg font-bold text-[#1B2A4A]">
                    This question was asked {selectedSuggestion.frequency} times with low confidence responses
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-[#1B2A4A] mb-3">Question</label>
                <div className="bg-slate-50 px-6 py-4 text-xl rounded-[16px] border-2 border-slate-200">
                  {selectedSuggestion.question}
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-[#1B2A4A] mb-3">Suggested Category</label>
                <div className="bg-slate-50 px-6 py-4 text-xl rounded-[16px] border-2 border-slate-200">
                  {selectedSuggestion.suggestedCategory}
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-[#1B2A4A] mb-3">AI-Generated Answer (English)</label>
                <div className="bg-slate-50 px-6 py-4 text-lg rounded-[16px] border-2 border-slate-200">
                  {selectedSuggestion.suggestedAnswerEn}
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-[#1B2A4A] mb-3">
                  AI-Generated Answer (Malay / Bahasa Malaysia)
                </label>
                <div className="bg-slate-50 px-6 py-4 text-lg rounded-[16px] border-2 border-slate-200">
                  {selectedSuggestion.suggestedAnswerMs}
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-[#1B2A4A] mb-3">Suggested Keywords</label>
                <div className="flex flex-wrap gap-2">
                  {selectedSuggestion.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-[#C9A84C]/20 text-[#C9A84C] rounded-[12px] text-base font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => handleApproveSuggestion(selectedSuggestion.id)}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-[16px] transition-all duration-200 active:scale-95 text-xl font-bold flex items-center justify-center gap-2"
              >
                <ThumbsUp className="w-5 h-5" />
                Approve & Add to Knowledge Base
              </button>
              <button
                onClick={() => handleRejectSuggestion(selectedSuggestion.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-[16px] transition-all duration-200 active:scale-95 text-xl font-bold flex items-center justify-center gap-2"
              >
                <ThumbsDown className="w-5 h-5" />
                Reject Suggestion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
