import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 border-t border-emerald-900 py-12 md:py-16 text-emerald-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 items-start">
          
          <div className="md:col-span-1">
            <h3 className="font-serif text-xl font-bold text-white mb-4">
              Auntie-D Herbs
            </h3>
            <p className="text-sm text-emerald-100 leading-relaxed pr-4">
              Ready to Feel Your Best? <br/> Let Nature Guide You.
            </p>
          </div>

      
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              
         
              <div className="flex flex-col space-y-3">
                <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">
                  Legal & Support
                </h4>
                <Link href="/privacy" className="text-sm text-emerald-100 hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-emerald-100 hover:text-amber-400 transition-colors">
                  Terms of Service
                </Link>
              </div>
              <div className="flex flex-col space-y-3">
                <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">
                  Basic Information
                </h4>
                <Link href="/about" className="text-sm text-emerald-100 hover:text-amber-400 transition-colors">
                  About Us
                </Link>
                <Link href="/contact" className="text-sm text-emerald-100 hover:text-amber-400 transition-colors">
                  Contact Us
                </Link>
              </div>

            </div>
          </div>

          <div className="md:col-span-1 flex flex-col md:items-end justify-end h-full mt-2 md:mt-0 pt-6 md:pt-0 border-t border-emerald-900 md:border-t-0">
            <p className="text-xs text-emerald-300 text-left leading-relaxed">
              © {new Date().getFullYear()} Auntie-D Herbs.<br />
              Natural Ingredients, Holistic Wellness.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
