

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MyReports from './components/MyReports';
import Appointment from './components/Appointment';
import MedicalPrescription from './components/MedicalPrescription';
import HealthReminders from './components/HealthReminders';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar activeTab={activeTab} onTabChange={handleTabClick} />

      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        <div className="container-fluid">
          {activeTab === 'Home' && <Home />}
          {activeTab === 'My Reports' && <MyReports />}
          {activeTab === 'Appointment' && <Appointment />}
          {activeTab === 'Medical Prescription' && <MedicalPrescription />}
          {activeTab === 'Health Reminders' && <HealthReminders />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
