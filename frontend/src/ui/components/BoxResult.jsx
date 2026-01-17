import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

export const BoxResultComponent = ({ onDone, result }) => {
  const [step, setStep] = useState(0);
  const CURSOR_CLASS = "custom-type-animation-cursor";

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
      <AnimatedText
        text={result.role}
        cursorClass={CURSOR_CLASS}
        onDone={() => setStep(1)}
      />

      {step >= 1 && (
        <AnimatedText
          text={result.jobRecommend}
          cursorClass={CURSOR_CLASS}
          style={{ whiteSpace: "pre-line" }}
          onDone={() => setStep(2)}
        />
      )}

      {step >= 2 && (
        <AnimatedText
          text={result.skillRecommend}
          cursorClass={CURSOR_CLASS}
          onDone={onDone}
        />
      )}
    </div>
  );
};

const AnimatedText = ({ text, style, cursorClass, onDone }) => (
  <TypeAnimation
    wrapper="div"
    repeat={0}
    cursor={false}
    style={style}
    className={`mb-3 text-justify ${cursorClass}`}
    sequence={[text, (el) => el.classList.remove(cursorClass), onDone]}
  />
);
