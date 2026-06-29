import { useState } from 'react';
import { Search, Filter, FileText, LogOut, X, ArrowLeft } from 'lucide-react';
import { Header } from './Header';

interface AdminComplaintDashboardProps {
  onBackToKiosk: () => void;
  onBackToHub?: () => void;
}

interface Complaint {
  refNumber: string;
  category: string;
  dateSubmitted: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  description: string;
  citizenName: string;
  contactNumber: string;
  staffRemarks: string;
}

export function AdminComplaintDashboard({ onBackToKiosk, onBackToHub }: AdminComplaintDashboardProps) {
  const [searchRef, setSearchRef] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState<'Pending' | 'In Progress' | 'Resolved'>('Pending');
  const [staffRemarks, setStaffRemarks] = useState('');

  // Mock complaint data
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      refNumber: 'COM-2024-1001',
      category: 'Infrastructure',
      dateSubmitted: '2024-06-01',
      status: 'Pending',
      description: 'Pothole on Jalan Merdeka causing traffic hazard',
      citizenName: 'Ahmad bin Abdullah',
      contactNumber: '012-3456789',
      staffRemarks: '',
    },
    {
      refNumber: 'COM-2024-1002',
      category: 'Cleanliness',
      dateSubmitted: '2024-06-02',
      status: 'In Progress',
      description: 'Overflowing garbage bins at Taman Sri Indah',
      citizenName: 'Siti binti Omar',
      contactNumber: '013-9876543',
      staffRemarks: 'Team dispatched to location for inspection',
    },
    {
      refNumber: 'COM-2024-1003',
      category: 'Utilities',
      dateSubmitted: '2024-06-03',
      status: 'Resolved',
      description: 'Street light malfunction on Jalan Harmoni',
      citizenName: 'Lee Wei Ming',
      contactNumber: '014-5551234',
      staffRemarks: 'Street light repaired and tested. Issue resolved.',
    },
    {
      refNumber: 'COM-2024-1004',
      category: 'Infrastructure',
      dateSubmitted: '2024-06-04',
      status: 'In Progress',
      description: 'Broken sidewalk near community center',
      citizenName: 'Muthu Krishnan',
      contactNumber: '016-7778888',
      staffRemarks: 'Assessment completed. Repair work scheduled for next week.',
    },
    {
      refNumber: 'COM-2024-1005',
      category: 'Cleanliness',
      dateSubmitted: '2024-06-05',
      status: 'Pending',
      description: 'Illegal dumping at parking lot B',
      citizenName: 'Tan Mei Ling',
      contactNumber: '017-4442222',
      staffRemarks: '',
    },
  ]);

  const categories = ['All', 'Infrastructure', 'Cleanliness', 'Utilities'];
  const statuses = ['All', 'Pending', 'In Progress', 'Resolved'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Resolved':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch = searchRef === '' || complaint.refNumber.toLowerCase().includes(searchRef.toLowerCase());
    const matchesCategory = filterCategory === 'All' || complaint.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || complaint.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleViewUpdate = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setUpdatedStatus(complaint.status);
    setStaffRemarks(complaint.staffRemarks);
    setShowModal(true);
  };

  const handleSaveChanges = () => {
    if (selectedComplaint) {
      setComplaints(
        complaints.map((c) =>
          c.refNumber === selectedComplaint.refNumber
            ? { ...c, status: updatedStatus, staffRemarks }
            : c
        )
      );
      setShowModal(false);
      setSelectedComplaint(null);
    }
  };

  return (
    <div className="size-full bg-slate-50 flex flex-col h-screen overflow-hidden">
      <Header />

      <div className="bg-[#1B2A4A] py-4 px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl text-white flex items-center gap-3">
            <FileText className="w-8 h-8 text-[#C9A84C]" />
            Admin Dashboard: Complaint Management
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
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                placeholder="Search by Ref Number..."
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
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none px-6 py-3 pr-10 text-lg border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C] bg-white cursor-pointer"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === 'All' ? 'All Status' : status}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Complaint Master List Table */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-[#1B2A4A] text-white">
                <tr>
                  <th className="text-left py-4 px-6 text-lg font-bold">Ref Number</th>
                  <th className="text-left py-4 px-6 text-lg font-bold">Category</th>
                  <th className="text-left py-4 px-6 text-lg font-bold">Date Submitted</th>
                  <th className="text-left py-4 px-6 text-lg font-bold">Status</th>
                  <th className="text-left py-4 px-6 text-lg font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint, idx) => (
                  <tr
                    key={complaint.refNumber}
                    className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                    }`}
                  >
                    <td className="py-4 px-6 font-bold text-[#1B2A4A]">{complaint.refNumber}</td>
                    <td className="py-4 px-6 text-slate-700">{complaint.category}</td>
                    <td className="py-4 px-6 text-slate-700">
                      {new Date(complaint.dateSubmitted).toLocaleDateString('en-MY', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-4 py-2 rounded-[12px] text-sm font-bold border-2 inline-block ${getStatusColor(
                          complaint.status
                        )}`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleViewUpdate(complaint)}
                        className="bg-[#C9A84C] hover:bg-[#B8973B] text-white px-6 py-2 rounded-[12px] transition-all duration-200 active:scale-95 font-bold"
                      >
                        View/Update
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredComplaints.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 text-xl">
                      No complaints found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Update Status Modal */}
      {showModal && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[24px] shadow-2xl max-w-3xl w-full p-10 relative animate-in zoom-in duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-[12px] hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>

            <h2 className="text-3xl font-bold text-[#1B2A4A] mb-8 border-b-2 border-slate-100 pb-4">
              Complaint Details & Update
            </h2>

            {/* Read-only Details */}
            <div className="bg-slate-50 rounded-[16px] p-6 mb-8 space-y-4">
              <h3 className="text-xl font-bold text-[#1B2A4A] mb-4">Complaint Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Reference Number</p>
                  <p className="text-lg font-bold text-[#1B2A4A]">{selectedComplaint.refNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Category</p>
                  <p className="text-lg font-semibold text-slate-700">{selectedComplaint.category}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Citizen Name</p>
                  <p className="text-lg font-semibold text-slate-700">{selectedComplaint.citizenName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Contact Number</p>
                  <p className="text-lg font-semibold text-slate-700">{selectedComplaint.contactNumber}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-slate-500 mb-1">Date Submitted</p>
                  <p className="text-lg font-semibold text-slate-700">
                    {new Date(selectedComplaint.dateSubmitted).toLocaleDateString('en-MY', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-slate-500 mb-1">Description</p>
                  <p className="text-lg text-slate-700 bg-white p-4 rounded-[12px] border border-slate-200">
                    {selectedComplaint.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Update Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-[#1B2A4A] mb-3">Update Status</label>
                <select
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value as 'Pending' | 'In Progress' | 'Resolved')}
                  className="w-full px-6 py-4 text-lg border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C] bg-white cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-bold text-[#1B2A4A] mb-3">Admin/Staff Remarks</label>
                <textarea
                  value={staffRemarks}
                  onChange={(e) => setStaffRemarks(e.target.value)}
                  rows={4}
                  placeholder="Enter official notes and remarks..."
                  className="w-full px-6 py-4 text-lg border-2 border-slate-300 rounded-[16px] focus:outline-none focus:border-[#C9A84C] resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSaveChanges}
                className="flex-1 bg-[#C9A84C] hover:bg-[#B8973B] text-white py-4 rounded-[16px] transition-all duration-200 active:scale-95 text-xl font-bold"
              >
                Save Changes
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
