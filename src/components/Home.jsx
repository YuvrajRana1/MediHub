import React from 'react';

function Home() {
  return (
    <div className="container-fluid py-4">
      <div className="bg-white rounded shadow p-4 mb-4">
        <h1 className="display-5 fw-bold text-primary mb-3">Welcome to Digi-Med</h1>
        <p className="text-secondary fs-5">
          Your digital healthcare companion for managing medical records, appointments, and prescriptions.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="p-4 rounded bg-primary-subtle text-primary shadow-sm h-100 hover-shadow transition">
            <h5 className="fw-semibold">My Reports</h5>
            <p className="text-muted small">Access and manage all your medical reports in one place.</p>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="p-4 rounded bg-success-subtle text-success shadow-sm h-100 hover-shadow transition">
            <h5 className="fw-semibold">Appointments</h5>
            <p className="text-muted small">Schedule and keep track of your medical appointments.</p>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="p-4 rounded bg-purple text-light shadow-sm h-100 hover-shadow transition" style={{ backgroundColor: "#6f42c1" }}>
            <h5 className="fw-semibold">Medical Prescriptions</h5>
            <p className="text-light small">View and manage your medication prescriptions.</p>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="p-4 rounded bg-warning-subtle text-warning shadow-sm h-100 hover-shadow transition">
            <h5 className="fw-semibold">Health Reminders</h5>
            <p className="text-muted small">Stay on top of your health with timely reminders.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
