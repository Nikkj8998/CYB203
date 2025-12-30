const PartnersCarousel = () => {
  const partners = [
    { name: "Microsoft", logo: "/uploads/Logo1.webp" },
    { name: "Dell", logo: "/uploads/Logo2.webp" },
    { name: "HP", logo: "/uploads/Logo3.webp" },
    { name: "Lenovo", logo: "/uploads/Logo4.webp" },
    { name: "AWS", logo: "/uploads/Logo5.webp" },
    { name: "Azure", logo: "/uploads/Logo6.webp" },
    { name: "Fortinet", logo: "/uploads/Logo7.webp" },
    { name: "Sophos", logo: "/uploads/Logo8.webp" },
    { name: "ESET", logo: "/uploads/Logo9.webp" },
    { name: "MASS", logo: "/uploads/Logo11.webp" },
    { name: "Redington", logo: "/uploads/redington-logo-new.png" },
    { name: "Enticesoft", logo: "/uploads/enticesoft-logo-new.webp" },
  ];

  return (
    <section className="relative -mt-32 md:-mt-40 pt-8 pb-0 overflow-hidden">
      <div className="overflow-hidden">
        <div className="logo-carousel-wrapper">
          {/* First set of logos */}
          <div className="logo-carousel-track">
            {partners.map((partner, index) => (
              <div
                key={`partner-1-${index}`}
                className="logo-item"
              >
                <div className="logo-card group">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="logo-image"
                  />
                </div>
                <p className="logo-label">Our Partners</p>
              </div>
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="logo-carousel-track" aria-hidden="true">
            {partners.map((partner, index) => (
              <div
                key={`partner-2-${index}`}
                className="logo-item"
              >
                <div className="logo-card group">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="logo-image"
                  />
                </div>
                <p className="logo-label">Our Partners</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .logo-carousel-wrapper {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }

        .logo-carousel-track {
          display: flex;
          gap: 1.5rem;
          padding: 0 0.75rem;
        }

        .logo-item {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          margin: 0;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .logo-card {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, rgba(30, 58, 95, 0.25), rgba(30, 58, 95, 0.15));
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 0.75rem;
          backdrop-filter: blur(5px);
          transition: all 0.3s ease;
          min-width: 140px;
          height: 80px;
        }

        .logo-card:hover {
          background: linear-gradient(135deg, rgba(30, 58, 95, 0.4), rgba(30, 58, 95, 0.2));
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
          transform: translateY(-2px);
        }

        .logo-image {
          max-width: 120%;
          max-height: 120%;
          width: auto;
          height: auto;
          object-fit: contain;
          padding: 0.75rem;
          background: white;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          filter: brightness(1);
        }

        .logo-card:hover .logo-image {
          transform: scale(1.05);
          filter: brightness(1.2);
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Pause animation on hover */
        .logo-carousel-wrapper:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .logo-carousel-track {
            gap: 1rem;
          }
          
          .logo-card {
            padding: 0.75rem 1.25rem;
            min-width: 120px;
            height: 70px;
          }
        }
      `}</style>
    </section>
  );
};

export default PartnersCarousel;
