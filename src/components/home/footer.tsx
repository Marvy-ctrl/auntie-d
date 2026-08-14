import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0D3327] pt-10 pb-8 text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-2xl font-medium tracking-tight mb-4 inline-block text-[#FDFCF8]">
              Auntie D
            </Link>
            <p className="text-[#728579] text-sm max-w-xs leading-relaxed mt-2">
              Quality herbal blends made with carefully selected natural ingredients to support your everyday wellness journey.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-widest text-[#728579] uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm font-medium text-[#E8F3E8]">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">Track order</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-widest text-[#728579] uppercase mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-[#E8F3E8]">
              <li>+234 9160677079</li>
              <li>
                <Link href="mailto:ibukunmodupe101@gmail.com" className="hover:text-white transition-colors">
                  ibukunmodupe101@gmail.com
                </Link>
              </li>
              <li>Ilorin, Kwara State, Nigeria</li>
              <li className="text-[#728579] pt-2">Nationwide delivery</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#234934] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#728579]">
          <p>© {new Date().getFullYear()} Auntie D Herbal Medicine. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[#E8F3E8] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#E8F3E8] transition-colors">Terms of Service</Link>
            <Link href="/refund-return-policy" className="hover:text-[#E8F3E8] transition-colors">Refund and Returns Policy</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}