import { LanguageSelector } from "./language-select";
import { SeedUserStep } from "./seed-user";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function SetupWizardPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      step: 1,
      header: "Welcome to Docuisine!",
      message:
        "This wizard will guide you through the setup process. To begin, please select your preferred display language.",
      component: <LanguageSelector />,
    },
    {
      step: 2,
      header: "Create your Admin account",
      message:
        "Docuisine supports multiple users. For now, let's create your admin account.",
      component: <SeedUserStep />,
    },
  ];

  const current = steps[currentStep - 1];

  function handleNext(e: React.MouseEvent) {
    e.preventDefault();
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  }

  function handleBack(e: React.MouseEvent) {
    e.preventDefault();
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submit wizard");
  }

  return (
    <div className="text-start w-sm md:w-md lg:w-lg mx-auto py-16">
      <h1 className="text-3xl font-bold mb-4 w-fit">{current.header}</h1>

      <p className="mb-6">{current.message}</p>

      <form onSubmit={handleSubmit}>
        {current.component}

        <div className="flex justify-between mt-6">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < steps.length ? (
            <Button type="button" onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit">Finish</Button>
          )}
        </div>
      </form>
    </div>
  );
}
