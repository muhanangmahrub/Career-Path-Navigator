import { useState } from "react";

import { BoxResultComponent } from "../components/BoxResult";
import { SpinnerComponent } from "../components/Spinner";
import { TextAreaComponent } from "../components/TextArea";
import { textResponse } from "../../utils/textRepsonse";

export const PromptSection = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [result, setResult] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const api = import.meta.env.VITE_API_URL;
  const local = import.meta.env.VITE_LOCAL_URL;
  const user_persona =
    "Saya merupakan mahasiswa fresh graduate yang memiliki ketertarikan besar di bidang kreatif dan media. Selama masa perkuliahan, saya aktif mempelajari dasar-dasar desain visual, produksi konten digital, dan komunikasi kreatif. Saya terbiasa mengerjakan tugas kuliah yang berkaitan dengan pembuatan konten media sosial, desain poster, presentasi visual, serta penulisan konten sederhana. Saya memiliki minat kuat pada storytelling visual dan bagaimana sebuah pesan dapat disampaikan secara menarik kepada audiens. Saya terbiasa bekerja dengan tools desain dasar dan senang mengikuti tren media digital serta perkembangan platform sosial. Sebagai fresh graduate, saya terbuka untuk belajar, menerima masukan, dan mengembangkan kemampuan kreatif saya melalui pengalaman kerja di industri kreatif dan media.";

  const fetchModel = async () => {
    if (!text || text.trim() === "") {
      setResult({
        error: true,
        msg: "Ooppss.. deskripsi diri tidak boleh kosong",
      });
      return;
    }

    try {
      const res = await fetch(api ? api : local, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ user_persona }),
        body: JSON.stringify({ user_persona: text }),
      });

      const data = await res.json();
      const result = textResponse(data);
      setResult(result);
    } catch (err) {
      setResult({
        error: true,
        msg: "Ooppss.. terjadi kesalahan pada server",
      });

      console.log(err);
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
    <section className="min-h-screen flex flex-col" id="prompt">
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
