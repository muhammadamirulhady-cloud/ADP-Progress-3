import { Calendar, FileText, Brain, TrendingUp, LogOut, Shield } from 'lucide-react';
import { Header } from './Header';

interface AdminPortalHubProps {
  onBackToKiosk: () => void;
  onNavigateToAppointments: () => void;
  onNavigateToComplaints: () => void;
  onNavigateToChatbotKnowledge: () => void;
  onNavigateToLearning: () => void;
}

export function AdminPortalHub({
  onBackToKiosk,
  onNavigateToAppointments,
  onNavigateToComplaints,
  onNavigateToChatbotKnowledge,
  onNavigateToLearning,
}: AdminPortalHubProps) {
  const adminModules = [
    {
      icon: Calendar,
      title: 'Appointment Management',
      titleMs: 'Pengurusan Temu Janji',
      description: 'View appointment calendar and daily schedules',
      descriptionMs: 'Lihat kalendar temu janji dan jadual harian',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      onClick: onNavigateToAppointments,
    },
    {
      icon: FileText,
      title: 'Complaint Management',
      titleMs: 'Pengurusan Aduan',
      description: 'Review and update complaint statuses',
      descriptionMs: 'Semak dan kemas kini status aduan',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      onClick: onNavigateToComplaints,
    },
    {
      icon: Brain,
      title: 'Chatbot Knowledge Manager',
      titleMs: 'Pengurus Pengetahuan Chatbot',
      description: 'Manage chatbot knowledge base entries',
      descriptionMs: 'Urus entri pangkalan pengetahuan chatbot',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      onClick: onNavigateToChatbotKnowledge,
    },
    {
      icon: TrendingUp,
      title: 'Learning & Development',
      titleMs: 'Pembelajaran & Pembangunan',
      description: 'Analyze interactions and approve AI suggestions',
      descriptionMs: 'Analisis interaksi dan luluskan cadangan AI',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      onClick: onNavigateToLearning,
    },
  ];

  return (
    <div className="size-full bg-slate-50 flex flex-col h-screen overflow-hidden">
      <Header />

      <div className="bg-[#1B2A4A] py-6 px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[#C9A84C] p-3 rounded-[16px]">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl text-white font-bold">Administrator Portal</h1>
              <p className="text-lg text-white/80">Portal Pentadbir</p>
            </div>
          </div>
          <button
            onClick={onBackToKiosk}
            className="bg-[#C9A84C] hover:bg-[#B8973B] text-white px-6 py-3 rounded-[16px] transition-all duration-200 active:scale-95 flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Back to User Kiosk
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl w-full mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-3 text-[#1B2A4A]">Select Admin Module</h2>
            <p className="text-2xl text-slate-600">Pilih Modul Pentadbir</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {adminModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <button
                  key={index}
                  onClick={module.onClick}
                  className="bg-white rounded-[24px] p-10 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl border-2 border-slate-100 hover:border-[#C9A84C] group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`${module.color} ${module.hoverColor} w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}
                    >
                      <IconComponent className="w-12 h-12 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1B2A4A] mb-2">{module.title}</h3>
                    <p className="text-xl text-slate-500 mb-4">{module.titleMs}</p>
                    <div className="h-px w-24 bg-slate-200 mb-4"></div>
                    <p className="text-base text-slate-600">{module.description}</p>
                    <p className="text-sm text-slate-500">{module.descriptionMs}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-12 bg-white rounded-[24px] shadow-lg border-2 border-slate-100 p-8">
            <h3 className="text-xl font-bold text-[#1B2A4A] mb-6 text-center">System Overview</h3>
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-[#1B2A4A]">24</p>
                <p className="text-sm text-slate-600">Appointments Today</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-8 h-8 text-purple-500" />
                </div>
                <p className="text-3xl font-bold text-[#1B2A4A]">12</p>
                <p className="text-sm text-slate-600">Pending Complaints</p>
              </div>
              <div className="text-center">
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-[#1B2A4A]">87</p>
                <p className="text-sm text-slate-600">Knowledge Entries</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-3xl font-bold text-[#1B2A4A]">3</p>
                <p className="text-sm text-slate-600">Pending Suggestions</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#1B2A4A] text-white py-6 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg text-white/60">
            Authorized Personnel Only / Kakitangan Yang Diberi Kuasa Sahaja
          </p>
        </div>
      </footer>
    </div>
  );
}
