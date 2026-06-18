import React from 'react';
import { useState } from 'react';
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
import { FeedbackScreen } from './components/FeedbackScreen';

type Screen = 'home' | 'ask-question' | 'queue' | 'appointment' | 'complaint' | 'feedback' | 'queue-manager' | 'admin-hub' | 'admin-appointments' | 'admin-complaints' | 'admin-chatbot-knowledge' | 'admin-learning';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const menuItems = [
    {
      icon: MessageSquare,
      titleEn: "Ask a Question",
      titleMs: "Tanya Soalan",
      color: "bg-[#C9A84C] hover:bg-[#B8973B]",
      screen: 'ask-question' as Screen
    },
    {
      icon: Hash,
      titleEn: "Get Queue Number",
      titleMs: "Dapatkan Nombor Giliran",
      color: "bg-[#C9A84C] hover:bg-[#B8973B]",
      screen: 'queue' as Screen
    },
    {
      icon: Calendar,
      titleEn: "Book Appointment",
      titleMs: "Tempah Temu Janji",
      color: "bg-[#C9A84C] hover:bg-[#B8973B]",
      screen: 'appointment' as Screen
    },
    {
      icon: FileText,
      titleEn: "Submit Complaint",
      titleMs: "Hantar Aduan",
      color: "bg-[#C9A84C] hover:bg-[#B8973B]",
      screen: 'complaint' as Screen
    },
    {
      icon: MessageCircle,
      titleEn: "Give Feedback",
      titleMs: "Beri Maklum Balas",
      color: "bg-[#C9A84C] hover:bg-[#B8973B]",
      screen: 'feedback' as Screen
    }
  ];

  if (currentScreen === 'ask-question') {
    return (
      <AskQuestionScreen
        onBack={() => setCurrentScreen('home')}
        onNavigateToQueue={() => setCurrentScreen('queue')}
        onAdminAccess={() => setCurrentScreen('admin-hub')}
      />
    );
  }

  if (currentScreen === 'queue') {
    return (
      <QueueScreen
        onBack={() => setCurrentScreen('home')}
      />
    );
  }

  if (currentScreen === 'complaint') {
    return (
      <SubmitComplaintScreen
        onBack={() => setCurrentScreen('home')}
        onAdminAccess={() => setCurrentScreen('admin-hub')}
      />
    );
  }

  if (currentScreen === 'appointment') {
    return (
      <BookAppointmentScreen
        onBack={() => setCurrentScreen('home')}
        onAdminAccess={() => setCurrentScreen('admin-hub')}
      />
    );
  }

  if (currentScreen === 'queue-manager') {
    return <QueueManagerScreen onBackToKiosk={() => setCurrentScreen('home')} />;
  }

  if (currentScreen === 'feedback') {
  return <FeedbackScreen onBack={() => setCurrentScreen('home')} />;
}

  if (currentScreen === 'admin-hub') {
    return (
      <AdminPortalHub
        onBackToKiosk={() => setCurrentScreen('home')}
        onNavigateToAppointments={() => setCurrentScreen('admin-appointments')}
        onNavigateToComplaints={() => setCurrentScreen('admin-complaints')}
        onNavigateToChatbotKnowledge={() => setCurrentScreen('admin-chatbot-knowledge')}
        onNavigateToLearning={() => setCurrentScreen('admin-learning')}
      />
    );
  }

  if (currentScreen === 'admin-appointments') {
    return (
      <AdminAppointmentDashboard
        onBackToKiosk={() => setCurrentScreen('home')}
        onBackToHub={() => setCurrentScreen('admin-hub')}
      />
    );
  }

  if (currentScreen === 'admin-complaints') {
    return (
      <AdminComplaintDashboard
        onBackToKiosk={() => setCurrentScreen('home')}
        onBackToHub={() => setCurrentScreen('admin-hub')}
      />
    );
  }

  if (currentScreen === 'admin-chatbot-knowledge') {
    return (
      <AdminChatbotKnowledgeManager
        onBackToKiosk={() => setCurrentScreen('home')}
        onBackToHub={() => setCurrentScreen('admin-hub')}
      />
    );
  }

  if (currentScreen === 'admin-learning') {
    return (
      <AdminLearningDevelopment
        onBackToKiosk={() => setCurrentScreen('home')}
        onBackToHub={() => setCurrentScreen('admin-hub')}
      />
    );
  }

  return (
    <div className="size-full bg-white flex flex-col">
      <Header />

      <NoticeCarousel />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-6xl w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-12 border-2 border-slate-100">
            <div className="text-center mb-12">
              <h2 className="text-4xl mb-3 text-[#1B2A4A]">Welcome / Selamat Datang</h2>
              <p className="text-2xl text-slate-600">Please select a service / Sila pilih perkhidmatan</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {menuItems.slice(0, 4).map((item, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentScreen(item.screen)}
                  className={`${item.color} text-white rounded-[16px] p-10 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl`}
                >
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

            {/* Single centered button for the 5th item */}
            <div className="mt-8 flex justify-center">
              {(() => {
                const FifthIcon = menuItems[4].icon;
                return (
                  <button
                    onClick={() => setCurrentScreen(menuItems[4].screen)}
                    className={`${menuItems[4].color} text-white rounded-[16px] p-10 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl w-1/2`}
                  >
                    <div className="flex flex-col items-center gap-5">
                      <FifthIcon className="w-24 h-24" strokeWidth={1.5} />
                      <div className="text-center">
                        <div className="text-3xl mb-2">{menuItems[4].titleEn}</div>
                        <div className="text-2xl opacity-90">{menuItems[4].titleMs}</div>
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