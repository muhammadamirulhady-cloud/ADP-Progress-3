import { TrendingUp, MessageSquare } from 'lucide-react';
import { LineChart } from './LineChart';

export function FAQTrendForecasting() {
  const forecastData = [
    { label: 'Jun', value: 234 },
    { label: 'Jul', value: 267 },
    { label: 'Aug', value: 289 },
    { label: 'Sep', value: 312 },
    { label: 'Oct', value: 341 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl text-[#1B2A4A] mb-2">FAQ Trend Forecasting</h2>
        <p className="text-xl text-slate-600">Ramalan Trend Soalan Lazim</p>
      </div>

      <LineChart
        title="Trending Questions Forecast"
        titleMs="Ramalan Soalan Trending"
        data={forecastData}
        color="#8b5cf6"
      />

      {/* Future FAQ Predictions */}
      <div className="bg-white border-2 border-slate-200 rounded-[16px] p-6 shadow-lg">
        <h3 className="text-2xl text-[#1B2A4A] mb-6">Future FAQ Prediction List</h3>
        <p className="text-lg text-slate-600 mb-6">Senarai Ramalan Soalan Lazim Masa Hadapan</p>
        <div className="space-y-4">
          {[
            { question: 'How to renew business license?', growth: '+34%', confidence: 92 },
            { question: 'Payment methods accepted?', growth: '+28%', confidence: 88 },
            { question: 'Office hours during public holidays?', growth: '+21%', confidence: 85 },
            { question: 'Online appointment booking process?', growth: '+18%', confidence: 79 }
          ].map((faq, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-purple-50 border-2 border-purple-200 rounded-[16px]">
              <div className="flex items-center gap-4">
                <MessageSquare className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-lg text-slate-800">{faq.question}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-purple-600">Predicted Growth: {faq.growth}</span>
                    <span className="text-sm text-slate-500">•</span>
                    <span className="text-sm text-green-600">Confidence: {faq.confidence}%</span>
                  </div>
                </div>
              </div>
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Content Updates */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-[16px] p-6">
        <h3 className="text-2xl text-blue-900 mb-4">📝 Suggested Content Updates</h3>
        <p className="text-lg text-blue-800 mb-4">Kemas Kini Kandungan Dicadangkan</p>
        <ul className="space-y-2">
          <li className="text-lg text-blue-800">• Create detailed guide for business license renewal process</li>
          <li className="text-lg text-blue-800">• Add payment methods infographic to kiosk home screen</li>
          <li className="text-lg text-blue-800">• Update holiday hours notice with 2-week advance notice</li>
          <li className="text-lg text-blue-800">• Add video tutorial for online appointment booking</li>
        </ul>
      </div>
    </div>
  );
}
