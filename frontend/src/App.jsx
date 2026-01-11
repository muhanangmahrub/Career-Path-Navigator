import "./App.css";
import { PromptSection } from "./ui/layouts/Prompt";
import { HeroSection } from "./ui/layouts/Hero";
import { OverviewSection } from "./ui/layouts/Overview";
import { useRef } from "react";

function App() {
  const promptRef = useRef(null);
  const overviewRef = useRef(null);

  return (
    <>
      <HeroSection promptRef={promptRef} overviewRef={overviewRef} />
      <OverviewSection ref={overviewRef} />
      <PromptSection ref={promptRef} />
    </>
  );
}

export default App;
