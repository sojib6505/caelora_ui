import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaYoutube,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
export default function Footer() {
  const phoneNumber = "8801976505265";
  const message = "Hello! I want to order from your website.";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <>
      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-gray-400 pt-14 pb-6">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-5 gap-8">

          {/* Contact Info */}
          <div className="space-y-3">
            <p className="flex items-start gap-2 text-sm font-semibold">
              <FaMapMarkerAlt className="mt-1" />
              Outlet: House-60, Block-D, 60 Rd 10, Banani, Dhaka 1213
            </p>

            <p className="flex items-center gap-2 text-sm font-semibold">
              <FaEnvelope />
              support@kaelora-bd.com
            </p>

            <p className="flex items-center gap-2 text-sm font-semibold">
              <FaPhoneAlt />
              +8801976505265
            </p>

            {/* Social */}
            <div className="flex gap-4 text-lg mt-4">
              <FaFacebookF className="cursor-pointer hover:text-white" />
              <FaInstagram className="cursor-pointer hover:text-white" />
              <FaLinkedinIn className="cursor-pointer hover:text-white" />
              <FaPinterestP className="cursor-pointer hover:text-white" />
              <FaYoutube className="cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white mb-4 font-semibold">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer font-semibold">Mission & Vision</li>
              <li className="hover:text-white cursor-pointer font-semibold">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer font-semibold">
                Return/Exchange & Refund
              </li>
              <li className="hover:text-white cursor-pointer font-semibold">Shipping Policy</li>
              <li className="hover:text-white cursor-pointer font-semibold">
                Terms & Conditions
              </li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="text-white mb-4 font-semibold">Quick Link</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer font-semibold">About Us</li>
              <li className="hover:text-white cursor-pointer font-semibold">Manifesto</li>
              <li className="hover:text-white cursor-pointer font-semibold">News Feed</li>
              <li className="hover:text-white cursor-pointer font-semibold">Klothen Outlet</li>
              <li className="hover:text-white cursor-pointer font-semibold">Contact Us</li>
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h3 className="text-white mb-4 font-semibold">Other Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer font-semibold">My Profile</li>
              <li className="hover:text-white cursor-pointer font-semibold">Cart</li>
              <li className="hover:text-white cursor-pointer font-semibold">Sitemap</li>
              <li className="hover:text-white cursor-pointer font-semibold">Blog Post</li>
              <li className="hover:text-white cursor-pointer font-semibold">
                How to Order & Get Offer
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white mb-4 font-semibold">Newsletter Signup</h3>

            <div className="flex items-center bg-[#1a1a1a] rounded overflow-hidden">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent px-3 py-2 text-sm outline-none w-full"
              />
              <button className="bg-white text-black px-3 py-2 text-sm">
                ➤
              </button>
            </div>

            <p className="mt-4 text-sm font-semibold">
              Trade License: TRAD/DNCC/048813/2022
            </p>

            <p className="text-sm mt-1 font-semibold">BIN: 004576033-0101</p>

            {/* Footer WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-green-400 hover:text-green-500 text-sm"
            >
              <FaWhatsapp />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-xs text-gray-500 mt-10">
          © 2026 Kaelora. All rights reserved.
        </div>
      </footer>

      {/* Floating WhatsApp (Always Visible) */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 p-4 rounded-full text-white shadow-lg hover:scale-110 transition z-50"
      >
        <FaWhatsapp size={22} />
      </a>
    </>
  );
}