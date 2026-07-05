const photos = [
  {
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80",
    alt: "Cozy interior seating",
    label: "The Space",
    span: "col-span-2 row-span-2",
    height: "h-[460px]",
  },
  {
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=700&q=80",
    alt: "Freshly roasted beans",
    label: "The Beans",
    span: "col-span-1",
    height: "h-[220px]",
  },
  {
    src: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?auto=format&fit=crop&w=700&q=80",
    alt: "Latte art close-up",
    label: "The Craft",
    span: "col-span-1",
    height: "h-[220px]",
  },
  {
    src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80",
    alt: "Fresh pastries",
    label: "The Pastries",
    span: "col-span-1",
    height: "h-[220px]",
  },
  {
    src: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=80",
    alt: "Caramel pour",
    label: "The Pour",
    span: "col-span-1",
    height: "h-[220px]",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-28" style={{ background: "#1e1510" }}>
      <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-crema">Gallery</span>
            <h2 className="font-display text-4xl md:text-5xl mt-2">Inside the haven</h2>
          </div>
          <p className="text-cream-dim text-sm max-w-xs">
            Every corner of Brew Haven is designed for comfort, calm, and great light.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.alt}
              className={`group relative overflow-hidden rounded ${photo.span} ${photo.height}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <span className="font-mono text-xs tracking-widest uppercase text-crema">
                  {photo.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram teaser */}
        <div className="mt-12 flex items-center justify-center gap-3 text-cream-dim">
          <div className="h-px flex-1 bg-cream/10" />
          <a
            href="#"
            className="font-mono text-xs tracking-wider hover:text-crema transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <span>@brewhaven_pk</span>
            <span className="text-crema">↗</span>
          </a>
          <div className="h-px flex-1 bg-cream/10" />
        </div>
      </div>
    </section>
  );
}