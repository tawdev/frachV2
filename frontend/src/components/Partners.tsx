export default function Partners() {
  const partners = [
    { name: "Brand 1", text: "LUXE INTERIOR" },
    { name: "Brand 2", text: "OAK & WOOD" },
    { name: "Brand 3", text: "MODERN LIVING" },
    { name: "Brand 4", text: "FABRIC ART" },
    { name: "Brand 5", text: "HOMESTYLE" },
    { name: "Brand 6", text: "CASA DECO" },
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container">
        <h3 className="text-center text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-10">Nos marques et partenaires de confiance</h3>
        
        {/* CSS Marquee structure */}
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-32 py-4">
            {partners.map((partner, idx) => (
              <span key={`a-${idx}`} className="text-2xl md:text-3xl font-serif font-bold text-gray-300 hover:text-secondary transition-colors cursor-default">
                {partner.text}
              </span>
            ))}
            {/* Repeat for seamless loop */}
            {partners.map((partner, idx) => (
              <span key={`b-${idx}`} className="text-2xl md:text-3xl font-serif font-bold text-gray-300 hover:text-secondary transition-colors cursor-default">
                {partner.text}
              </span>
            ))}
          </div>

          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-16 md:gap-32 py-4 ml-[100%]">
            {partners.map((partner, idx) => (
              <span key={`c-${idx}`} className="text-2xl md:text-3xl font-serif font-bold text-gray-300 hover:text-secondary transition-colors cursor-default">
                {partner.text}
              </span>
            ))}
            {/* Repeat for seamless loop */}
            {partners.map((partner, idx) => (
              <span key={`d-${idx}`} className="text-2xl md:text-3xl font-serif font-bold text-gray-300 hover:text-secondary transition-colors cursor-default">
                {partner.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
