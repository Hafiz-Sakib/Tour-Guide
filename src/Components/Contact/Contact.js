console.log("Contact.js loaded");

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#0a1628]">
          Contact Us
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0a1628]/80 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-[#e8e0d0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/50 transition-colors"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0a1628]/80 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-[#e8e0d0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/50 transition-colors"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0a1628]/80 mb-1">
              Message
            </label>
            <textarea
              className="w-full px-4 py-2 border border-[#e8e0d0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/50 transition-colors"
              placeholder="Your Message"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#c9a84c] to-[#f0d080] text-[#0a1628] font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9a84c]/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};
