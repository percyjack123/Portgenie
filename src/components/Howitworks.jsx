import React from 'react'
const HowItWorksStep = ({ number, title, description, align = 'right', isFirst = false, isLast = false }) => {
  const TextBox = () => (
    <div className="overflow-clip bg-linear-to-br from-[#f1610122] to-[#23222218] border border-[#E85102] p-6 m-4 sm:m-8 rounded-[35px] text-left">
      <h4 className="font-semibold text-white text-xl mb-2">{title}</h4>
      <p className="text-gray-300">{description}</p>
    </div>
  );

  const TimelineElement = () => (
    <div className="flex flex-col items-center h-full">
      <div className={`w-0.5 h-full ${isFirst ? 'bg-transparent' : 'bg-[#E85102]'}`}></div>
      <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#E85102] text-white text-2xl font-bold bg-linear-to-br from-[#f1610122] to-[#23222218]">
        {number}
      </div>
      <div className={`w-0.5 h-full ${isLast ? 'bg-transparent' : 'bg-[#E85102]'}`}></div>
    </div>
  );

  return (
    <>
      {align === 'left' ? <TextBox /> : <div className="hidden sm:block"></div>}
      <TimelineElement />
      {align === 'right' ? <TextBox /> : <div className="hidden sm:block"></div>}
    </>
  );
}

const Howitworks = () => {
  return (
    <section id="howitworks" className="py-20 w-full text-white">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] max-w-5xl mx-auto">
        <HowItWorksStep 
          number={1} 
          title="Input Your Details"
          description="Fill in your profile info — name, bio, skills, and social links — through a simple and user-friendly form."
          align="right"
          isFirst={true}
        />
        <HowItWorksStep 
          number={2} 
          title="Choose a Template"
          description="Select from curated, responsive templates built with modern design principles. Preview how your portfolio will look in real time."
          align="left"
        />
        <HowItWorksStep 
          number={3} 
          title="Generate & Export"
          description="With one click, your personalized portfolio is ready to share, download as a static site, or deploy directly via Vercel or GitHub."
          align="right"
          isLast={true}
        />
      </div>
    </section>
  );
}

export default Howitworks;