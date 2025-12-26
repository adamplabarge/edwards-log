'use client';

import Image from 'next/image';

export default function HomePage() {

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center py-16 bg-yellow-50">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">A way to track dog seizures</h1>
        <div className="max-w-6xl mx-auto flex justify-center">
          <Image
            src="/images/hero.png"
            alt="Hero"
            width={828}
            height={781}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Site Info Section */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">How it works</h2>
        <p className="mb-2">
          Sign up (via Auth0) and add your dog. Track feedings, medications, seizures, and changes.
        </p>
        <p className="mb-2">
          All data is visualized in charts using Chart.js, including timeline scatter plots and time-since-last-event charts.
        </p>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Why I made this site</h2>
          <p className="mb-2">
            I created this to track my own dog's seizures, feedings, medications, and changes. Changes are like adjusting pills per day, and these show up as vertical lines on charts.
          </p>
        </div>
        <div className="flex-1">
          <Image
            src="/images/edward.jpg"
            alt="Edward"
            width={700}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Under Construction Section */}
      <section className="max-w-4xl mx-auto px-4 text-center py-16 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Under Construction</h2>
        <p className="mb-2">
          The site is still under development and features may change. One the list is custom tracking events and download data.
        </p>
        <p className="mb-2">
          Feature requests? Leave an issue on my <a className="text-blue-600 underline" href="https://github.com/adamplabarge/edwards-log/issues" target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
        <p className="mb-2">
          We do not track or capture any personal data. Email addresses and passwords are managed by Auth0.
        </p>
        <p>
          We are working on a way to notify users of changes and allow data downloads.
        </p>
      </section>
    </div>
  );
}
