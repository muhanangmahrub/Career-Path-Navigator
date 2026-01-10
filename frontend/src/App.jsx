import "./App.css";
import { PromptSection } from "./ui/layouts/Prompt";
import { HeroSection } from "./ui/layouts/Hero";
import { OverviewSection } from "./ui/layouts/Overview";

function App() {
  return (
    <>
      <HeroSection />
      <OverviewSection />
      <PromptSection />
    </>
  );
}

export default App;
