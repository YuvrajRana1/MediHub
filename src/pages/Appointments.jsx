import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Phone, Plus, X } from 'lucide-react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [formData, setFormData] = useState({
    doctorName: '',
    specialty: '',
    date: '',
    time: '',
    location: '',
    notes: '',
    phoneNumber: ''
  });
  const [editId, setEditId] = useState(null);

  // Specialties list for dropdown
  const specialties = [
    'Cardiology',
    'Dermatology',
    'Endocrinology',
    'Gastroenterology',
    'General Practice',
    'Neurology',
    'Obstetrics & Gynecology',
    'Oncology',
    'Ophthalmology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Pulmonology',
    'Radiology',
    'Urology'
  ];

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchAppointments = async () => {
      try {
        // const response = await axios.get('/api/appointments');
        // setAppointments(response.data);
        
        // Mock data for prototype
        const mockAppointments = [
          { 
            id: 1, 
            doctorName: 'Dr. Sarah Johnson', 
            specialty: 'Cardiology', 
            date: '2025-04-20', 
            time: '10:00 AM',
            location: 'City Healthcare Center - 123 Medical Blvd, Suite 101',
            notes: 'Follow-up on blood pressure medication',
            phoneNumber: '(555) 123-4567'
          },
          { 
            id: 2, 
            doctorName: 'Dr. Michael Chen', 
            specialty: 'Dermatology', 
            date: '2025-04-25', 
            time: '2:30 PM',
            location: 'Skin Specialists Clinic - 456 Health Ave',
            notes: 'Annual skin check',
            phoneNumber: '(555) 987-6543'
          },
          { 
            id: 3, 
            doctorName: 'Dr. Emily Rodriguez', 
            specialty: 'General Practice', 
            date: '2025-05-05', 
            time: '9:15 AM',
            location: 'Community Medical Center - 789 Wellness St',
            notes: 'Annual physical examination',
            phoneNumber: '(555) 234-5678'
          }
        ];
        
        setAppointments(mockAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setFormData({
      doctorName: '',
      specialty: '',
      date: '',
      time: '',
      location: '',
      notes: '',
      phoneNumber: ''
    });
    setShowModal(true);
  };

  const openEditModal = (appointment) => {
    setModalMode('edit');
    setFormData({
      doctorName: appointment.doctorName,
      specialty: appointment.specialty,
      date: appointment.date,
      time: appointment.time,
      location: appointment.location,
      notes: appointment.notes,
      phoneNumber: appointment.phoneNumber
    });
    setEditId(appointment.id);
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
        // const response = await axios.post('/api/appointments', formData);
        
        // Simulate API response for prototype
        const newAppointment = {
          id: appointments.length + 1,
          ...formData
        };
        
        setAppointments(prev => [...prev, newAppointment]);
      } else {
        // In a real app, this would be an API call
        // const response = await axios.put(`/api/appointments/${editId}`, formData);
        
        // Update local state for prototype
        setAppointments(prev => 
          prev.map(app => app.id === editId ? { ...formData, id: editId } : app)
        );
      }
      
      setShowModal(false);
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        // In a real app, this would be an API call
        // await axios.delete(`/api/appointments/${id}`);
        
        // Update local state for prototype
        setAppointments(prev => prev.filter(app => app.id !== id));
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 mt-1">Schedule and manage your healthcare appointments</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Appointment
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {appointments.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-xl font-semibold text-gray-900">{appointment.doctorName}</h2>
                    <p className="text-gray-600">{appointment.specialty}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => openEditModal(appointment)}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date & Time</p>
                      <p className="text-gray-900">{appointment.date} at {appointment.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-gray-900">{appointment.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-gray-900">{appointment.phoneNumber}</p>
                    </div>
                  </div>
                  
                  {appointment.notes && (
                    <div className="flex items-start">
                      <div className="h-5 w-5 text-gray-400 mr-2">📝</div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Notes</p>
                        <p className="text-gray-900">{appointment.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">You don't have any scheduled appointments.</p>
            <button
              onClick={openCreateModal}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Schedule an Appointment
            </button>
          </div>
        )}
      </div>
      
      {/* Create/Edit Appointment Modal */}
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
                    {modalMode === 'create' ? 'Schedule New Appointment' : 'Edit Appointment'}
                  </h3>
                  <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-500">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700">Doctor Name</label>
                      <input
                        type="text"
                        name="doctorName"
                        id="doctorName"
                        value={formData.doctorName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Specialty</label>
                      <select
                        name="specialty"
                        id="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a specialty</option>
                        {specialties.map(specialty => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                        <input
                          type="time"
                          name="time"
                          id="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
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
                      {modalMode === 'create' ? 'Schedule Appointment' : 'Save Changes'}
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

export default Appointments;