"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center py-16 bg-yellow-50">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          A way to track dog seizures
        </h1>
        <div className="max-w-6xl mx-auto flex justify-center">
          <Image
            src="/images/hero.png"
            alt="Hero"
            width={902}
            height={559}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Site Info Section */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">How it works</h2>
        <p className="mb-2">
          Create your free account and add your furry friend. Effortlessly log
          feedings, medications, and health events, all in one place.
        </p>
        <p className="mb-2">
          See your dog’s health at a glance with easy-to-read visual timelines
          and charts that highlight patterns and important changes.
        </p>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Why I made this site</h2>
          <p className="mb-2">
            Built from personal experience, this app helps you keep a close eye
            on your dog’s health—track seizures, meals, medications, and
            treatment adjustments, all visualized clearly on intuitive charts.
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
      <section className="max-w-4xl mx-auto px-4 py-16 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Under Construction</h2>
        <p className="mb-2">
          Edward’s Log is constantly evolving, and new features are on the
          way—think custom tracking events and easy data downloads.
        </p>
        <p className="mb-2">
          Have an idea or feature request? Share it on my{" "}
          <a
            className="text-blue-600 underline"
            href="https://github.com/adamplabarge/edwards-log/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
        <p className="mb-2">
          Your privacy is our priority. We do not track or store personal
          information—email addresses and passwords are safely handled by Auth0.
        </p>
      </section>
    </div>
  );
}
