"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center pt-16">
        <h1 className="text-4xl font-bold mb-4 font-semibold">
          A Way To Track Pet Seizures
        </h1>
        <p className="mt-12 mb-16 font-semibold text-2xl">
          Charts and logs to help you monitor your pet's activies and seizures
        </p>
        <div className="block dark:hidden">
          <div className="max-w-6xl mx-auto flex justify-center mb-4">
            <Image
              src="/images/hero-1-alt2-lt.png"
              alt="Hero"
              width={873}
              height={965}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="max-w-6xl mx-auto flex justify-center mb-4">
            <Image
              src="/images/hero-2-alt-lt.png"
              alt="Hero"
              width={880}
              height={759}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="max-w-6xl mx-auto flex justify-center mb-4">
            <Image
              src="/images/hero-3-alt-lt.png"
              alt="Hero"
              width={875}
              height={716}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="max-w-6xl mx-auto flex justify-center mt-12">
            <Image
              src="/images/log-alt-lt.png"
              alt="log"
              width={645}
              height={1178}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="hidden dark:block">
          <div className="max-w-6xl mx-auto flex justify-center mb-4">
            <Image
              src="/images/hero-1-dk.png"
              alt="Hero"
              width={883}
              height={980}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="max-w-6xl mx-auto flex justify-center mb-4">
            <Image
              src="/images/hero-2-dk.png"
              alt="Hero"
              width={892}
              height={762}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="max-w-6xl mx-auto flex justify-center mb-4">
            <Image
              src="/images/hero-3-dk.png"
              alt="Hero"
              width={872}
              height={729}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="max-w-6xl mx-auto flex justify-center mt-12">
            <Image
              src="/images/log-dk.png"
              alt="log"
              width={661}
              height={1187}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-10">
          Everything you need to for analysis of seizure patterns
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
              Record seizures, notes, daily observations and activity times.
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
      <section className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Left side: Features */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold mb-4">How it works</h2>
          <p>
            Create your free account and add your furry friend. Effortlessly log
            feedings, medications, and health events, all in one place.
          </p>
          <p>
            See your pet's health at a glance with easy-to-read visual timelines
            and charts that highlight patterns and important changes.
          </p>
          <p>
            Currently optimized for dogs, with more pet types coming soon! After
            all, Edward has two other dog brothers, a void cat brother, and a
            parrot sister.
          </p>
        </div>

        {/* Right side: How it works */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Features
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <span className="inline-block w-6 text-center">🩺</span>
              Track medication schedules with ease
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-6 text-center">⚡</span>
              Log seizure events quickly and accurately
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-6 text-center">🍽</span>
              Record feeding times effortlessly
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-6 text-center">🏃</span>
              Monitor activity durations and trends
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-6 text-center">📊</span>
              Interactive timeline charts
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-6 text-center">📈</span>
              Rolling seizure trend visualizations
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-6 text-center">📉</span>
              Seizure risk histograms
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-6 text-center">⏱</span>
              Analyze seizure time patterns
            </li>
          </ul>
        </div>
        
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-8">
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
      <section className="max-w-4xl mx-auto px-4 mb-16 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Under Construction</h2>
        <p className="mb-2">
          Edward’s Log is constantly evolving and new features are on the
          way. Think custom tracking events and easy data downloads and more insightful charts.
        </p>
        <p className="mb-2">
          Your privacy is our priority. We do not track or store personal
          information—email addresses and passwords are safely handled by Auth0
          and there are no user tracking analytics on this site.
        </p>
        <p className="mb-2">
          Your data is not shared with third parties or mined for AI training.
          If we change our data practices, we will notify you in advance.
        </p>
        <p className="mb-2">
          Have an idea or feature request? Share it on {" "}
          <a
            className="text-blue-600 underline"
            href="https://github.com/adamplabarge/edwards-log/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
           {" "}or connect with me on{" "}
           <a
            className="text-blue-600 underline"
            href="https://www.linkedin.com/in/adamlabarge/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>
      </section>
    </div>
  );
}
