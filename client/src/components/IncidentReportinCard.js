import React from "react";

const IncidentReportinCard = ({ image, title, desc, tel }) => {
  return (
    <div>
      <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-sm">
        <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md bg-gradient-to-r from-[#FAA845] to-[#FBEABF]">
          <img
            src={image}
            alt="card-image"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <h6 className="text-slate-800 text-xl font-semibold">{title}</h6>
          </div>
          <p className="text-slate-600 leading-normal font-light">{desc}</p>
        </div>

        <div className="px-4 pb-4 pt-0 mt-2">
          <button className="w-full rounded-md bg-[#FAA845] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-[slate-700] focus:shadow-none active:bg-slate-700 hover:bg-[#c74343] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            <a href={tel}>Call Now</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentReportinCard;
