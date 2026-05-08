import { Check } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

export default function CallToAction() {
  const points = [
    "Moderne websites & webshops op maat",
    "SEO optimalisatie voor betere vindbaarheid",
    "Sterke merkidentiteit en visueel design",
    "Persoonlijke en transparante aanpak",
  ];

  return (
    <section className="bg-fuchsia-600 text-white rounded-md py-8 my-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6">
        {/* Linker kolom */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="mb-6">
            Let's build a modern website or web application that helps your business grow.
          </p>

          {/* <ul className="space-y-3">
            {points.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check size={20} className="text-fuchsia-100 mt-1" />
                <span className="text-fuchsia-100">{point}</span>
              </li>
            ))}
          </ul> */}
        </div>

        {/* Rechter kolom */}
        <div className="flex flex-col items-center justify-center space-y-4">

          <PrimaryButton
            href="https://calendly.com/tahaninawebdeveloper/website-consultatie"
          >
            Make appointment
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
