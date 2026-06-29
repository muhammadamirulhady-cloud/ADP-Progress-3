import { useState } from 'react';
import { QueueProvider } from './context/QueueContext';
import { MessageSquare, Hash, Calendar, FileText, MessageCircle } from 'lucide-react';
import { AskQuestionScreen } from './components/AskQuestionScreen';
import { QueueScreen } from './components/QueueScreen';
import { SubmitComplaintScreen } from './components/SubmitComplaintScreen';
import { BookAppointmentScreen } from './components/BookAppointmentScreen';
import { QueueManagerScreen } from './components/QueueManagerScreen';
import { AdminAppointmentDashboard } from './components/AdminAppointmentDashboard';
import { AdminComplaintDashboard } from './components/AdminComplaintDashboard';
import { AdminChatbotKnowledgeManager } from './components/AdminChatbotKnowledgeManager';
import { AdminLearningDevelopment } from './components/AdminLearningDevelopment';
import { AdminPortalHub } from './components/AdminPortalHub';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NoticeCarousel } from './components/NoticeCarousel';

type Screen =
  | 'home' | 'ask-question' | 'queue' | 'appointment' | 'complaint' | 'feedback'
  | 'queue-manager' | 'admin-hub' | 'admin-appointments' | 'admin-complaints'
  | 'admin-chatbot-knowledge' | 'admin-learning';

// Inner component — always rendered inside QueueProvider
function AppScreens() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const nav = (screen: Screen) => () => setCurrentScreen(screen);

  if (currentScreen === 'ask-question') {
    return (
      <AskQuestionScreen
        onBack={nav('home')}
        onNavigateToQueue={nav('queue')}
        onAdminAccess={nav('admin-hub')}
      />
    );
  }

  if (currentScreen === 'queue') {
    return <QueueScreen onBack={nav('home')} />;
  }

  if (currentScreen === 'complaint') {
    return (
      <SubmitComplaintScreen
        onBack={nav('home')}
        onAdminAccess={nav('admin-hub')}
      />
    );
  }

  if (currentScreen === 'appointment') {
    return (
      <BookAppointmentScreen
        onBack={nav('home')}
        onAdminAccess={nav('admin-hub')}
      />
    );
  }

  if (currentScreen === 'queue-manager') {
    return <QueueManagerScreen onBackToKiosk={nav('home')} />;
  }

  if (currentScreen === 'admin-hub') {
    return (
      <AdminPortalHub
        onBackToKiosk={nav('home')}
        onNavigateToAppointments={nav('admin-appointments')}
        onNavigateToComplaints={nav('admin-complaints')}
        onNavigateToChatbotKnowledge={nav('admin-chatbot-knowledge')}
        onNavigateToLearning={nav('admin-learning')}
      />
    );
  }

  if (currentScreen === 'admin-appointments') {
    return (
      <AdminAppointmentDashboard
        onBackToKiosk={nav('home')}
        onBackToHub={nav('admin-hub')}
      />
    );
  }

  if (currentScreen === 'admin-complaints') {
    return (
      <AdminComplaintDashboard
        onBackToKiosk={nav('home')}
        onBackToHub={nav('admin-hub')}
      />
    );
  }

  if (currentScreen === 'admin-chatbot-knowledge') {
    return (
      <AdminChatbotKnowledgeManager
        onBackToKiosk={nav('home')}
        onBackToHub={nav('admin-hub')}
      />
    );
  }

  if (currentScreen === 'admin-learning') {
    return (
      <AdminLearningDevelopment
        onBackToKiosk={nav('home')}
        onBackToHub={nav('admin-hub')}
      />
    );
  }

  // ── Home screen ──────────────────────────────────────────────
  const menuItems = [
    { icon: MessageSquare, titleEn: "Ask a Question",     titleMs: "Tanya Soalan",             screen: 'ask-question' as Screen },
    { icon: Hash,          titleEn: "Get Queue Number",   titleMs: "Dapatkan Nombor Giliran",   screen: 'queue'        as Screen },
    { icon: Calendar,      titleEn: "Book Appointment",   titleMs: "Tempah Temu Janji",         screen: 'appointment'  as Screen },
    { icon: FileText,      titleEn: "Submit Complaint",   titleMs: "Hantar Aduan",              screen: 'complaint'    as Screen },
    { icon: MessageCircle, titleEn: "Give Feedback",      titleMs: "Beri Maklum Balas",         screen: 'feedback'     as Screen },
  ];

  const btnClass = "bg-[#C9A84C] hover:bg-[#B8973B] text-white rounded-[16px] p-10 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl";

  return (
    <div className="size-full bg-white flex flex-col">
      <Header />
      <NoticeCarousel />

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-6xl w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-12 border-2 border-slate-100">
            <div className="text-center mb-12">
              <h2 className="text-4xl mb-3 text-[#1B2A4A]">Welcome / Selamat Datang</h2>
              <p className="text-2xl text-slate-600">Please select a service / Sila pilih perkhidmatan</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {menuItems.slice(0, 4).map((item, index) => (
                <button key={index} onClick={() => setCurrentScreen(item.screen)} className={btnClass}>
                  <div className="flex flex-col items-center gap-5">
                    <item.icon className="w-24 h-24" strokeWidth={1.5} />
                    <div className="text-center">
                      <div className="text-3xl mb-2">{item.titleEn}</div>
                      <div className="text-2xl opacity-90">{item.titleMs}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              {(() => {
                const fifth = menuItems[4];
                return (
                  <button onClick={() => setCurrentScreen(fifth.screen)} className={`${btnClass} w-1/2`}>
                    <div className="flex flex-col items-center gap-5">
                      <fifth.icon className="w-24 h-24" strokeWidth={1.5} />
                      <div className="text-center">
                        <div className="text-3xl mb-2">{fifth.titleEn}</div>
                        <div className="text-2xl opacity-90">{fifth.titleMs}</div>
                      </div>
                    </div>
                  </button>
                );
              })()}
            </div>
          </div>
        </div>
      </main>

      <Footer
        onStaffLogin={() => setCurrentScreen('queue-manager')}
        onAdminPortal={() => setCurrentScreen('admin-hub')}
      />
    </div>
  );
}

// Root — QueueProvider wraps everything so useQueue() works in any screen
export default function App() {
  return (
    <QueueProvider>
      <AppScreens />
    </QueueProvider>
  );
}
