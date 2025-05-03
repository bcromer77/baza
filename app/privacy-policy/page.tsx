export default function PrivacyPolicy() {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        <h1 className="text-4xl font-bold mb-6 text-yellow-400">Privacy Policy</h1>
        <p className="mb-4">Creator Torch respects your privacy.</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>We only collect your email for security and account verification (2FA).</li>
          <li>All insights are derived from public data or opt-in platform integrations.</li>
          <li>Your data is stored securely on MongoDB Atlas (EU region).</li>
          <li>You can request data deletion anytime by emailing support.</li>
          <li>We never sell your data. It’s used strictly for compliance, safety, and matching.</li>
        </ul>
        <p className="mt-6">For questions or deletion requests, email us: <span className="underline">support@creatortorch.com</span></p>
      </div>
    );
  }