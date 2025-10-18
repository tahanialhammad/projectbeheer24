import HeroSection from '@/components/HeroSection';
import SiteLayout from '@/layouts/site-layout';

export default function About() {
    return (
        <SiteLayout title="About">
            <HeroSection title="Hi, ik ben Tahani" />
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-12">
          {/* Linker kolom */}
          <div className="">
            <h2 className="text-xl font-bold mb-4">
              Freelance webontwikkelaar en oprichter van Tahanina
            </h2>
            <p>
              Ik bouw websites en webapplicaties die niet alleen werken, maar
              ook spreken. Vanuit Groningen help ik ondernemers met alles van
              WordPress tot maatwerk Laravel software.
            </p>
          </div>

          {/* Rechter kolom */}
          <div className="rounded-lg">
            <img
              src="./images//tahanina.png"
              alt="about tahanina"
              className="object-cover rounded-xl my-4 shadow-2xl"
            />
  
          </div>
        </div>

        <section className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">
                Heldere communicatie
              </h3>
              <p className="text-neutral-600">
                Vanaf het begin weet je waar je aan toe bent – ik leg alles
                duidelijk uit, zonder vakjargon.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">Samenwerking</h3>
              <p className="text-neutral-600">
                Ik denk actief met je mee en neem beslissingen in overleg – we
                creëren het eindresultaat echt samen.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">Duidelijke prijzen</h3>
              <p className="text-neutral-600">
                Geen verborgen kosten – je krijgt altijd vooraf een transparante
                offerte, zodat je precies weet waar je aan toe bent.
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-12">
          {/* Linker kolom */}
          <div className="relative w-full h-80">
            <img
              src="./images/man-uses-laptop-closeup-male-hands-neon-lighting.jpg"
              alt="Over Tahanina"
              className="object-cover rounded-xl"
            />
          </div>

          {/* Rechter kolom */}
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Waarom Tahanina?</h2>
            <p>
              Tahanina is een Arabische uitdrukking die “gefeliciteerd”
              betekent. Het komt van mijn voornaam Tahani en weerspiegelt mijn
              missie: bijdragen aan positieve resultaten en groei van mijn
              klanten.
              <br />
              Deze naam past bij mijn identiteit en mijn wens om met elke
              website of app een stukje vreugde en succes te brengen.
            </p>
          </div>
        </div>
        </SiteLayout>
    );
}
