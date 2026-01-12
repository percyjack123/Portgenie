import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Step1Profile from "./Step1Profile";
import Step2Template from "./Step2Template";
import Step3Content from "./Step3Content";
import Step4Prompt from "./Step4Prompt";
import Step5Result from "./Step5Result";

const CreateProjectWizard = () => {
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState({
    meta: {},
    design: {},
    content: {},
    aiPrompt: ""
  });

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="flex min-h-screen bg-[#0A0502] text-white">
      <Sidebar />

      <div className="flex flex-col w-full items-center p-6">
        {step === 1 && (
          <Step1Profile data={projectData} setData={setProjectData} next={next} />
        )}
        {step === 2 && (
          <Step2Template data={projectData} setData={setProjectData} next={next} back={back} />
        )}
        {step === 3 && (
          <Step3Content data={projectData} setData={setProjectData} next={next} back={back} />
        )}
        {step === 4 && (
          <Step4Prompt data={projectData} setData={setProjectData} next={next} back={back} />
        )}
        {step === 5 && (
          <Step5Result data={projectData} back={back} />
        )}
      </div>
    </div>
  );
};

export default CreateProjectWizard;
