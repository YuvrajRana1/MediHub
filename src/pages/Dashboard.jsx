import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Pill, MessageCircle, Bell, MapPin } from 'lucide-react';
//import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [activePrescriptions, setActivePrescriptions] = useState([]);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    // In a real app, these would be actual API calls
    const fetchDashboardData = async () => {
      try {
        // Example API calls
        const appointmentsRes = await axios.get('/api/appointments/upcoming');
        const documentsRes = await axios.get('/api/documents/recent');
        const prescriptionsRes = await axios.get('/api/prescriptions/active');
        const remindersRes = await axios.get('/api/reminders');

        setUpcomingAppointments(appointmentsRes.data);
        setRecentDocuments(documentsRes.data);
        setActivePrescriptions(prescriptionsRes.data);
        setReminders(remindersRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        
        // Placeholder data for prototype
        setUpcomingAppointments([
          { id: 1, doctorName: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: '2025-04-20', time: '10:00 AM' },
          { id: 2, doctorName: 'Dr. Michael Chen', specialty: 'Dermatologist', date: '2025-04-25', time: '2:30 PM' }
        ]);
        
        setRecentDocuments([
          { id: 1, title: 'Blood Test Results', date: '2025-04-10', type: 'Lab Results' },
          { id: 2, title: 'Cardiology Report', date: '2025-04-05', type: 'Medical Report' }
        ]);
        
        setActivePrescriptions([
          { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', refillDate: '2025-05-15' },
          { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', refillDate: '2025-05-10' }
        ]);
        
        setReminders([
          { id: 1, title: 'Take Medication', time: '8:00 AM', recurring: true, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
          { id: 2, title: 'Check Blood Pressure', time: '7:00 PM', recurring: true, days: ['Mon', 'Wed', 'Fri'] }
        ]);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600 mt-1">Here's an overview of your health information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Upcoming Appointments</h2>
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div className="p-4">
            {upcomingAppointments.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {upcomingAppointments.map(appointment => (
                  <li key={appointment.id} className="py-3">
                    <p className="font-medium">{appointment.doctorName}</p>
                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No upcoming appointments</p>
            )}
            <Link to="/appointments" className="mt-3 block text-center text-blue-600 hover:text-blue-800 font-medium">
              Manage Appointments
            </Link>
          </div>
        </div>

        {/* Recent Documents */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-600 px-4 py-3 flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Recent Documents</h2>
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div className="p-4">
            {recentDocuments.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {recentDocuments.map(document => (
                  <li key={document.id} className="py-3">
                    <p className="font-medium">{document.title}</p>
                    <p className="text-sm text-gray-600">{document.type}</p>
                    <p className="text-sm text-gray-600">Date: {document.date}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No recent documents</p>
            )}
            <Link to="/documents" className="mt-3 block text-center text-blue-600 hover:text-blue-800 font-medium">
              View All Documents
            </Link>
          </div>
        </div>

        {/* Active Prescriptions */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-purple-600 px-4 py-3 flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Active Prescriptions</h2>
            <Pill className="h-5 w-5 text-white" />
          </div>
          <div className="p-4">
            {activePrescriptions.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {activePrescriptions.map(prescription => (
                  <li key={prescription.id} className="py-3">
                    <p className="font-medium">{prescription.name} ({prescription.dosage})</p>
                    <p className="text-sm text-gray-600">Take: {prescription.frequency}</p>
                    <p className="text-sm text-gray-600">Refill by: {prescription.refillDate}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No active prescriptions</p>
            )}
            <Link to="/prescriptions" className="mt-3 block text-center text-blue-600 hover:text-blue-800 font-medium">
              Manage Prescriptions
            </Link>
          </div>
        </div>

        {/* Health Reminders */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-yellow-500 px-4 py-3 flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Health Reminders</h2>
            <Bell className="h-5 w-5 text-white" />
          </div>
          <div className="p-4">
            {reminders.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {reminders.map(reminder => (
                  <li key={reminder.id} className="py-3">
                    <p className="font-medium">{reminder.title}</p>
                    <p className="text-sm text-gray-600">Time: {reminder.time}</p>
                    {reminder.recurring && (
                      <p className="text-sm text-gray-600">
                        Days: {reminder.days.join(', ')}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No active reminders</p>
            )}
            <Link to="/reminders" className="mt-3 block text-center text-blue-600 hover:text-blue-800 font-medium">
              Manage Reminders
            </Link>
          </div>
        </div>

        {/* AI Assistant */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-red-500 px-4 py-3 flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">AI Health Assistant</h2>
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <div className="p-4">
            <p className="text-gray-600 mb-4">
              Describe your symptoms to our AI assistant to get preliminary health advice.
            </p>
            <Link to="/ai-assistant" className="block text-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-150 ease-in-out">
              Chat with Assistant
            </Link>
          </div>
        </div>

        {/* Find Providers */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-teal-500 px-4 py-3 flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Find Healthcare Providers</h2>
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <div className="p-4">
            <p className="text-gray-600 mb-4">
              Find doctors and hospitals near you based on specialty, ratings, and availability.
            </p>
            <Link to="/find-providers" className="block text-center bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-150 ease-in-out">
              Search Providers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;