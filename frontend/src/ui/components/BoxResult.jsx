import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

export const BoxResultComponent = ({ onDone, result }) => {
  const [step, setStep] = useState(0);

  if (result.error) {
    return (
      <div className="border-2 p-4 border-(--light) rounded-xl text-sm md:text-base leading-relaxed space-y-2">
        <TypeAnimation
          sequence={[result.msg, () => onDone()]}
          wrapper="div"
          repeat={0}
          cursor={false}
          className="text-red-600"
        />
      </div>
    );
  }

  return (
    <div className="border-2 p-4 border-(--light) rounded-xl text-sm md:text-base leading-relaxed space-y-2">
      <TypeAnimation
        sequence={[result.role, () => setStep(1)]}
        wrapper="div"
        repeat={0}
        cursor={false}
        className="mb-3 text-justify"
      />

      {step >= 1 && (
        <TypeAnimation
          sequence={[result.jobRecommend, () => setStep(2)]}
          wrapper="div"
          repeat={0}
          cursor={false}
          className="mb-3 text-justify"
        />
      )}

      {step >= 2 && (
        <TypeAnimation
          sequence={[result.skillRecommend, () => onDone()]}
          wrapper="div"
          repeat={0}
          cursor={false}
          className="mb-3 text-justify"
        />
      )}
    </div>
  );
};
