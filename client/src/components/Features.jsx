//import React from 'react';
import { MdOutlineQuestionAnswer } from 'react-icons/md';
import { BiSelectMultiple } from 'react-icons/bi';
import { GrCertificate } from 'react-icons/gr';

const Features = () => {
  return (
    <section className="max-padd-container py-16 xl:py-32 ">
      {/* Title */}
      <div className="text-center mb-12">
        <h6 className="capitalize">Few steps to your home</h6>
        <h2 className="h2 capitalize">This is how easy it can be</h2>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 ">
        {/* First Feature */}
        {/* <div className="flex flex-col items-center text-center"> */}
        <div className="bg-slate-50 p-4 rounded-3x1 ">
          <MdOutlineQuestionAnswer className="bold-32 mb-3 text-secondary " />
          <h4 className="h4">Answer Questions</h4>
          {/* <h4 className="font-semibold text-lg">Answer Questions</h4> */}
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti consequuntur dolorum maxime in voluptas. Eum, quaerat.
          </p>
        </div>

        {/* Second Feature */}
        <div className="bg-slate-50 p-4 rounded-3x1 ">
          <BiSelectMultiple className="bold-32 mb-3 text-red-600"  />
          <h4 className="h4">Select Property</h4>
          {/* <h4 className="font-semibold text-lg">Select Property</h4> */}
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti consequuntur dolorum maxime in voluptas. Eum, quaerat.
          </p>
        </div>

         {/* Third Feature */}
        <div className="bg-slate-50 p-4 rounded-3x1 ">
          <GrCertificate className="bold-32 mb-3 text-yellow-500" />
          <h4 className="h4">Enjoy Living</h4>
          {/* <h4 className="font-semibold text-lg">Enjoy Living</h4> */}
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti consequuntur dolorum maxime in voluptas. Eum, quaerat.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
