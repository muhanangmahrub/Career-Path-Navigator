import {
  LayoutGrid,
  Briefcase,
  Cpu,
  Calculator,
  Users,
  Hotel,
  GraduationCap,
  Factory,
  Palette,
} from "lucide-react";

export const OverviewComponent = () => {
  const jobFunctions = [
    { label: "Creative & Media", icon: Palette },
    { label: "Education", icon: GraduationCap },
    { label: "Engineering", icon: Cpu },
    { label: "Finance & Accounting", icon: Calculator },
    { label: "HR & Administration", icon: Users },
    { label: "Hospitality & Service", icon: Hotel },
    { label: "IT & Software", icon: LayoutGrid },
    { label: "Manufacturing & Operations", icon: Factory },
    { label: "Sales & Marketing", icon: Briefcase },
  ];

  return (
    <section className="w-full px-4 md:px-8 py-8">
      <div className="max-w-6xl">
        <div className="mb-6 text-justify">
          <h2 className="text-xl md:text-2xl font-bold text-(--primary)">
            Next Step: Karierku
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Sistem analisis karier berbasis data yang mengklasifikasikan profil
            pengguna ke dalam kelompok role pekerjaan utama. Pengguna memasukkan
            deskripsi persona serta kumpulan keterampilan yang dimiliki,
            kemudian sistem akan memproses informasi tersebut untuk memetakan
            kecenderungan dengan role pekerjaan yang paling relevan.
          </p>
        </div>

        <h2 className="text-xl md:text-xl font-bold text-(--primary)">
          Role pekerjaan yang digunakan dalam sistem:
        </h2>
        <div
          className="
            mt-4
            flex flex-col gap-2
            sm:grid sm:grid-cols-2 sm:gap-3
            md:grid-cols-3
        "
        >
          {jobFunctions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="
          flex items-center gap-3
          px-3 py-2
          sm:p-3
          rounded-md sm:rounded-lg
          border border-gray-200
          bg-white
          hover:bg-gray-50
          transition
        "
              >
                <div className="p-2 rounded-md bg-(--primary)/10 text-(--primary)">
                  <Icon size={16} />
                </div>

                <span className="text-sm font-medium text-(--primary)">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
