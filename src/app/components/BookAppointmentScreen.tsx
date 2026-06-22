import { useState } from 'react';
import { Calendar, Clock, CheckCircle, Home, XCircle, Search, AlertCircle } from 'lucide-react';
import { Header } from './Header';
import { AdminAccessButton } from './AdminAccessButton';

interface BookAppointmentScreenProps {
  onBack: () => void;
  onAdminAccess?: () => void;
}

type ServiceType = {
  en: string;
  ms: string;
};

export function BookAppointmentScreen({ onBack, onAdminAccess }: BookAppointmentScreenProps) {
  const [viewMode, setViewMode] = useState<'select' | 'book' | 'manage'>('select');

  // Booking Form State
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [icNumber, setIcNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [referenceNumber] = useState(`APT-2026-${Math.floor(1000 + Math.random() * 9000)}`);

  // Validation Error State
  const [nameError, setNameError] = useState('');
  const [icError, setIcError] = useState('');
  const [contactError, setContactError] = useState('');

  // Manage/Cancel State
  const [manageRef, setManageRef] = useState('');
  const [manageIc, setManageIc] = useState('');
  const [manageStatus, setManageStatus] = useState<'idle' | 'found' | 'cancelled' | 'not_found'>('idle');

  // Mock Data for verification
  const MOCK_REF = 'APT-2026-1234';
  const MOCK_IC = '012345679999';

  const services: ServiceType[] = [
    { en: "Licensing", ms: "Pelesenan" },
    { en: "Tax & Assessment", ms: "Cukai & Taksiran" },
    { en: "Permit Application", ms: "Permohonan Permit" }
  ];

  const timeSlots = [
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM"
  ];

  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i + 1);
      days.push(date);
    }
    return days;
  };

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

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContactNumber(value);
    if (value && !/^[0-9]+$/.test(value)) {
      setContactError('Only numbers are allowed. No letters or symbols.');
    } else {
      setContactError('');
    }
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      selectedService && 
      selectedDate && 
      selectedTime && 
      fullName && 
      icNumber && 
      contactNumber && 
      !nameError && 
      !icError && 
      !contactError
    ) {
      setShowSuccessModal(true);
    }
  };

  const handleCheckStatus = () => {
    if (manageRef === MOCK_REF && manageIc === MOCK_IC) {
      setManageStatus('found');
    } else {
      setManageStatus('not_found');
    }
  };

  const handleCancelAppointment = () => {
    setManageStatus('cancelled');
  };

  const handleBack = () => {
    if (viewMode === 'select') {
      onBack(); // Go to Main Menu
    } else {
      setViewMode('select'); // Go back to choice menu
      setManageStatus('idle'); // Reset manage status
      setManageRef('');
      setManageIc('');
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
              <h2 className="text-4xl mb-2 text-[#1B2A4A] font-bold">Appointment Services</h2>
              <p className="text-xl text-slate-600">Perkhidmatan Temu Janji</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setViewMode('book')}
                className="bg-white p-8 rounded-[24px] shadow-lg border-2 border-slate-100 hover:border-[#C9A84C] transition-all transform hover:scale-102 active:scale-98 group flex flex-col items-center justify-center"
              >
                <div className="bg-[#C9A84C]/10 w-24 h-24 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#C9A84C] transition-colors duration-300">
                  <Calendar className="w-12 h-12 text-[#C9A84C] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-[#1B2A4A] mb-2 text-center">Book New Appointment</h3>
                <p className="text-lg text-slate-500 text-center">Tempah Temu Janji Baru</p>
              </button>

              <button
                onClick={() => setViewMode('manage')}
                className="bg-white p-8 rounded-[24px] shadow-lg border-2 border-slate-100 hover:border-[#C9A84C] transition-all transform hover:scale-102 active:scale-98 group flex flex-col items-center justify-center"
              >
                <div className="bg-[#1B2A4A]/10 w-24 h-24 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#1B2A4A] transition-colors duration-300">
                  <Search className="w-12 h-12 text-[#1B2A4A] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-[#1B2A4A] mb-2 text-center">Manage or Cancel</h3>
                <p className="text-lg text-slate-500 text-center">Urus atau Batal Temu Janji</p>
              </button>
            </div>
          </div>
        )}

        {/* Book Appointment Form */}
        {viewMode === 'book' && (
          <div className="max-w-4xl mx-auto w-full my-4 bg-white p-8 rounded-[24px] shadow-sm border-2 border-slate-100 animate-in slide-in-from-right-8 duration-300">
            <h2 className="text-3xl mb-6 text-[#1B2A4A] font-bold border-b-2 border-slate-100 pb-4">Book Appointment / Tempah Temu Janji</h2>
            
            <form onSubmit={handleBookSubmit} className="space-y-8">
              {/* Service Selection */}
              <div>
                <h3 className="text-xl text-slate-800 font-semibold mb-4">1. Department/Service Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {services.map((service, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className={`p-4 rounded-[16px] border-2 text-center transition-all ${
                        selectedService?.en === service.en
                          ? 'border-[#C9A84C] bg-[#C9A84C]/10 ring-2 ring-[#C9A84C]'
                          : 'border-slate-200 hover:border-[#C9A84C]'
                      }`}
                    >
                      <div className="text-lg font-bold text-[#1B2A4A] mb-1">{service.en}</div>
                      <div className="text-base text-slate-600">{service.ms}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Picker */}
              <div>
                <h3 className="text-xl text-slate-800 font-semibold mb-4">2. Date & Time</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-base text-slate-600 mb-2">Select Date</p>
                    <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                      {getNext7Days().map((date, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedDate(date)}
                          className={`min-w-[110px] p-4 rounded-[16px] border-2 flex flex-col items-center justify-center transition-all ${
                            selectedDate?.toDateString() === date.toDateString()
                              ? 'border-[#C9A84C] bg-[#C9A84C] text-white'
                              : 'border-slate-200 hover:border-[#C9A84C] bg-white text-slate-800'
                          }`}
                        >
                          <span className="text-sm font-medium">{date.toLocaleDateString('en-MY', { weekday: 'short' })}</span>
                          <span className="text-2xl font-bold my-1">{date.getDate()}</span>
                          <span className="text-sm">{date.toLocaleDateString('en-MY', { month: 'short' })}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-base text-slate-600 mb-2">Select Time</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {timeSlots.map((slot, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`p-3.5 rounded-[16px] border-2 flex items-center justify-center gap-2 transition-all ${
                            selectedTime === slot
                              ? 'border-[#C9A84C] bg-[#C9A84C] text-white'
                              : 'border-slate-200 hover:border-[#C9A84C] bg-white text-slate-800'
                          }`}
                        >
                          <Clock className="w-5 h-5" />
                          <span className="text-base font-medium">{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
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
                      <label className="block text-base text-slate-700 mb-1.5">Contact Number</label>
                      <input
                        type="tel"
                        required
                        value={contactNumber}
                        onChange={handleContactChange}
                        className={`w-full px-4 py-3.5 text-base border-2 rounded-[16px] focus:outline-none transition-colors ${
                          contactError ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-slate-300 focus:border-[#C9A84C]'
                        }`}
                        placeholder="e.g. 0123456789"
                      />
                      {contactError && (
                        <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {contactError}
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
                  !selectedService || 
                  !selectedDate || 
                  !selectedTime || 
                  !fullName || 
                  !icNumber || 
                  !contactNumber ||
                  !!nameError ||
                  !!icError ||
                  !!contactError
                }
                className="w-full bg-[#C9A84C] hover:bg-[#B8973B] text-white py-4 rounded-[16px] transition-all duration-200 text-2xl font-bold disabled:bg-slate-300 disabled:cursor-not-allowed mt-4"
              >
                Confirm & Book Appointment
              </button>
            </form>
          </div>
        )}

        {/* Manage/Cancel Appointment Form */}
        {viewMode === 'manage' && (
          <div className="max-w-2xl mx-auto w-full my-auto py-6 animate-in slide-in-from-right-8 duration-300">
            <div className="bg-white p-8 rounded-[24px] shadow-sm border-2 border-slate-100">
              <h2 className="text-3xl text-[#1B2A4A] font-bold mb-6 flex items-center gap-3 border-b-2 border-slate-100 pb-4">
                <Search className="w-8 h-8 text-[#C9A84C]" />
                Manage or Cancel Appointment
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-lg text-slate-700 mb-2">Appointment Reference Number</label>
                  <input
                    type="text"
                    value={manageRef}
                    onChange={(e) => setManageRef(e.target.value)}
                    className="w-full px-5 py-3.5 text-lg border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]"
                    placeholder="e.g. APT-2026-XXXX"
                  />
                </div>
                <div>
                  <label className="block text-lg text-slate-700 mb-2">IC Number</label>
                  <input
                    type="text"
                    value={manageIc}
                    onChange={(e) => setManageIc(e.target.value)}
                    className="w-full px-5 py-3.5 text-lg border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]"
                    placeholder="Enter IC Number"
                  />
                </div>
                <button
                  onClick={handleCheckStatus}
                  disabled={!manageRef || !manageIc}
                  className="w-full bg-[#1B2A4A] hover:bg-[#2A4070] text-white py-4 rounded-[16px] transition-all duration-200 text-xl font-bold disabled:bg-slate-300 mt-2"
                >
                  Check Status
                </button>
              </div>

              {manageStatus === 'found' && (
                <div className="mt-8 bg-slate-50 p-6 rounded-[16px] shadow-inner border-2 border-slate-200 space-y-4 animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">Appointment Details Found</h3>
                  
                  {/* Appointment Data Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-500 mb-0.5">Department</p>
                      <p className="text-lg font-semibold text-slate-800">Licensing</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-500 mb-0.5">Date</p>
                      <p className="text-lg font-semibold text-slate-800">24 June 2026</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-500 mb-0.5">Time</p>
                      <p className="text-lg font-semibold text-slate-800">11:00 AM - 12:00 PM</p>
                    </div>
                  </div>

                  {/* Personal Details Data Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-500 mb-0.5">Name</p>
                      <p className="text-lg font-semibold text-slate-800">Ahmad Bin Abu</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-500 mb-0.5">IC Number</p>
                      <p className="text-lg font-semibold text-slate-800">{manageIc}</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-500 mb-0.5">Contact Number</p>
                      <p className="text-lg font-semibold text-slate-800">0123456789</p>
                    </div>
                  </div>

                  <button
                    onClick={handleCancelAppointment}
                    className="w-full mt-4 bg-red-50 text-red-600 hover:bg-red-100 border-2 border-red-200 py-4 rounded-[16px] transition-all duration-200 text-xl font-bold flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-6 h-6" />
                    Confirm Cancellation
                  </button>
                </div>
              )}

              {manageStatus === 'not_found' && (
                <div className="mt-8 bg-red-50 p-6 rounded-[16px] border-2 border-red-200 text-center animate-in zoom-in duration-300">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <p className="text-xl font-bold text-red-700 mb-1">Appointment Not Found</p>
                  <p className="text-base text-red-600">The details entered do not match any active appointments. Please check and try again.</p>
                </div>
              )}

              {manageStatus === 'cancelled' && (
                <div className="mt-8 bg-green-50 p-8 rounded-[16px] border-2 border-green-200 text-center animate-in zoom-in duration-300">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-green-700 mb-1">Appointment Cancelled</p>
                  <p className="text-lg text-green-600">Your appointment has been successfully cancelled.</p>
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
            
            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-1">Booking Successful!</h2>
            <p className="text-base text-slate-600 mb-5">Your appointment has been confirmed.</p>
            
            <div className="bg-[#C9A84C]/10 border border-[#C9A84C] rounded-xl p-4 mb-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Appointment Reference Number</p>
              <p className="text-3xl font-bold text-[#C9A84C] tracking-wide">{referenceNumber}</p>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                setViewMode('select');
                setFullName('');
                setIcNumber('');
                setContactNumber('');
                setSelectedService(null);
                setSelectedDate(null);
                setSelectedTime(null);
                setNameError('');
                setIcError('');
                setContactError('');
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
