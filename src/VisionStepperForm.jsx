
import React, { useState } from 'react';

export default function VisionStepperForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { title: "Start Your Vision", prompts: [
      { label: "What is your email address?", name: "email" }
    ]},
    { title: "V - Values & Vulnerability", prompts: [
      { label: "What personal values drive you?", name: "values" },
      { label: "What moments shaped your leadership?", name: "leadership" },
      { label: "When have you felt most connected to your purpose?", name: "purpose" }
    ]},
    { title: "I - Impact Intentions", prompts: [
      { label: "What kind of impact do you want your organization to have?", name: "impact" },
      { label: "Who should be empowered by your work?", name: "empowered" }
    ]},
    { title: "S - Strategic Anchors", prompts: [
      { label: "What are your top 3 strategic goals?", name: "goals" },
      { label: "What metrics define success?", name: "metrics" }
    ]},
    { title: "I - Identity & Inclusion", prompts: [
      { label: "How does your identity influence your leadership?", name: "identity" },
      { label: "How do you want to be remembered?", name: "legacy" }
    ]},
    { title: "O - Organizational Aspiration", prompts: [
      { label: "Where do you want your organization to be in 10 years?", name: "future" },
      { label: "What legacy are you building?", name: "vision_legacy" }
    ]},
    { title: "N - Narrative Synthesis", prompts: [
      { label: "Write a short narrative that captures your vision.", name: "narrative" },
      { label: "Now distill that into a 1–2 sentence vision statement.", name: "statement" }
    ]}
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const portalId = "242481674";
    const formId = "Buc63eDXR8uQyqIR0dPBSA40d822";

    const fields = Object.keys(formData).map(key => ({
      name: key,
      value: formData[key]
    }));

    const payload = {
      fields,
      context: {
        pageUri: window.location.href,
        pageName: document.title
      }
    };

    try {
      const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("HubSpot submission failed:", await response.text());
        alert("There was an error submitting the form. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Georgia, serif', textAlign: 'center' }}>
        <h2 style={{ color: '#002147' }}>Thank you for completing the VISION Framework!</h2>
        <p>Your responses have been submitted successfully to Spencer & Associates.</p>
      </div>
    );
  }

  const currentStep = steps[step];

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ color: '#002147', fontSize: '28px', marginBottom: '1rem' }}>{currentStep.title}</h2>
      {currentStep.prompts.map((prompt) => (
        <div key={prompt.name} style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>{prompt.label}</label>
          <textarea
            name={prompt.name}
            value={formData[prompt.name] || ''}
            onChange={handleChange}
            rows="4"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}
            required={prompt.name === 'email'}
          />
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} style={{ padding: '10px 20px' }}>
            Back
          </button>
        )}
        {step < steps.length - 1 ? (
          <button type="button" onClick={() => setStep(step + 1)} style={{ padding: '10px 20px', backgroundColor: '#002147', color: '#fff' }}>
            Next
          </button>
        ) : (
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#C5A900', color: '#002147', fontWeight: 'bold' }}>
            Submit
          </button>
        )}
      </div>
    </form>
  );
}
