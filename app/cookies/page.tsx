export default function CookiesPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cookie Categories</h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            1. Strictly Necessary Cookies (always on)
          </h3>
          <p className="mb-4">
            These are required for the website to function.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-border px-4 py-2 text-left">
                    Purpose
                  </th>
                  <th className="border border-border px-4 py-2 text-left">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2">ck_test</td>
                  <td className="border border-border px-4 py-2">
                    Checks whether your browser supports cookies
                  </td>
                  <td className="border border-border px-4 py-2">Session</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    cookie-consent
                  </td>
                  <td className="border border-border px-4 py-2">
                    Stores your cookie preferences
                  </td>
                  <td className="border border-border px-4 py-2">90 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            2. Analytics Cookies (require consent)
          </h3>
          <p className="mb-4">Used only if you opt in.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-border px-4 py-2 text-left">
                    Purpose
                  </th>
                  <th className="border border-border px-4 py-2 text-left">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2">
                    ph_phc_*_posthog
                  </td>
                  <td className="border border-border px-4 py-2">
                    Used by PostHog to store a pseudonymous analytics ID
                    ("distinct_id") and session information
                  </td>
                  <td className="border border-border px-4 py-2">1 year</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          How to Change Your Preferences
        </h2>
        <p>
          You can reopen the cookie settings using the link in the footer.
          Disabling analytics removes all analytics cookies and stops data
          collection immediately.
        </p>
      </section>
    </main>
  );
}
