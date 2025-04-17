import React, { useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar({ activeTab, onTabChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabClick = (tabName) => {
    onTabChange(tabName);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.nav
      className="bg-primary text-white shadow-sm sticky top-0 z-50"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 90 }}
    >
      <div className="container-fluid px-4 py-2 d-flex justify-content-between align-items-center">
        {/* Logo */}
        <motion.span
          className="fw-bold fs-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Digi-Med
        </motion.span>

        {/* Desktop nav */}
        <div className="d-none d-md-flex align-items-center gap-3">
          {['Home', 'My Reports', 'Appointment', 'Medical Prescription', 'Health Reminders'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`btn btn-sm ${
                activeTab === tab ? 'btn-dark' : 'btn-outline-light'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {tab}
            </motion.button>
          ))}

          {/* Bell Icon */}
          <motion.div whileHover={{ scale: 1.1 }} className="position-relative">
            <button className="btn btn-outline-light position-relative">
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {notificationCount}
                </span>
              )}
            </button>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <div className="d-md-none d-flex align-items-center">
          <button className="btn btn-outline-light" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="bg-primary px-3 pb-3 pt-2 d-md-none"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {['Home', 'My Reports', 'Appointment', 'Medical Prescription', 'Health Reminders'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`btn btn-sm w-100 text-start mb-2 ${
                  activeTab === tab ? 'btn-dark' : 'btn-outline-light'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
