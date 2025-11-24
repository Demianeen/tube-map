import { DataRequestForm } from "@/features/data-request";

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Who We Are</h2>
        <p>
          We collect usage analytics to improve our service. We use PostHog as
          our analytics provider.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. What Data We Collect</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Pseudonymous analytics identifiers (&quot;distinct_id&quot;)</li>
          <li>Event data (button clicks, page views, usage flows)</li>
          <li>Device information (browser type, screen size)</li>
          <li>Referrer URL</li>
        </ul>
        <p>
          No names, emails, or other direct identifiers are collected unless you
          explicitly provide them.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use This Data</h2>
        <p className="mb-2">Analytics data is used only to:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>understand feature usage</li>
          <li>detect errors</li>
          <li>improve product experience</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Legal Basis (GDPR)</h2>
        <p>
          We use <strong>consent</strong> as the legal basis for analytics.
          Analytics runs <strong>only after you allow it</strong> in the cookie
          banner.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Data Sharing</h2>
        <p className="mb-2">Analytics data is processed by:</p>
        <p className="font-semibold mb-2">PostHog Cloud EU</p>
        <p className="mb-2">Hosted in Frankfurt, Germany.</p>
        <p>Data does not leave the EU.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Retention</h2>
        <p>
          Analytics identifiers are stored for up to <strong>12 months</strong>{" "}
          unless you revoke consent.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          7. Opt-Out / Withdraw Consent
        </h2>
        <p className="mb-2">You can withdraw consent at any time by:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>opening the cookie settings in the footer</li>
          <li>disabling &quot;analytics&quot;</li>
          <li>this immediately stops all analytics and deletes identifiers</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Your Rights (GDPR)</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Access your data</li>
          <li>Request deletion</li>
          <li>Restrict processing</li>
          <li>Withdraw consent</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
        <p className="mb-4">
          If you have questions or want to exercise your rights (access, delete,
          restrict processing, or withdraw consent), please use the form below.
        </p>
        <div className="bg-muted/50 rounded-lg border p-6">
          <DataRequestForm />
        </div>
      </section>
    </main>
  );
}
