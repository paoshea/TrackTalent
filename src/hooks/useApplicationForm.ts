import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Submit application logic here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/application/success");
    } catch (error) {
      console.error("Failed to submit application:", error);
    }
  };

  return {
    currentStep,
    nextStep,
    prevStep,
    handleSubmit,
  };
}
