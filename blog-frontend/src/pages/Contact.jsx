export default function Contact() {
  return (
    <div className="pt-20 px-6 bg-white min-h-screen">
      <h2 className="text-4xl font-bold text-pink-600 mb-6 text-center">Contact Us</h2>
      <form className="max-w-xl mx-auto space-y-4">
        <input type="text" placeholder="Your Name" className="w-full p-3 border border-pink-300 rounded-xl" />
        <input type="email" placeholder="Your Email" className="w-full p-3 border border-pink-300 rounded-xl" />
        <textarea placeholder="Your Message" rows="5" className="w-full p-3 border border-pink-300 rounded-xl"></textarea>
        <button type="submit" className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700">Send Message</button>
      </form>
    </div>
  );
}
