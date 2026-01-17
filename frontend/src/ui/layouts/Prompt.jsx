import { useState } from "react";

import { BoxResultComponent } from "../components/BoxResult";
import { SpinnerComponent } from "../components/Spinner";
import { TextAreaComponent } from "../components/TextArea";
import { textResponse } from "../../utils/textRepsonse";
import { validate } from "../../utils/validate";

export const PromptSection = ({ ref }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [result, setResult] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const api = import.meta.env.VITE_API_URL;
  const local = import.meta.env.VITE_LOCAL_URL;
  const user_persona =
    "Saya memiliki pengalaman di bidang manufaktur dan operasional, dengan fokus pada pengawasan proses produksi dan efisiensi kerja. Saya terbiasa bekerja di lingkungan yang terstruktur dengan prosedur yang jelas. Saya memahami pentingnya kualitas produk, keselamatan kerja, dan kelancaran operasional dalam proses manufaktur. Saya sering terlibat dalam pemantauan proses produksi, koordinasi dengan tim, serta memastikantarget operasional tercapai. Saya terbiasa bekerja dengan jadwal dan target yang ketat, serta memahami pentingnya kerja sama tim dalam lingkungan produksi. Saya tertarik pada peningkatan efisiensi proses dan optimalisasi operasional. Saya percaya bahwa perbaikan kecil yang konsisten dapat memberikan dampak besar pada produktivitas. Saya ingin terus berkembang di bidang manufacturing dan operations dengan fokus pada proses yang efektif dan berkelanjutan.";

  const fetchModel = async () => {
    const val = validate(text);
    if (val.error) return setResult(val);

    try {
      const res = await fetch(api ? api : local, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ user_persona, top_k: 5 }),
        body: JSON.stringify({ user_persona: text, top_k: 5 }),
      });

      const data = await res.json();
      const result = textResponse(data);
      setResult(result);
    } catch (err) {
      setResult({
        error: true,
        msg: "Ooppss.. terjadi kesalahan pada server",
      });

      // console.log(err);
    }
  };

  const onGetResult = async () => {
    setIsTyping(true);
    setIsLoading(true);
    setShow(false);

    await fetchModel();

    setIsLoading(false);
    setShow(true);
  };

  const clear = () => {
    setText("");
  };

  return (
    <section
      className="min-h-screen flex flex-col cursor-default"
      id="prompt"
      ref={ref}
    >
      <h2 className="text-white py-6 text-xl sm:text-2xl font-bold text-center">
        Yukk.. Analisis dirimu
      </h2>
      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl mx-auto bg-white/80 p-4 sm:p-6 md:p-10 rounded-2xl shadow-lg shadow-gray-200/60 mb-10">
          <TextAreaComponent
            text={text}
            onChange={(e) => setText(e.target.value)}
            isLoading={isLoading}
            disabled={isTyping || isLoading}
            onGetResult={() => onGetResult()}
            onClear={() => clear()}
          />

          {isLoading && (
            <div className="flex justify-center my-4">
              <SpinnerComponent />
            </div>
          )}

          {show && (
            <BoxResultComponent
              onDone={() => setIsTyping(false)}
              result={result}
            />
          )}
        </div>
      </div>
    </section>
  );
};
