import React, { useState, useEffect } from 'react';
import { Search, Pill, Calendar, Clock, Plus, X } from 'lucide-react';
import axios from 'axios';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    refillDate: '',
    prescribedBy: '',
    notes: ''
  });
  const [editId, setEditId] = useState(null);

  // Frequency options
  const frequencyOptions = [
    'Once daily',
    'Twice daily',
    'Three times daily',
    'Four times daily',
    'Every morning',
    'Every evening',
    'Every 4 hours',
    'Every 6 hours',
    'Every 8 hours',
    'Every 12 hours',
    'As needed',
    'Other'
  ];

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchPrescriptions = async () => {
      try {
        // const response = await axios.get('/api/prescriptions');
        // setPrescriptions(response.data);
        // setFilteredPrescriptions(response.data);
        
        // Mock data for prototype
        const mockPrescriptions = [
          { 
            id: 1, 
            name: 'Lisinopril', 
            dosage: '10mg', 
            frequency: 'Once daily', 
            startDate: '2025-03-01',
            endDate: '2025-09-01',
            refillDate: '2025-05-15',
            prescribedBy: 'Dr. Sarah Johnson',
            notes: 'Take in the morning with food'
          },
          { 
            id: 2, 
            name: 'Metformin', 
            dosage: '500mg', 
            frequency: 'Twice daily', 
            startDate: '2025-02-15',
            endDate: '2025-08-15',
            refillDate: '2025-05-10',
            prescribedBy: 'Dr. Emily Rodriguez',
            notes: 'Take with breakfast and dinner'
          },
          { 
            id: 3, 
            name: 'Atorvastatin', 
            dosage: '20mg', 
            frequency: 'Every evening', 
            startDate: '2025-01-10',
            endDate: '2025-07-10',
            refillDate: '2025-04-20',
            prescribedBy: 'Dr. Sarah Johnson',
            notes: 'Take before bedtime'
          }
        ];
        
        setPrescriptions(mockPrescriptions);
        setFilteredPrescriptions(mockPrescriptions);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  useEffect(() => {
    // Filter prescriptions based on search term
    if (searchTerm.trim() === '') {
      setFilteredPrescriptions(prescriptions);
    } else {
      const filtered = prescriptions.filter(prescription => 
        prescription.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPrescriptions(filtered);
    }
  }, [searchTerm, prescriptions]);

  const openCreateModal = () => {
    setModalMode('create');
    setFormData({
      name: '',
      dosage: '',
      frequency: '',
      startDate: '',
      endDate: '',
      refillDate: '',
      prescribedBy: '',
      notes: ''
    });
    setShowModal(true);
  };

  const openEditModal = (prescription) => {
    setModalMode('edit');
    setFormData({
      name: prescription.name,
      dosage: prescription.dosage,
      frequency: prescription.frequency,
      startDate: prescription.startDate,
      endDate: prescription.endDate,
      refillDate: prescription.refillDate,
      prescribedBy: prescription.prescribedBy,
      notes: prescription.notes
    });
    setEditId(prescription.id);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalMode === 'create') {
        // In a real app, this would be an API call
        // const response = await axios.post('/api/prescriptions', formData);
        
        // Simulate API response for prototype
        const newPrescription = {
          id: prescriptions.length + 1,
          ...formData
        };
        
        setPrescriptions(prev => [...prev, newPrescription]);
        setFilteredPrescriptions(prev => [...prev, newPrescription]);
      } else {
        // In a real app, this would be an API call
        // const response = await axios.put(`/api/prescriptions/${editId}`, formData);
        
        // Update local state for prototype
        const updated = prescriptions.map(prescription => 
          prescription.id === editId ? { ...formData, id: editId } : prescription
        );
        setPrescriptions(updated);
        setFilteredPrescriptions(updated);
      }
      
      setShowModal(false);
    } catch (error) {
      console.error('Error saving prescription:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this prescription?')) {
      try {
        // In a real app, this would be an API call
        // await axios.delete(`/api/prescriptions/${id}`);
        
        // Update local state for prototype
        const updated = prescriptions.filter(prescription => prescription.id !== id);
        setPrescriptions(updated);
        setFilteredPrescriptions(updated);
      } catch (error) {
        console.error('Error deleting prescription:', error);
      }
    }
  };

  // Calculate days remaining until refill
  const calculateDaysRemaining = (refillDate) => {
    const today = new Date();
    const refill = new Date(refillDate);
    const diffTime = refill - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Prescriptions</h1>
          <p className="text-gray-600 mt-1">Manage your medications and refills</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Prescription
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-4 border-b">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search prescriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        {filteredPrescriptions.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredPrescriptions.map((prescription) => (
              <div key={prescription.id} className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center">
                      <Pill className="h-5 w-5 text-blue-500 mr-2" />
                      <h2 className="text-xl font-semibold text-gray-900">
                        {prescription.name} ({prescription.dosage})
                      </h2>
                    </div>
                    <p className="text-gray-600 mt-1">Prescribed by: {prescription.prescribedBy}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => openEditModal(prescription)}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(prescription.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Frequency</p>
                      <p className="text-gray-900">{prescription.frequency}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Duration</p>
                      <p className="text-gray-900">{prescription.startDate} to {prescription.endDate}</p>
                    </div>
                  </div>
                  
                  {prescription.refillDate && (
                    <div className="flex items-start">
                      <div className="h-5 w-5 text-gray-400 mr-2">🔄</div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Refill By</p>
                        <div className="flex items-center">
                          <p className="text-gray-900 mr-2">{prescription.refillDate}</p>
                          {calculateDaysRemaining(prescription.refillDate) <= 7 && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                              {calculateDaysRemaining(prescription.refillDate)} day{calculateDaysRemaining(prescription.refillDate) !== 1 ? 's' : ''} left
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {prescription.notes && (
                    <div className="flex items-start col-span-full">
                      <div className="h-5 w-5 text-gray-400 mr-2">📝</div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Notes</p>
                        <p className="text-gray-900">{prescription.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">No prescriptions found.</p>
            <button
              onClick={openCreateModal}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add a Prescription
            </button>
          </div>
        )}
      </div>
      
      {/* Create/Edit Prescription Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {modalMode === 'create' ? 'Add New Prescription' : 'Edit Prescription'}
                  </h3>
                  <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-500">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Medication Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">Dosage</label>
                      <input
                        type="text"
                        name="dosage"
                        id="dosage"
                        value={formData.dosage}
                        onChange={handleChange}
                        required
                        placeholder="e.g., 10mg, 500mg, etc."
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">Frequency</label>
                      <select
                        name="frequency"
                        id="frequency"
                        value={formData.frequency}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a frequency</option>
                        {frequencyOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                          type="date"
                          name="startDate"
                          id="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                          type="date"
                          name="endDate"
                          id="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="refillDate" className="block text-sm font-medium text-gray-700">Refill Date</label>
                      <input
                        type="date"
                        name="refillDate"
                        id="refillDate"
                        value={formData.refillDate}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="prescribedBy" className="block text-sm font-medium text-gray-700">Prescribed By</label>
                      <input
                        type="text"
                        name="prescribedBy"
                        id="prescribedBy"
                        value={formData.prescribedBy}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                      <textarea
                        name="notes"
                        id="notes"
                        rows="3"
                        value={formData.notes}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {modalMode === 'create' ? 'Add Prescription' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;