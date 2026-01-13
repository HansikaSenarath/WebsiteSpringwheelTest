import React from "react";
import arrowImg from "../../assets/arrow.png";

const SectionDetails = ({ section }) => {
  if (!section) return null;

  return (
    <div className="flex flex-col gap-8 max-w-2xl bg-white p-8 isolate">
      {/* Title Section */}
      <div className="bg-transparent">
        <h2 className="text-5xl font-bold text-[#00346e] bg-transparent">
          {section.title}
        </h2>
      </div>

      {/* Description with ID */}
      <div className="space-y-4 bg-transparent">
        <div className="flex gap-6 items-start bg-transparent">
          {/* ID Badge */}
          <div className="flex-shrink-0 bg-transparent">
            <div className="flex items-center justify-center bg-transparent">
              <span className="text-[#00346e] text-3xl font-bold bg-transparent">
                {section.id}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="flex-1 pt-2 bg-transparent">
            <p className="text-gray-700 text-bold text-[20px] leading-relaxed font-medium bg-transparent">
              {section.description}
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Application Section */}
      {section.leadershipApplication &&
        section.leadershipApplication.length > 0 && (
          <div className="mt-6 space-y-4 bg-transparent">
            
            {/* Arrow + Title */}
            <div className="flex flex-col items-center gap-2 bg-transparent">
              <img
                src={arrowImg}
                alt="arrow"
                className="w-25 h-25 bg-transparent"
              />
              <h3 className="text-2xl font-bold text-gray-900 bg-transparent">
                Leadership Application
              </h3>
            </div>

            {/* ✅ GRADIENT CARD (FULLY ISOLATED) */}
            <div className="rounded-xl p-8 shadow-md isolate bg-gradient-to-r from-white via-white to-[#bbe7f4]">
              
              {/* Force-remove index.css background */}
              <div className="space-y-4 !bg-transparent">
                {section.leadershipApplication.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-start !bg-transparent"
                  >
                    <div className="flex-shrink-0 mt-1.5 !bg-transparent">
                      <span className="text-gray-600 text-lg font-bold !bg-transparent">
                        •
                      </span>
                    </div>

                    {/* TEXT AREA – index.css bg REMOVED */}
                    <p className="text-gray-600 text-[20px] leading-relaxed font-medium flex-1 !bg-transparent">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default SectionDetails;
