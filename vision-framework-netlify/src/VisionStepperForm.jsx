
import React, { useState } from 'react';

export default function VisionStepperForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Logic to submit to HubSpot API
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Georgia, serif' }}>
      <h1 style={{ textAlign: 'center', color: '#002147' }}>VISION Framework</h1>
      <p style={{ textAlign: 'center' }}>Step {step + 1} of 7</p>
      {/* Placeholder: Replace with actual step components */}
      <button onClick={() => setStep(step + 1)}>Next</button>
    </div>
  );
}
