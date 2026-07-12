const photos = [
  {
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80",
    alt: "Cozy interior seating",
    label: "The Space",
    col: "md:col-span-2 md:row-span-2",
    height: "h-[320px] md:h-[500px]",
  },
  {
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=700&q=80",
    alt: "Freshly roasted beans",
    label: "The Beans",
    col: "md:col-span-1",
    height: "h-[240px]",
  },
  {
    src: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?auto=format&fit=crop&w=700&q=80",
    alt: "Latte art close-up",
    label: "The Craft",
    col: "md:col-span-1",
    height: "h-[240px]",
  },
  {
    src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80",
    alt: "Fresh pastries",
    label: "The Pastries",
    col: "md:col-span-1",
    height: "h-[240px]",
  },
  {
    src: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=80",
    alt: "Caramel pour",
    label: "The Pour",
    col: "md:col-span-1",
    height: "h-[240px]",
  },
  {
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80",
    alt: "Coffee cup on table",
    label: "The Moment",
    col: "md:col-span-2",
    height: "h-[240px]",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-28 relative overflow-hidden" style={{ background: "#191209" }}>
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #d9a54c 1px, transparent 0)", backgroundSize: "40px 40px" }}
      />

      <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-crema">Gallery</span>
            <h2 className="font-display text-4xl md:text-6xl mt-2">
              Inside the <span className="text-crema italic font-medium">haven</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-cream-dim text-sm max-w-xs md:text-right">
              Every corner of Brew Haven is designed for comfort, calm, and great light.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-crema border border-crema/30 hover:bg-crema hover:text-espresso px-4 py-2 transition-all duration-300 flex items-center gap-2"
            >
              <span>Follow @brewhaven_pk</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {photos.map((photo) => (
            <div
              key={photo.alt}
              className={`group relative overflow-hidden rounded-xl ${photo.col} ${photo.height}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              {/* Gradient overlay always visible, darker on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Label — slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="font-mono text-xs tracking-widest uppercase text-crema block translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {photo.label}
                </span>
                <div className="h-px bg-crema/40 w-0 group-hover:w-12 transition-all duration-500 mt-1" />
              </div>

              {/* Top-right expand icon */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-espresso/60 border border-cream/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                <span className="text-cream text-xs">↗</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Instagram strip */}
        <div className="mt-10 flex items-center justify-center gap-4 text-cream-dim">
          <div className="h-px flex-1 bg-cream/8" />
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs tracking-wider hover:text-crema transition-colors flex items-center gap-2 whitespace-nowrap border border-cream/10 hover:border-crema/30 px-5 py-2.5 rounded-full"
          >
            <span>📸</span>
            <span>@brewhaven_pk</span>
            <span className="text-crema">↗</span>
          </a>
          <div className="h-px flex-1 bg-cream/8" />
        </div>
      </div>
    </section>
  );
}