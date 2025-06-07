// File: App.jsx (Single File All-in-One Implementation)
import React, { useState, useEffect } from 'react';
import './index.css';

const ProgressBar = ({ step }) => {
  const progress = (step / 3) * 100;
  return (
    <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
      <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: '${progress}% '}}></div>
    </div>
  );
};

const Step1 = ({ formData, setFormData }) => (
  <div className="space-y-4">
    <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border p-2 rounded" required />
    <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full border p-2 rounded" required />
  </div>
);

const Step2 = ({ formData, setFormData }) => (
  <div className="space-y-4">
    <input type="text" placeholder="Company Name" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="w-full border p-2 rounded" required />
    <input type="text" placeholder="Industry" value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })} className="w-full border p-2 rounded" required />
    <input type="text" placeholder="Company Size" value={formData.size} onChange={e => setFormData({ ...formData, size: e.target.value })} className="w-full border p-2 rounded" required />
  </div>
);

const Step3 = ({ formData, setFormData }) => (
  <div className="space-y-4">
    <select value={formData.theme} onChange={e => setFormData({ ...formData, theme: e.target.value })} className="w-full border p-2 rounded">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
    <select value={formData.layout} onChange={e => setFormData({ ...formData, layout: e.target.value })} className="w-full border p-2 rounded">
      <option value="grid">Grid</option>
      <option value="list">List</option>
    </select>
  </div>
);

const Dashboard = ({ userData, onLogout }) => (
  <div className="p-6 space-y-6">
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold">Welcome, {userData.name}</h1>
      <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Team Members" count={12} />
      <Card title="Active Projects" count={5} />
      <Card title="Notifications" count={3} />
    </div>
  </div>
);

const Card = ({ title, count }) => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <p className="text-2xl font-bold">{count}</p>
  </div>
);

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', industry: '', size: '', theme: 'light', layout: 'grid'
  });
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('onboardData');
    if (saved) setUserData(JSON.parse(saved));
  }, []);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);
  const handleSubmit = () => {
    localStorage.setItem('onboardData', JSON.stringify(formData));
    setUserData(formData);
  };

  const handleLogout = () => {
    localStorage.removeItem('onboardData');
    setUserData(null);
    setFormData({ name: '', email: '', company: '', industry: '', size: '', theme: 'light', layout: 'grid' });
    setStep(1);
  };

  if (userData) return <Dashboard userData={userData} onLogout={handleLogout} />;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <ProgressBar step={step} />
      {step === 1 && <Step1 formData={formData} setFormData={setFormData} />}
      {step === 2 && <Step2 formData={formData} setFormData={setFormData} />}
      {step === 3 && <Step3 formData={formData} setFormData={setFormData} />}
      <div className="mt-6 flex justify-between">
        {step > 1 && <button onClick={handleBack} className="px-4 py-2 bg-gray-300 rounded">Back</button>}
        {step < 3 ? (
          <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
        ) : (
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>
        )}
      </div>
    </div>
  );
}