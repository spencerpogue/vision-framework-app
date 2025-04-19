
import React, { useState } from 'react';

export default function VisionStepperForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    {
      title: "V - Values & Vulnerability",
      prompts: [
        { label: "What personal values drive you?", name: "values" },
        { label: "What moments shaped your leadership?", name: "leadership" },
        { label: "When have you felt most connected to your purpose?", name: "purpose" }
      ]
    },
    {
      title: "I - Impact Intentions",
      prompts: [
        { label: "What kind of impact do you want your organization to have?", name: "impact" },
        { label: "Who should be empowered by your work?", name: "empowered" }
      ]
    },
    {
      title: "S - Strategic Anchors",
      prompts: [
        { label: "What are your top 3 strategic goals?", name: "goals" },
        { label: "What metrics define success?", name: "metrics" }
      ]
    },
    {
      title: "I - Identity & Inclusion",
      prompts: [
        { label: "How does your identity influence your leadership?", name: "identity" },
        { label: "How do you want to be remembered?", name: "legacy" }
      ]
    },
    {
      title: "O - Organizational Aspiration",
      prompts: [
        { label: "Where do you want your organization to be in 10 years?", name: "future" },
        { label: "What legacy are you building?", name: "vision_legacy" }
      ]
    },
    {
      title: "N - Narrative Synthesis",
      prompts: [
        { label: "Write a short narrative that captures your vision.", name: "narrative" },
        { label: "Now distill that into a 1–2 sentence vision statement.", name: "statement" }
      ]
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Georgia, serif', textAlign: 'center' }}>
        <h2>Thank you for completing the VISION Framework!</h2>
        <p>Your responses have been submitted.</p>
      </div>
    );
  }

  const currentStep = steps[step];

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ color: '#002147' }}>{currentStep.title}</h2>
      {currentStep.prompts.map((prompt) => (
        <div key={prompt.name} style={{ margin: '20px 0' }}>
          <label>{prompt.label}</label>
          <textarea name={prompt.name} value={formData[prompt.name] || ''} onChange={handleChange} rows="4" style={{ width: '100%' }} />
        </div>
      ))}
      <div style={{ marginTop: '20px' }}>
        {step > 0 && <button type="button" onClick={() => setStep(step - 1)}>Back</button>}
        {step < steps.length - 1 ? (
          <button type="button" onClick={() => setStep(step + 1)} style={{ marginLeft: '10px' }}>Next</button>
        ) : (
          <button type="submit" style={{ marginLeft: '10px' }}>Submit</button>
        )}
      </div>
    </form>
  );
}
