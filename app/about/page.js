// Import necessary modules
import React from 'react';

// Define the functional component
const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold">About Us</h1>
      </header>
      <main className="p-4">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="mt-2 text-gray-700">We aim to provide the best services to our customers.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Our Team</h2>
          <p className="mt-2 text-gray-700">We have a diverse team of professionals dedicated to excellence.</p>
        </section>
      </main>
    </div>
  );
};

// Export the component as the default export
export default Page;