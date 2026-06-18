import { useState } from 'react';
import { Search, Filter, Brain, LogOut, X, Plus, Edit, Trash2, Save, ArrowLeft } from 'lucide-react';
import { Header } from './Header';

interface AdminChatbotKnowledgeManagerProps {
  onBackToKiosk: () => void;
  onBackToHub?: () => void;
}

interface KnowledgeEntry {
  id: string;
  category: string;
  question: string;
  answerEn: string;
  answerMs: string;
  keywords: string[];
  lastUpdated: string;
}

export function AdminChatbotKnowledgeManager({ onBackToKiosk, onBackToHub }: AdminChatbotKnowledgeManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedEntry, setSelectedEntry] = useState<KnowledgeEntry | null>(null);

  // Form state
  const [formCategory, setFormCategory] = useState('');
  const [formQuestion, setFormQuestion] = useState('');
  const [formAnswerEn, setFormAnswerEn] = useState('');
  const [formAnswerMs, setFormAnswerMs] = useState('');
  const [formKeywords, setFormKeywords] = useState('');

  // Mock knowledge base data
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeEntry[]>([
    {
      id: 'KB-001',
      category: 'Operating Hours',
      question: 'What are the council office operating hours?',
      answerEn: 'The Municipal Council office operates Monday to Friday, 8:00 AM to 5:00 PM. We are closed on weekends and public holidays.',
      answerMs: 'Pejabat Majlis Perbandaran beroperasi Isnin hingga Jumaat, 8:00 pagi hingga 5:00 petang. Kami tutup pada hujung minggu dan cuti umum.',
      keywords: ['hours', 'operating', 'open', 'waktu', 'operasi'],
      lastUpdated: '2024-05-15',
    },
    {
      id: 'KB-002',
      category: 'Licensing',
      question: 'How do I apply for a business license?',
      answerEn: 'Business license applications can be submitted online through our portal or in person at the Licensing Department. Required documents include business registration, premises ownership proof, and completed application form.',
      answerMs: 'Permohonan lesen perniagaan boleh dikemukakan secara dalam talian melalui portal kami atau secara bersemuka di Jabatan Pelesenan. Dokumen yang diperlukan termasuk pendaftaran perniagaan, bukti pemilikan premis, dan borang permohonan lengkap.',
      keywords: ['license', 'business', 'apply', 'lesen', 'perniagaan'],
      lastUpdated: '2024-06-01',
    },
    {
      id: 'KB-003',
      category: 'Assessment Tax',
      question: 'When is the assessment tax payment deadline?',
      answerEn: 'Assessment tax payments are due bi-annually: First installment by February 28th, Second installment by August 31st. Late payments will incur a penalty.',
      answerMs: 'Pembayaran cukai taksiran perlu dibuat dua kali setahun: Ansuran pertama sebelum 28 Februari, Ansuran kedua sebelum 31 Ogos. Pembayaran lewat akan dikenakan penalti.',
      keywords: ['tax', 'assessment', 'payment', 'deadline', 'cukai', 'taksiran'],
      lastUpdated: '2024-04-20',
    },
    {
      id: 'KB-004',
      category: 'Waste Management',
      question: 'What is the garbage collection schedule?',
      answerEn: 'Residential areas: Monday, Wednesday, Friday. Commercial areas: Daily except Sundays. Collection starts at 7:00 AM.',
      answerMs: 'Kawasan kediaman: Isnin, Rabu, Jumaat. Kawasan komersial: Setiap hari kecuali Ahad. Kutipan bermula jam 7:00 pagi.',
      keywords: ['garbage', 'waste', 'collection', 'schedule', 'sampah', 'kutipan'],
      lastUpdated: '2024-05-30',
    },
    {
      id: 'KB-005',
      category: 'Permits',
      question: 'How do I apply for a renovation permit?',
      answerEn: 'Submit renovation permit application with architectural plans, structural engineer approval, and property ownership documents. Processing takes 14-21 working days.',
      answerMs: 'Kemukakan permohonan permit pengubahsuaian dengan pelan senibina, kelulusan jurutera struktur, dan dokumen pemilikan harta. Pemprosesan mengambil masa 14-21 hari bekerja.',
      keywords: ['renovation', 'permit', 'apply', 'pengubahsuaian', 'permit'],
      lastUpdated: '2024-06-03',
    },
  ]);

  const categories = ['All', 'Operating Hours', 'Licensing', 'Assessment Tax', 'Waste Management', 'Permits'];

  const filteredKnowledge = knowledgeBase.filter((entry) => {
    const matchesSearch =
      searchQuery === '' ||
      entry.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      entry.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || entry.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddNew = () => {
    setModalMode('add');
    setSelectedEntry(null);
    setFormCategory('');
    setFormQuestion('');
    setFormAnswerEn('');
    setFormAnswerMs('');
    setFormKeywords('');
    setShowModal(true);
  };

  const handleEdit = (entry: KnowledgeEntry) => {
    setModalMode('edit');
    setSelectedEntry(entry);
    setFormCategory(entry.category);
    setFormQuestion(entry.question);
    setFormAnswerEn(entry.answerEn);
    setFormAnswerMs(entry.answerMs);
    setFormKeywords(entry.keywords.join(', '));
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this knowledge entry?')) {
      setKnowledgeBase(knowledgeBase.filter((entry) => entry.id !== id));
    }
  };

  const handleSave = () => {
    const keywordsArray = formKeywords.split(',').map((k) => k.trim()).filter((k) => k);

    if (modalMode === 'add') {
      const newEntry: KnowledgeEntry = {
        id: `KB-${String(knowledgeBase.length + 1).padStart(3, '0')}`,
        category: formCategory,
        question: formQuestion,
        answerEn: formAnswerEn,
        answerMs: formAnswerMs,
        keywords: keywordsArray,
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      setKnowledgeBase([...knowledgeBase, newEntry]);
    } else if (modalMode === 'edit' && selectedEntry) {
      setKnowledgeBase(
        knowledgeBase.map((entry) =>
          entry.id === selectedEntry.id
            ? {
                ...entry,
                category: formCategory,
                question: formQuestion,
                answerEn: formAnswerEn,
                answerMs: formAnswerMs,
                keywords: keywordsArray,
                lastUpdated: new Date().toISOString().split('T')[0],
              }
            : entry
        )
      );
    }
    setShowModal(false);
  };

  return (
    <div className="size-full bg-slate-50 flex flex-col h-screen overflow-hidden">
      <Header />

      <div className="bg-[#1B2A4A] py-4 px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl text-white flex items-center gap-3">
            <Brain className="w-8 h-8 text-[#C9A84C]" />
            Admin Dashboard: Chatbot Knowledge Manager
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

      <main className="flex-1 flex flex-col overflow-hidden p-8">
        <div className="bg-white rounded-[24px] shadow-lg border-2 border-slate-100 p-8 flex flex-col flex-1 overflow-hidden">
          {/* Filter & Search Bar */}
          <div className="flex gap-4 mb-6 pb-6 border-b-2 border-slate-100">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by question, keywords, or ID..."
                className="w-full pl-12 pr-4 py-3 text-lg border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]"
              />
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
            <button
              onClick={handleAddNew}
              className="bg-[#C9A84C] hover:bg-[#B8973B] text-white px-6 py-3 rounded-[16px] transition-all duration-200 active:scale-95 flex items-center gap-2 font-bold"
            >
              <Plus className="w-5 h-5" />
              Add New Entry
            </button>
          </div>

          {/* Knowledge Base Table */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-[#1B2A4A] text-white">
                <tr>
                  <th className="text-left py-4 px-6 text-lg font-bold">ID</th>
                  <th className="text-left py-4 px-6 text-lg font-bold">Category</th>
                  <th className="text-left py-4 px-6 text-lg font-bold">Question</th>
                  <th className="text-left py-4 px-6 text-lg font-bold">Keywords</th>
                  <th className="text-left py-4 px-6 text-lg font-bold">Last Updated</th>
                  <th className="text-left py-4 px-6 text-lg font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredKnowledge.map((entry, idx) => (
                  <tr
                    key={entry.id}
                    className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                    }`}
                  >
                    <td className="py-4 px-6 font-bold text-[#1B2A4A]">{entry.id}</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-[8px] text-sm font-semibold bg-[#1B2A4A]/10 text-[#1B2A4A]">
                        {entry.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-700 max-w-md truncate">{entry.question}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {entry.keywords.slice(0, 3).map((keyword, kidx) => (
                          <span
                            key={kidx}
                            className="px-2 py-1 bg-[#C9A84C]/20 text-[#C9A84C] rounded-[6px] text-xs font-medium"
                          >
                            {keyword}
                          </span>
                        ))}
                        {entry.keywords.length > 3 && (
                          <span className="px-2 py-1 bg-slate-200 text-slate-600 rounded-[6px] text-xs font-medium">
                            +{entry.keywords.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-700">
                      {new Date(entry.lastUpdated).toLocaleDateString('en-MY', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(entry)}
                          className="bg-[#1B2A4A] hover:bg-[#2A4070] text-white p-2 rounded-[12px] transition-all duration-200 active:scale-95"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-[12px] transition-all duration-200 active:scale-95"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredKnowledge.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 text-xl">
                      No knowledge entries found matching your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary Stats */}
          <div className="mt-6 pt-6 border-t-2 border-slate-100 flex gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-[#C9A84C]/10 p-3 rounded-[12px]">
                <Brain className="w-6 h-6 text-[#C9A84C]" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Entries</p>
                <p className="text-2xl font-bold text-[#1B2A4A]">{knowledgeBase.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#1B2A4A]/10 p-3 rounded-[12px]">
                <Filter className="w-6 h-6 text-[#1B2A4A]" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Categories</p>
                <p className="text-2xl font-bold text-[#1B2A4A]">{categories.length - 1}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[24px] shadow-2xl max-w-4xl w-full p-10 relative animate-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-[12px] hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>

            <h2 className="text-3xl font-bold text-[#1B2A4A] mb-8 border-b-2 border-slate-100 pb-4">
              {modalMode === 'add' ? 'Add New Knowledge Entry' : 'Edit Knowledge Entry'}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-[#1B2A4A] mb-3">Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-6 py-4 text-lg border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C] bg-white cursor-pointer"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-lg font-bold text-[#1B2A4A] mb-3">Question</label>
                <input
                  type="text"
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="Enter the question users might ask..."
                  className="w-full px-6 py-4 text-lg border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-[#1B2A4A] mb-3">Answer (English)</label>
                <textarea
                  value={formAnswerEn}
                  onChange={(e) => setFormAnswerEn(e.target.value)}
                  rows={4}
                  placeholder="Enter the answer in English..."
                  className="w-full px-6 py-4 text-lg border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C] resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-[#1B2A4A] mb-3">Answer (Malay / Bahasa Malaysia)</label>
                <textarea
                  value={formAnswerMs}
                  onChange={(e) => setFormAnswerMs(e.target.value)}
                  rows={4}
                  placeholder="Masukkan jawapan dalam Bahasa Malaysia..."
                  className="w-full px-6 py-4 text-lg border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C] resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-[#1B2A4A] mb-3">Keywords (comma-separated)</label>
                <input
                  type="text"
                  value={formKeywords}
                  onChange={(e) => setFormKeywords(e.target.value)}
                  placeholder="e.g., hours, operating, open, waktu, operasi"
                  className="w-full px-6 py-4 text-lg border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C]"
                />
                <p className="text-sm text-slate-500 mt-2">Separate keywords with commas. Include both English and Malay terms.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSave}
                disabled={!formCategory || !formQuestion || !formAnswerEn || !formAnswerMs}
                className="flex-1 bg-[#C9A84C] hover:bg-[#B8973B] text-white py-4 rounded-[16px] transition-all duration-200 active:scale-95 text-xl font-bold disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {modalMode === 'add' ? 'Add Entry' : 'Save Changes'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-4 rounded-[16px] transition-all duration-200 active:scale-95 text-xl font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
