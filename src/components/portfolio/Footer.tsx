import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#201a18] text-[#faeeeb] py-12 px-4 sm:px-8 border-t border-[#352f2d]">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-[#352f2d]">
          <div className="space-y-1">
            <span className="text-2xl font-bold font-serif-headline text-[#ffdbd0]">VIDYA VANI</span>
            <p className="text-[13px] text-[#ddc0b8]">
              AI-Powered Vernacular Pedagogy and Real-Time Translation for Mother Tongue-Based Primary Education
            </p>
          </div>

          <div className="flex items-center gap-4 text-[13px] text-[#ddc0b8]">
            <span>PALASH MTB-MLE</span>
            <span>·</span>
            <span>NIPUN Bharat FLN</span>
            <span>·</span>
            <span>Government of Jharkhand</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] text-[#8a726b]">
          <p>
            Developed in alignment with the Jharkhand Education Project Council (JEPC) and Department of School Education and Literacy.
          </p>
          <div className="flex items-center gap-4">
            <span>AdiBhashaa (IIT Delhi) Corpus</span>
            <span>·</span>
            <span>CIIL Mysore Dictionaries</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
