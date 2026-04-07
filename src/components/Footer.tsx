import Link from 'next/link';

const footerColumns = [
  {
    title: 'Shop',
    links: [
      { label: 'Shop All', href: '/shop' },
      { label: 'Power Moves Drop', href: '/collection/power-moves' },
      { label: 'My Wishlist', href: '/wishlist' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About YAFE', href: '/about' },
      { label: 'Our Artisans', href: '/artisans' },
      { label: 'Insiders', href: '/insiders' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Size Guide', href: '/size-guide' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-yafe-navy">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
        {/* Top section */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-2xl font-bold tracking-widest text-white">
              YAFE.
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-yafe-gold font-light">
              Dress like you belong in every room. Quality workwear. Thoughtfully priced.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-5">
              {['Instagram', 'TikTok', 'WhatsApp'].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-[10px] font-medium tracking-widest uppercase text-yafe-cream/60 hover:text-yafe-cream transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-yafe-gold">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-yafe-cream/80 hover:text-yafe-cream transition-colors font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-white/30 font-light tracking-wide">
          &copy; {new Date().getFullYear()} YAFE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
