"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4 font-semibold">
          A Way To Track Pet Seizures
        </h1>
        <p className="mt-12 mb-16 font-semibold text-2xl">
          Charts and logs to help you monitor your pet's activies and seizures
        </p>
        <div className="max-w-6xl mx-auto flex justify-center">
          <Image
            src="/images/hero-part-1.png"
            alt="Hero"
            width={878}
            height={1121}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="max-w-6xl mx-auto flex justify-center">
          <Image
            src="/images/hero-part-2.png"
            alt="Hero"
            width={877}
            height={715}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="max-w-6xl mx-auto flex justify-center mt-12">
          <Image
            src="/images/event-logs.png"
            alt="log"
            width={657}
            height={910}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-10">
          Everything you need to understand seizure patterns
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
          {/* Charts */}
          <div className="flex flex-col items-center text-center max-w-[180px]">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-2xl mb-3">
              📈
            </div>
            <h3 className="font-semibold mb-1">Charts</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Visualize seizure trends and patterns over time.
            </p>
          </div>

          {/* Logs */}
          <div className="flex flex-col items-center text-center max-w-[180px]">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-2xl mb-3">
              📝
            </div>
            <h3 className="font-semibold mb-1">Logs</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Record seizures, notes, and daily observations.
            </p>
          </div>

          {/* Event Types */}
          <div className="flex flex-col items-center text-center max-w-[180px]">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-2xl mb-3">
              🧩
            </div>
            <h3 className="font-semibold mb-1">Event Types</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Track medications, feedings, activities, and changes.
            </p>
          </div>

          {/* Sharable Link */}
          <div className="flex flex-col items-center text-center max-w-[180px]">
            <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-2xl mb-3">
              🔗
            </div>
            <h3 className="font-semibold mb-1">Sharable Link</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Share timelines with vets, caregivers, or family.
            </p>
          </div>
        </div>
      </section>

      {/* Site Info Section */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">How it works</h2>
        <p className="mb-2 w-3/4">
          Create your free account and add your furry friend. Effortlessly log
          feedings, medications, and health events, all in one place.
        </p>
        <p className="mb-2 w-3/4">
          See your pet's health at a glance with easy-to-read visual timelines
          and charts that highlight patterns and important changes.
        </p>
        <p className="mb-2 w-3/4">
          Currently optimized for dogs, with more pet types coming soon!
          Afterall, Edward has two other dog brothers, a void cat brother and a
          parrot sister.
        </p>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <Image
            src="/images/edward.jpg"
            alt="Edward"
            width={700}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Why I made this site</h2>
          <p className="mb-2">
            Built from personal experience, this app helps you keep a close eye
            on your dog’s health—track seizures, meals, medications, and
            treatment adjustments, all visualized clearly on intuitive charts.
          </p>
          <p className="mb-2">
            Share your pet’s health data with your vet easily using the secure,
            read-only share link feature. The link provides instant access to
            complete health logs, making it simple for your vet to stay informed
            and provide the best care.
          </p>
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
