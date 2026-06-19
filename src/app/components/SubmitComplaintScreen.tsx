import { useState } from 'react';
import { FileText, CheckCircle, Home, Search, Clock } from 'lucide-react';
import { Header } from './Header';
import { AdminAccessButton } from './AdminAccessButton';

interface SubmitComplaintScreenProps {
  onBack: () => void;
  onAdminAccess?: () => void;
}

export function SubmitComplaintScreen({ onBack, onAdminAccess }: SubmitComplaintScreenProps) {
  const [viewMode, setViewMode] = useState<'select' | 'submit' | 'track'>('select');

  // Complaint Form State
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [fullName, setFullName] = useState('');
  const [icNumber, setIcNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [referenceNumber] = useState(`CMP-2024-${Math.floor(1000 + Math.random() * 9000)}`);

  // Track Status State
  const [trackRef, setTrackRef] = useState('');
  const [trackStatus, setTrackStatus] = useState<'idle' | 'found'>('idle');

  const categories = [
    { en: "Waste Management", ms: "Pengurusan Sisa" },
    { en: "Road/Drainage", ms: "Jalan/Longkang" },
    { en: "Public Nuisance", ms: "Kacau Ganggu Awam" },
    { en: "Others", ms: "Lain-lain" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category && description && fullName && icNumber && phoneNumber) {
      setShowSuccessModal(true);
    }
  };

  const handleTrackStatus = () => {
    if (trackRef) {
      setTrackStatus('found');
    }
  };

  const handleBack = () => {
    if (viewMode === 'select') {
      onBack(); // Go to Main Menu
    } else {
      setViewMode('select'); // Go back to choice menu
    }
  };

  return (
    <div className="size-full bg-slate-50 flex flex-col h-screen overflow-hidden">
      <Header showBackButton onBack={handleBack} />

      {/* FIX: Replaced uniform padding and added conditional flex centering for selection screen */}
      <main className={`flex-1 flex flex-col overflow-y-auto px-8 py-6 ${viewMode === 'select' ? 'justify-center' : ''}`}>
        
        {/* Selection Screen */}
        {viewMode === 'select' && (
          // FIX: Constrained vertical height to 70vh and applied a clean column flexbox layout structure
          <div className="max-w-5xl w-full mx-auto flex flex-col justify-center h-full max-h-[70vh] animate-in fade-in duration-300">
            {/* Reduced title margins from mb-12 to mb-6 */}
            <div className="text-center mb-6">
              <h2 className="text-4xl mb-2 text-[#1B2A4A] font-bold">Complaint Services</h2>
              <p className="text-xl text-slate-600">Perkhidmatan Aduan</p>
            </div>
            
            {/* Reduced card grid layout gap from gap-8 to gap-6 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setViewMode('submit')}
                // Reduced card padding from p-12 to p-8, added automatic centering flex tags
                className="bg-white p-8 rounded-[24px] shadow-lg border-2 border-slate-100 hover:border-[#C9A84C] transition-all transform hover:scale-102 active:scale-98 group flex flex-col items-center justify-center"
              >
                {/* Scaled down icon housing frame size from w-32/h-32 to w-24/h-24 */}
                <div className="bg-[#C9A84C]/10 w-24 h-24 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#C9A84C] transition-colors duration-300">
                  <FileText className="w-12 h-12 text-[#C9A84C] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-[#1B2A4A] mb-2 text-center">Submit New Complaint</h3>
                <p className="text-lg text-slate-500 text-center">Hantar Aduan Baru</p>
              </button>

              <button
                onClick={() => setViewMode('track')}
                className="bg-white p-8 rounded-[24px] shadow-lg border-2 border-slate-100 hover:border-[#C9A84C] transition-all transform hover:scale-102 active:scale-98 group flex flex-col items-center justify-center"
              >
                <div className="bg-[#1B2A4A]/10 w-24 h-24 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#1B2A4A] transition-colors duration-300">
                  <Search className="w-12 h-12 text-[#1B2A4A] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-[#1B2A4A] mb-2 text-center">Track Complaint Status</h3>
                <p className="text-lg text-slate-500 text-center">Semak Status Aduan</p>
              </button>
            </div>
          </div>
        )}

        {/* Submit Complaint Form */}
        {viewMode === 'submit' && (
          // FIX: Adjusted padding down to p-8 and decreased text/layout spacing scaling to look well proportioned
          <div className="max-w-4xl mx-auto w-full my-4 bg-white p-8 rounded-[24px] shadow-sm border-2 border-slate-100 animate-in slide-in-from-right-8 duration-300">
            <h2 className="text-3xl mb-6 text-[#1B2A4A] font-bold border-b-2 border-slate-100 pb-4">Submit Complaint / Hantar Aduan</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Category Selection */}
              <div>
                <h3 className="text-xl text-slate-800 font-semibold mb-4">1. Complaint Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCategory(cat.en)}
                      className={`p-4 rounded-[16px] border-2 text-center transition-all ${
                        category === cat.en
                          ? 'border-[#C9A84C] bg-[#C9A84C]/10 ring-2 ring-[#C9A84C]'
                          : 'border-slate-200 hover:border-[#C9A84C]'
                      }`}
                    >
                      <div className="text-lg font-bold text-[#1B2A4A] mb-1">{cat.en}</div>
                      <div className="text-base text-slate-600">{cat.ms}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl text-slate-800 font-semibold mb-4">2. Complaint Description</h3>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe your complaint in detail..."
                  rows={4}
                  className="w-full px-5 py-4 text-base border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C] resize-none"
                  required
                />
              </div>

              {/* Personal Details Form */}
              <div>
                <h3 className="text-xl text-slate-800 font-semibold mb-4">3. Personal Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-base text-slate-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3.5 text-base border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-base text-slate-700 mb-1.5">IC Number (MyKad)</label>
                      <input
                        type="text"
                        required
                        value={icNumber}
                        onChange={(e) => setIcNumber(e.target.value)}
                        className="w-full px-4 py-3.5 text-base border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]"
                        placeholder="e.g. 900101-14-5678"
                      />
                    </div>
                    <div>
                      <label className="block text-base text-slate-700 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-3.5 text-base border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]"
                        placeholder="e.g. 012-3456789"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Action */}
              <button
                type="submit"
                disabled={!category || !description || !fullName || !icNumber || !phoneNumber}
                className="w-full bg-[#C9A84C] hover:bg-[#B8973B] text-white py-4 rounded-[16px] transition-all duration-200 text-2xl font-bold disabled:bg-slate-300 disabled:cursor-not-allowed mt-4"
              >
                Submit Complaint
              </button>
            </form>
          </div>
        )}

        {/* Track Status Form */}
        {viewMode === 'track' && (
          // FIX: Applied form spacing constraints to track complaint layout container
          <div className="max-w-2xl mx-auto w-full my-auto py-6 animate-in slide-in-from-right-8 duration-300">
            <div className="bg-white p-8 rounded-[24px] shadow-sm border-2 border-slate-100">
              <h2 className="text-3xl text-[#1B2A4A] font-bold mb-6 flex items-center gap-3 border-b-2 border-slate-100 pb-4">
                <Search className="w-8 h-8 text-[#C9A84C]" />
                Track Complaint Status
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-lg text-slate-700 mb-2">Complaint Reference Number</label>
                  <input
                    type="text"
                    value={trackRef}
                    onChange={(e) => setTrackRef(e.target.value)}
                    className="w-full px-5 py-3.5 text-lg border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]"
                    placeholder="e.g. CMP-2024-XXXX"
                  />
                </div>
                <button
                  onClick={handleTrackStatus}
                  disabled={!trackRef}
                  className="w-full bg-[#1B2A4A] hover:bg-[#2A4070] text-white py-4 rounded-[16px] transition-all duration-200 text-xl font-bold disabled:bg-slate-300 mt-2"
                >
                  Track Status
                </button>
              </div>

              {trackStatus === 'found' && (
                <div className="mt-8 bg-slate-50 p-6 rounded-[16px] shadow-inner border-2 border-slate-200 space-y-5 animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="text-xl font-bold text-[#1B2A4A] mb-2 border-b pb-2">Status Details</h3>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Current Status</p>
                      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold border-2 border-blue-200 text-base">
                        <Clock className="w-5 h-5" />
                        In Progress
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500 mb-1">Date Submitted</p>
                      <p className="text-lg font-semibold text-slate-800">12 Oct 2024</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500 mb-1.5">Staff Remarks</p>
                    <div className="bg-white p-4 rounded-xl border-2 border-slate-200">
                      <p className="text-base text-slate-700 italic leading-relaxed">
                        "Team has been dispatched to assess the reported road issue. Estimated repair will begin next week."
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center relative animate-in zoom-in duration-200">
            <div className="bg-green-100 rounded-full w-32 h-32 mx-auto mb-8 flex items-center justify-center">
              <CheckCircle className="w-20 h-20 text-green-600" />
            </div>
            <h2 className="text-5xl font-bold text-[#1B2A4A] mb-4">Complaint Submitted!</h2>
            <p className="text-2xl text-slate-600 mb-8">Thank you for your report.</p>
            
            <div className="bg-[#C9A84C]/10 border-2 border-[#C9A84C] rounded-[16px] p-8 mb-10">
              <p className="text-xl text-slate-600 mb-3">Complaint Reference Number</p>
              <p className="text-5xl font-bold text-[#C9A84C] tracking-wider">{referenceNumber}</p>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                setViewMode('select');
                setCategory('');
                setDescription('');
                setFullName('');
                setIcNumber('');
                setPhoneNumber('');
              }}
              className="w-full bg-[#1B2A4A] hover:bg-[#2A4070] text-white py-6 rounded-[16px] transition-all duration-200 text-2xl font-bold flex items-center justify-center gap-3"
            >
              <Home className="w-8 h-8" />
              Return to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
