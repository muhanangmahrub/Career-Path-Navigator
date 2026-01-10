import { BookOpenText } from "lucide-react";

export const HeroSection = ({ promptRef, overviewRef }) => {
  const scroll = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="text-white max-w-4xl cursor-default">
        <h1
          className="font-bold leading-tight
          text-3xl
          sm:text-4xl
          md:text-5xl
          lg:text-6xl
          xl:text-7xl
        "
        >
          Next Step: Karierku
        </h1>

        <h2 className="mt-3 text-base sm:text-lg md:text-xl lg:text-2xl text-white/90">
          Sistem Rekomendasi Jalur Karier Berbasis Machine Learning
        </h2>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => scroll(promptRef)}
          className="
            px-6 py-3
            rounded-xl
            border border-white/60
            text-white
            text-sm sm:text-base
            bg-white/10
            hover:bg-white/30
            transition
            cursor-pointer
          "
        >
          Coba Analisis
        </button>

        <button
          onClick={() => scroll(overviewRef)}
          className="
            px-6 py-3
            rounded-xl
            text-(--primary)
            hover:text-white
            text-sm sm:text-base
            bg-white
            hover:bg-white/30
            transition
            cursor-pointer
          "
        >
          <BookOpenText size={25} />
        </button>
      </div>
    </section>
  );
};
