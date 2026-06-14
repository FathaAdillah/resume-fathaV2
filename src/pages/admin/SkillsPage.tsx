export default function SkillsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Skills</h1>
          <p className="text-gray-400 text-sm">
            Manage hard skills and soft skills
          </p>
        </div>
        <button className="bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors">
          + Add Skill
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400 shadow-sm">
        Connect to API to manage skills data.
      </div>
    </div>
  );
}
