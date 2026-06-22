import { useState } from 'react';
import { FileText, CheckCircle, Home, Search, Clock, AlertCircle } from 'lucide-react';
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
  const [referenceNumber] = useState(`CMP-2026-${Math.floor(1000 + Math.random() * 9000)}`);

  // Validation Error State
  const [nameError, setNameError] = useState('');
  const [icError, setIcError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Track Status State
  const [trackRef, setTrackRef] = useState('');
  const [trackStatus, setTrackStatus] = useState<'idle' | 'found' | 'not_found'>('idle');

  // Mock Data for tracking
  const MOCK_REF = 'CMP-2026-1234';

  const categories = [
    { en: "Waste Management", ms: "Pengurusan Sisa" },
    { en: "Road/Drainage", ms: "Jalan/Longkang" },
    { en: "Public Nuisance", ms: "Gangguan Awam" },
    { en: "Others", ms: "Lain-lain" }
  ];

  // Validation Handlers
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);
    if (value && !/^[a-zA-Z\s]+$/.test(value)) {
      setNameError('Only words and spaces are allowed. No numbers or special symbols.');
    } else {
      setNameError('');
    }
  };

  const handleIcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIcNumber(value);
    if (value && !/^[0-9]+$/.test(value)) {
      setIcError('Only numbers are allowed. No letters or symbols.');
    } else {
      setIcError('');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (value && !/^[0-9]+$/.test(value)) {
      setPhoneError('Only numbers are allowed. No letters or symbols.');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      category && 
      description && 
      fullName && 
      icNumber && 
      phoneNumber && 
      !nameError && 
      !icError && 
      !phoneError
    ) {
      setShowSuccessModal(true);
    }
  };

  const handleTrackStatus = () => {
    if (trackRef === MOCK_REF) {
      setTrackStatus('found');
    } else {
      setTrackStatus('not_found');
    }
  };

  const handleBack = () => {
    if (viewMode === 'select') {
      onBack(); // Go to Main Menu
    } else {
      setViewMode('select'); // Go back to choice menu
      setTrackStatus('idle'); // Reset track status
      setTrackRef('');
    }
  };

  return (
    <div className="size-full bg-slate-50 flex flex-col h-screen overflow-hidden">
      <Header showBackButton onBack={handleBack} />

      <main className={`flex-1 flex flex-col overflow-y-auto px-8 py-6 ${viewMode === 'select' ? 'justify-center' : ''}`}>
        
        {/* Selection Screen */}
        {viewMode === 'select' && (
          <div className="max-w-5xl w-full mx-auto flex flex-col justify-center h-full max-h-[70vh] animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <h2 className="text-4xl mb-2 text-[#1B2A4A] font-bold">Complaint Services</h2>
              <p className="text-xl text-slate-600">Perkhidmatan Aduan</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setViewMode('submit')}
                className="bg-white p-8 rounded-[24px] shadow-lg border-2 border-slate-100 hover:border-[#C9A84C] transition-all transform hover:scale-102 active:scale-98 group flex flex-col items-center justify-center"
              >
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
                      onChange={handleNameChange}
                      className={`w-full px-4 py-3.5 text-base border-2 rounded-[16px] focus:outline-none transition-colors ${
                        nameError ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-slate-300 focus:border-[#C9A84C]'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {nameError && (
                      <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {nameError}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-base text-slate-700 mb-1.5">IC Number (MyKad)</label>
                      <input
                        type="text"
                        required
                        value={icNumber}
                        onChange={handleIcChange}
                        className={`w-full px-4 py-3.5 text-base border-2 rounded-[16px] focus:outline-none transition-colors ${
                          icError ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-slate-300 focus:border-[#C9A84C]'
                        }`}
                        placeholder="e.g. 900101145678"
                      />
                      {icError && (
                        <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {icError}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-base text-slate-700 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        className={`w-full px-4 py-3.5 text-base border-2 rounded-[16px] focus:outline-none transition-colors ${
                          phoneError ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-slate-300 focus:border-[#C9A84C]'
                        }`}
                        placeholder="e.g. 0123456789"
                      />
                      {phoneError && (
                        <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {phoneError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Action */}
              <button
                type="submit"
                disabled={
                  !category || 
                  !description || 
                  !fullName || 
                  !icNumber || 
                  !phoneNumber ||
                  !!nameError ||
                  !!icError ||
                  !!phoneError
                }
                className="w-full bg-[#C9A84C] hover:bg-[#B8973B] text-white py-4 rounded-[16px] transition-all duration-200 text-2xl font-bold disabled:bg-slate-300 disabled:cursor-not-allowed mt-4"
              >
                Submit Complaint
              </button>
            </form>
          </div>
        )}

        {/* Track Status Form */}
        {viewMode === 'track' && (
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
                    placeholder="e.g. CMP-2026-1234"
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

              {/* Success Result Component */}
              {trackStatus === 'found' && (
                <div className="mt-8 bg-slate-50 p-6 rounded-[16px] shadow-inner border-2 border-slate-200 space-y-5 animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="text-xl font-bold text-[#1B2A4A] mb-2 border-b pb-2">Status Details</h3>
                  
                  {/* Personal and Category Details (Placed Above Status) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-slate-200 pb-4">
                    <div>
                      <p className="text-sm text-slate-500 mb-0.5">Name</p>
                      <p className="text-base font-semibold text-slate-800">Muhammad Ali</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-0.5">IC Number</p>
                      <p className="text-base font-semibold text-slate-800">900101145678</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-0.5">Complaint Category</p>
                      <p className="text-base font-semibold text-slate-800">Waste Management</p>
                    </div>
                  </div>

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
                      <p className="text-lg font-semibold text-slate-800">12 June 2026</p>
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

              {/* Not Found Result Component */}
              {trackStatus === 'not_found' && (
                <div className="mt-8 bg-red-50 p-6 rounded-[16px] border-2 border-red-200 text-center animate-in zoom-in duration-300">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <p className="text-xl font-bold text-red-700 mb-1">Complaint Not Found</p>
                  <p className="text-base text-red-600">The reference number entered does not match any active records. Please check and try again.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full text-center relative animate-in zoom-in duration-200">
            <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-1">Complaint Submitted!</h2>
            <p className="text-base text-slate-600 mb-5">Thank you for your report.</p>
            
            <div className="bg-[#C9A84C]/10 border border-[#C9A84C] rounded-xl p-4 mb-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Complaint Reference Number</p>
              <p className="text-3xl font-bold text-[#C9A84C] tracking-wide">{referenceNumber}</p>
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
                setNameError('');
                setIcError('');
                setPhoneError('');
              }}
              className="w-full bg-[#1B2A4A] hover:bg-[#2A4070] text-white py-3 rounded-xl transition-all duration-200 text-lg font-bold flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Return to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
