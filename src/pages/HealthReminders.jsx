import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Clock, Plus, X, Edit, Trash } from 'lucide-react';
import axios from 'axios';

const HealthReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    date: '',
    recurring: false,
    days: []
  });
  const [editId, setEditId] = useState(null);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchReminders = async () => {
      try {
        // const response = await axios.get('/api/reminders');
        // setReminders(response.data);
        
        // Mock data for prototype
        const mockReminders = [
          { 
            id: 1, 
            title: 'Take Medication', 
            description: 'Lisinopril 10mg',
            time: '08:00', 
            recurring: true, 
            days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            date: null
          },
          { 
            id: 2, 
            title: 'Check Blood Pressure', 
            description: 'Record results in health journal',
            time: '19:00', 
            recurring: true, 
            days: ['Mon', 'Wed', 'Fri'],
            date: null
          },
          { 
            id: 3, 
            title: 'Annual Physical Examination', 
            description: 'With Dr. Emily Rodriguez',
            time: '14:30', 
            recurring: false, 
            days: [],
            date: '2025-05-15'
          },
          { 
            id: 4, 
            title: 'Eye Appointment', 
            description: 'Vision check with Dr. Thompson',
            time: '10:00', 
            recurring: false, 
            days: [],
            date: '2025-06-10'
          }
        ];
        
        setReminders(mockReminders);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };

    fetchReminders();
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setFormData({
      title: '',
      description: '',
      time: '',
      date: '',
      recurring: false,
      days: []
    });
    setShowModal(true);
  };

  const openEditModal = (reminder) => {
    setModalMode('edit');
    setFormData({
      title: reminder.title,
      description: reminder.description || '',
      time: reminder.time,
      date: reminder.date || '',
      recurring: reminder.recurring,
      days: reminder.days || []
    });
    setEditId(reminder.id);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDayToggle = (day) => {
    setFormData(prev => {
      const days = [...prev.days];
      if (days.includes(day)) {
        return { ...prev, days: days.filter(d => d !== day) };
      } else {
        return { ...prev, days: [...days, day] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalMode === 'create') {
        // In a real app, this would be an API call
        // const response = await axios.post('/api/reminders', formData);
        
        // Simulate API response for prototype
        const newReminder = {
          id: reminders.length + 1,
          ...formData
        };
        
        setReminders(prev => [...prev, newReminder]);
      } else {
        // In a real app, this would be an API call
        // const response = await axios.put(`/api/reminders/${editId}`, formData);
        
        // Update local state for prototype
        setReminders(prev => 
          prev.map(reminder => reminder.id === editId ? { ...formData, id: editId } : reminder)
        );
      }
      
      setShowModal(false);
    } catch (error) {
      console.error('Error saving reminder:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      try {
        // In a real app, this would be an API call
        // await axios.delete(`/api/reminders/${id}`);
        
        // Update local state for prototype
        setReminders(prev => prev.filter(reminder => reminder.id !== id));
      } catch (error) {
        console.error('Error deleting reminder:', error);
      }
    }
  };

  // Format time for display (24h to 12h)
  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHours = h % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const getUpcomingReminders = () => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today.getDay()];
    
    // Filter for today's reminders (one-time or recurring)
    return reminders.filter(reminder => 
      (!reminder.recurring && reminder.date === todayStr) || 
      (reminder.recurring && reminder.days.includes(dayOfWeek))
    );
  };

  const getUpcomingOneTimeReminders = () => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Filter for upcoming one-time reminders
    return reminders.filter(reminder => 
      !reminder.recurring && reminder.date >= todayStr
    ).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const upcomingReminders = getUpcomingReminders();
  const upcomingOneTimeReminders = getUpcomingOneTimeReminders();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health Reminders</h1>
          <p className="text-gray-600 mt-1">Set up reminders for medications and appointments</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Reminder
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Reminders */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-yellow-500 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Today's Reminders</h2>
          </div>
          <div className="p-6">
            {upcomingReminders.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {upcomingReminders.map(reminder => (
                  <li key={reminder.id} className="py-4 flex justify-between items-center">
                    <div className="flex items-start">
                      <Bell className="h-5 w-5 text-yellow-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">{reminder.title}</p>
                        {reminder.description && (
                          <p className="text-sm text-gray-600">{reminder.description}</p>
                        )}
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600">{formatTime(reminder.time)}</span>
                          {reminder.recurring && (
                            <span className="ml-3 text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              Recurring
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(reminder)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(reminder.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No reminders for today.</p>
                <button
                  onClick={openCreateModal}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Reminder
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-500 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Upcoming Events</h2>
          </div>
          <div className="p-6">
            {upcomingOneTimeReminders.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {upcomingOneTimeReminders.map(reminder => (
                  <li key={reminder.id} className="py-4 flex justify-between items-center">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">{reminder.title}</p>
                        {reminder.description && (
                          <p className="text-sm text-gray-600">{reminder.description}</p>
                        )}
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">{reminder.date}</span>
                          </div>
                          <div className="flex items-center ml-3">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">{formatTime(reminder.time)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(reminder)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(reminder.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No upcoming events.</p>
                <button
                  onClick={openCreateModal}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Event
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* All Reminders Section */}
      <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">All Reminders</h2>
        </div>
        
        {reminders.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {reminders.map(reminder => (
              <li key={reminder.id} className="px-6 py-4 flex justify-between items-center">
                <div className="flex items-start">
                  {reminder.recurring ? (
                    <Bell className="h-5 w-5 text-yellow-500 mr-3" />
                  ) : (
                    <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{reminder.title}</p>
                    {reminder.description && (
                      <p className="text-sm text-gray-600">{reminder.description}</p>
                    )}
                    <div className="flex flex-wrap items-center mt-1">
                      <div className="flex items-center mr-3">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">{formatTime(reminder.time)}</span>
                      </div>
                      
                      {reminder.recurring ? (
                        <div className="flex items-center">
                          <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full mr-2">
                            Recurring
                          </span>
                          <div className="flex space-x-1">
                            {daysOfWeek.map(day => (
                              <span 
                                key={day} 
                                className={`text-xs px-1.5 py-0.5 rounded-full ${
                                  reminder.days.includes(day) 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-gray-100 text-gray-400'
                                }`}
                              >
                                {day}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600">{reminder.date}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(reminder)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(reminder.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No reminders have been added yet.</p>
            <button
              onClick={openCreateModal}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Your First Reminder
            </button>
          </div>
        )}
      </div>
      
      {/* Create/Edit Reminder Modal */}
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
                    {modalMode === 'create' ? 'Add New Reminder' : 'Edit Reminder'}
                  </h3>
                  <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-500">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        name="description"
                        id="description"
                        rows="2"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
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
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="recurring"
                        id="recurring"
                        checked={formData.recurring}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="recurring" className="ml-2 block text-sm text-gray-900">
                        Recurring
                      </label>
                    </div>
                    
                    {formData.recurring ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Repeat on</label>
                        <div className="flex flex-wrap gap-2">
                          {daysOfWeek.map(day => (
                            <button
                              key={day}
                              type="button"
                              onClick={() => handleDayToggle(day)}
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                formData.days.includes(day)
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={formData.date}
                          onChange={handleChange}
                          required={!formData.recurring}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {modalMode === 'create' ? 'Add Reminder' : 'Save Changes'}
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

export default HealthReminders;