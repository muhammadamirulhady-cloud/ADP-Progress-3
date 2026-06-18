import { useState, useRef, useEffect } from 'react';
import { Send, Users } from 'lucide-react';
import { Header } from './Header';
import { AdminAccessButton } from './AdminAccessButton';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface AskQuestionScreenProps {
  onBack: () => void;
  onNavigateToQueue: () => void;
  onAdminAccess?: () => void;
}

export function AskQuestionScreen({ onBack, onNavigateToQueue, onAdminAccess }: AskQuestionScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm here to help answer your questions about municipal services.\n\nHalo! Saya di sini untuk membantu menjawab soalan anda tentang perkhidmatan perbandaran.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickReplies = [
    { en: "Licensing fees", ms: "Yuran lesen" },
    { en: "Office hours", ms: "Waktu pejabat" },
    { en: "Payment methods", ms: "Kaedah pembayaran" }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputValue('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: "Thank you for your question. Our team is processing your inquiry.\n\nTerima kasih atas soalan anda. Pasukan kami sedang memproses pertanyaan anda.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleQuickReply = (reply: { en: string; ms: string }) => {
    const quickReplyMessage: Message = {
      id: messages.length + 1,
      text: reply.en,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, quickReplyMessage]);

    // Simulate bot response based on quick reply
    setTimeout(() => {
      let response = '';
      if (reply.en === 'Licensing fees') {
        response = "Business licensing fees vary by business type. Please visit our Licensing Counter or check our website for specific rates.\n\nYuran lesen perniagaan berbeza mengikut jenis perniagaan. Sila lawati Kaunter Pelesenan kami atau semak laman web kami untuk kadar tertentu.";
      } else if (reply.en === 'Office hours') {
        response = "Our office hours are Monday to Friday, 8:00 AM to 5:00 PM. Closed on weekends and public holidays.\n\nWaktu pejabat kami ialah Isnin hingga Jumaat, 8:00 pagi hingga 5:00 petang. Tutup pada hujung minggu dan cuti umum.";
      } else if (reply.en === 'Payment methods') {
        response = "We accept cash, debit/credit cards, online banking, and e-wallet payments.\n\nKami menerima tunai, kad debit/kredit, perbankan dalam talian, dan pembayaran e-dompet.";
      }

      const botResponse: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="size-full bg-white flex flex-col">
      <Header showBackButton onBack={onBack} />

      {/* Main Content */}
      <main className="flex-1 flex p-6 overflow-hidden">
        <div className="max-w-5xl w-full flex flex-col mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl flex flex-col flex-1 overflow-hidden border-2 border-slate-100">
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-4 min-h-0">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl rounded-[16px] px-6 py-5 ${
                      message.sender === 'user'
                        ? 'bg-[#1B2A4A] text-white'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <p className="text-xl whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="px-8 py-3 border-t border-slate-200 flex-shrink-0">
                <p className="text-lg text-slate-600 mb-2">Quick questions / Soalan pantas:</p>
                <div className="flex flex-wrap gap-3">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="bg-[#C9A84C]/10 hover:bg-[#C9A84C]/20 text-[#1B2A4A] px-6 py-3 rounded-[16px] text-lg transition-colors border-2 border-[#C9A84C] active:scale-95"
                    >
                      {reply.en} / {reply.ms}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-5 border-t border-slate-200 bg-slate-50 flex-shrink-0">
              <div className="flex gap-4 mb-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question / Taip soalan anda..."
                  className="flex-1 px-6 py-5 text-xl border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                />
                <button
                  onClick={handleSend}
                  className="bg-[#C9A84C] hover:bg-[#B8973B] text-white px-10 py-5 rounded-[16px] transition-colors active:scale-95 flex items-center gap-3"
                >
                  <Send className="w-7 h-7" />
                  <span className="text-xl">Send</span>
                </button>
              </div>

              {/* Queue Number Button */}
              <button
                onClick={onNavigateToQueue}
                className="w-full bg-[#1B2A4A] hover:bg-[#2A3A5A] text-white py-5 rounded-[16px] transition-colors active:scale-95 flex items-center justify-center gap-4"
              >
                <Users className="w-7 h-7" />
                <div className="text-center">
                  <div className="text-xl">Still need help? Take a Queue Number</div>
                  <div className="text-lg opacity-90">Masih perlukan bantuan? Ambil Nombor Giliran</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Footer with Admin Access */}
      <footer className="bg-[#1B2A4A] text-white py-6 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1"></div>
          <div className="text-center flex-1">
            <p className="text-lg text-white/60">For assistance, please contact the counter / Untuk bantuan, sila hubungi kaunter</p>
          </div>
          <div className="flex-1 flex justify-end">
            {onAdminAccess && <AdminAccessButton onClick={onAdminAccess} />}
          </div>
        </div>
      </footer>
    </div>
  );
}
