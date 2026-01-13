import { useState } from "react";
import SpinWheel from "../Components/SpinWheel/SpinWheel";
import SectionDetails from "../Components/SectionDetails/SectionDetails";
import { spinWheelData } from "../Components/SpinWheel/spinWheelData";

const ResearchCenter = () => {
  const [selected, setSelected] = useState(spinWheelData[0]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="flex justify-center">
          <SpinWheel selectedId={selected.id} onSelect={setSelected} />
        </div>

        <SectionDetails section={selected} />
      </div>
    </div>
  );
};

export default ResearchCenter;
