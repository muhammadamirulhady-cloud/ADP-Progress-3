import { useState } from 'react';
import { Star, ArrowLeft } from 'lucide-react';

interface FeedbackScreenProps {
  onBack: () => void;
}

export function FeedbackScreen({ onBack }: FeedbackScreenProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [aspect, setAspect] = useState('Overall');
  const [submitted, setSubmitted] = useState(false);

  const aspects = ['Overall', 'Chatbot', 'Queue', 'Counter Staff'];

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center border-2 border-slate-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#1B2A4A] mb-3">Thank You!</h2>
          <p className="text-xl text-slate-600 mb-2">Terima Kasih!</p>
          <p className="text-lg text-slate-500 mb-8">Your feedback has been submitted.</p>
          <button
            onClick={onBack}
            className="bg-[#1B2A4A] text-white px-8 py-4 rounded-xl text-xl w-full hover:bg-[#2a3d6b] transition-colors"
          >
            Return to Home / Kembali ke Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-[#1B2A4A] text-white px-8 py-4 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">AI-FrontDesk MPS</h1>
        <div className="text-right text-sm opacity-80">
          {new Date().toLocaleDateString('en-MY', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-lg w-full border-2 border-slate-100">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#1B2A4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#1B2A4A] text-center mb-1">
            Rate Your Experience
          </h2>
          <p className="text-lg text-slate-500 text-center mb-8">
            Nilai Pengalaman Anda
          </p>

          {/* Star Rating */}
          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className="w-12 h-12"
                  fill={(hoveredRating || rating) >= star ? '#C9A84C' : 'none'}
                  stroke={(hoveredRating || rating) >= star ? '#C9A84C' : '#94a3b8'}
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>

          {/* Aspect Selector */}
          <div className="mb-6">
            <p className="text-lg font-medium text-[#1B2A4A] mb-3">
              Which aspect? / Aspek mana?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {aspects.map((a) => (
                <button
                  key={a}
                  onClick={() => setAspect(a)}
                  className={`py-3 px-4 rounded-xl border-2 text-base font-medium transition-all ${
                    aspect === a
                      ? 'bg-[#1B2A4A] text-white border-[#1B2A4A]'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-[#1B2A4A]'
                  }`}
                >
                  {a === 'Overall' ? 'Overall / Keseluruhan' :
                   a === 'Chatbot' ? 'Chatbot' :
                   a === 'Queue' ? 'Queue / Giliran' :
                   'Counter Staff / Kaunter'}
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-8">
            <p className="text-lg font-medium text-[#1B2A4A] mb-3">
              Comments (Optional) / Komen (Pilihan)
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts... / Kongsi pendapat anda..."
              className="w-full border-2 border-slate-200 rounded-xl p-4 text-base text-slate-700 resize-none focus:outline-none focus:border-[#1B2A4A] h-28"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className={`w-full py-4 rounded-xl text-xl font-semibold transition-all ${
              rating > 0
                ? 'bg-[#C9A84C] hover:bg-[#B8973B] text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Submit Feedback / Hantar Maklum Balas
          </button>
        </div>
      </main>
    </div>
  );
}