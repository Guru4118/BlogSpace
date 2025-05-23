import React from 'react';

export default function About() {
  return (
    <main className="min-h-screen pt-24 max-w-4xl mx-auto px-6 text-center" data-aos="fade-up">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-6">About Us</h1>
      <p className="text-gray-700 text-lg mb-6">
        ProBlog is a modern blogging platform built for professionals who want to share their knowledge, experience, and insights with the world.
      </p>
      <img
        src="https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=800&q=80"
        alt="About Us"
        className="mx-auto rounded-lg shadow-lg"
        loading="lazy"
      />
    </main>
  );
}
