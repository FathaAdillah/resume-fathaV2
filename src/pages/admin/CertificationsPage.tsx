export default function CertificationsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Certifications</h1>
          <p className="text-gray-400 text-sm">Manage certification entries</p>
        </div>
        <button className="bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors">
          + Add Certificate
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400 shadow-sm">
        Connect to API to manage certifications data.
      </div>
    </div>
  );
}
