import { Eraser } from "lucide-react";

export const TextAreaComponent = ({
  text,
  onChange,
  disabled,
  isLoading,
  onGetResult,
  onClear,
}) => {
  const placeholder =
    "Ceritakan latar belakang, pengalaman, serta keterampilan yang anda miliki, termasuk bidang kerja dan aktivitas yang sering anda lakukan.";
  const maxChar = 1000;

  return (
    <div>
      <label
        htmlFor="message"
        className="block mb-2.5 font-medium text-heading ms-1"
      >
        Deskripsikan dirimu
      </label>

      <textarea
        id="message"
        rows="4"
        maxLength={maxChar}
        value={text}
        onChange={onChange}
        disabled={disabled}
        className={`resize-none min-h-28 border-2 text-heading block w-full p-3.5 rounded-2xl
                    bg-neutral-secondary-medium placeholder:text-body shadow-xs
                   focus:border-(--primary) focus:ring-0 focus:outline-none 
                    ${isLoading ? "border-gray-400" : "border-(--light)"}`}
        placeholder={placeholder}
      />

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={onGetResult}
            disabled={disabled}
            className={`px-4 py-2 rounded-lg text-white  my-2
            ${
              disabled
                ? "bg-gray-400 cursor-default "
                : "bg-(--light) hover:bg-(--primary) cursor-pointer"
            }`}
          >
            Analisis
          </button>

          <div
            onClick={onClear}
            className={`p-2 rounded-lg text-white
              ${
                disabled
                  ? "bg-rose-300 cursor-default"
                  : " bg-rose-500 hover:bg-rose-700 cursor-pointer "
              }`}
          >
            <Eraser />
          </div>
        </div>

        <span className="text-sm text-gray-500 me-3 mt-2">
          {text.length} / {maxChar}
        </span>
      </div>
    </div>
  );
};
