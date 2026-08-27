import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Pencil, Check, X } from "lucide-react";
import { Dialog, DialogContent } from "../../components/ui/Dialog";
import api from "../../services/api";

interface Category {
  id: number;
  name: string;
}

interface SoftSkill {
  id: number;
  text: string;
  sort_order: number;
}

export default function SkillsPage() {
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState<"hard" | "soft">("hard");

  // ── Hard Skills state ──────────────────────────────────────────────────
  const [skillDialog, setSkillDialog] = useState(false);
  const [catDialog, setCatDialog] = useState(false);
  const [form, setForm] = useState({
    id: undefined as number | undefined,
    name: "",
    category_id: 0,
  });
  const [catName, setCatName] = useState("");

  // ── Soft Skills state ──────────────────────────────────────────────────
  const [softDialog, setSoftDialog] = useState(false);
  const [softForm, setSoftForm] = useState({
    id: undefined as number | undefined,
    text: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // ── Queries ────────────────────────────────────────────────────────────
  const { data: grouped = {}, isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: () => api.get("/skills").then((r) => r.data),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["skill-categories"],
    queryFn: () => api.get("/skill-categories").then((r) => r.data),
  });

  const { data: softSkills = [], isLoading: softLoading } = useQuery<
    SoftSkill[]
  >({
    queryKey: ["soft-skills-admin"],
    queryFn: () => api.get("/soft-skills").then((r) => r.data),
  });

  // ── Hard Skills mutations ─────────────────────────────────────────────
  const saveSkill = useMutation({
    mutationFn: (s: typeof form) =>
      s.id ? api.put(`/skills/${s.id}`, s) : api.post("/skills", s),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["skills"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      setSkillDialog(false);
      setForm({ id: undefined, name: "", category_id: 0 });
    },
  });

  const addCategory = useMutation({
    mutationFn: (name: string) => api.post("/skill-categories", { name }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["skill-categories"] });
      qc.invalidateQueries({ queryKey: ["skills"] });
      setCatDialog(false);
      setCatName("");
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (id: number) => api.delete(`/skill-categories/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["skill-categories"] });
      qc.invalidateQueries({ queryKey: ["skills"] });
    },
  });

  // ── Soft Skills mutations ─────────────────────────────────────────────
  const saveSoftSkill = useMutation({
    mutationFn: (s: typeof softForm) =>
      s.id
        ? api.put(`/soft-skills/${s.id}`, { text: s.text })
        : api.post("/soft-skills", { text: s.text }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["soft-skills-admin"] });
      qc.invalidateQueries({ queryKey: ["softSkills"] });
      setSoftDialog(false);
      setSoftForm({ id: undefined, text: "" });
    },
  });

  const deleteSoftSkill = useMutation({
    mutationFn: (id: number) => api.delete(`/soft-skills/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["soft-skills-admin"] });
      qc.invalidateQueries({ queryKey: ["softSkills"] });
    },
  });

  const updateSoftSkill = useMutation({
    mutationFn: ({ id, text }: { id: number; text: string }) =>
      api.put(`/soft-skills/${id}`, { text }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["soft-skills-admin"] });
      qc.invalidateQueries({ queryKey: ["softSkills"] });
      setEditingId(null);
      setEditText("");
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Skills</h1>
          <p className="text-gray-400 text-sm">
            Manage hard skills and soft skills
          </p>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex mb-6">
        <div className="inline-flex bg-gray-100 rounded-xl p-1 gap-1">
          {(["hard", "soft"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-blue-700 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab === "hard" ? "Hard Skills" : "Soft Skills"}
            </button>
          ))}
        </div>
      </div>

      {/* ════════════════ Hard Skills Tab ════════════════ */}
      {activeTab === "hard" && (
        <>
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={() => setCatDialog(true)}
              className="bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors"
            >
              + Category
            </button>
            <button
              onClick={() => {
                setForm({
                  id: undefined,
                  name: "",
                  category_id: categories[0]?.id || 0,
                });
                setSkillDialog(true);
              }}
              className="bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors"
            >
              + Add Skill
            </button>
          </div>

          {isLoading ? (
            <p className="text-gray-400 text-center py-8">Loading...</p>
          ) : (
            <div className="space-y-5">
              {Object.entries(grouped).map(
                ([category, skills]: [string, unknown]) => (
                  <div
                    key={category}
                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
                  >
                    <h3 className="font-bold text-gray-900 mb-3">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {(skills as string[]).map((skill: string, i: number) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ),
              )}
              {Object.keys(grouped).length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400 shadow-sm">
                  No skills yet. Add a category first, then add skills.
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* ════════════════ Soft Skills Tab ════════════════ */}
      {activeTab === "soft" && (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                setSoftForm({ id: undefined, text: "" });
                setSoftDialog(true);
              }}
              className="bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors"
            >
              + Add Soft Skill
            </button>
          </div>

          {softLoading ? (
            <p className="text-gray-400 text-center py-8">Loading...</p>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
              {softSkills.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                  No soft skills yet. Click "Add Soft Skill" to create one.
                </div>
              )}
              {softSkills.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
                >
                  {editingId === s.id ? (
                    <div className="flex items-center gap-2 flex-1 mr-3">
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && editText.trim())
                            updateSoftSkill.mutate({
                              id: s.id,
                              text: editText.trim(),
                            });
                          if (e.key === "Escape") setEditingId(null);
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <button
                        onClick={() =>
                          editText.trim() &&
                          updateSoftSkill.mutate({
                            id: s.id,
                            text: editText.trim(),
                          })
                        }
                        className="p-1.5 text-green-500 hover:text-green-700"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1.5 text-gray-400 hover:text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-sm text-gray-800 font-medium">
                        {s.text}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingId(s.id);
                            setEditText(s.text);
                          }}
                          className="p-1.5 text-gray-400 hover:text-blue-600"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => deleteSoftSkill.mutate(s.id)}
                          className="p-1.5 text-red-400 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ════════════════ Add Skill Dialog ════════════════ */}
      <Dialog open={skillDialog} onOpenChange={setSkillDialog}>
        <DialogContent title="Add Skill">
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Add Skill</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <select
                value={form.category_id}
                onChange={(e) =>
                  setForm({ ...form, category_id: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((c: Category) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Skill Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSkillDialog(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => saveSkill.mutate(form)}
                disabled={saveSkill.isPending}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-50 transition-colors"
              >
                {saveSkill.isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ════════════════ Category Dialog ════════════════ */}
      <Dialog open={catDialog} onOpenChange={setCatDialog}>
        <DialogContent title="Add Category">
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              Manage Categories
            </h2>
            <div className="space-y-2">
              {categories.map((c: Category) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {c.name}
                  </span>
                  <button
                    onClick={() => deleteCategory.mutate(c.id)}
                    className="p-1.5 text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                placeholder="New category name"
                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => addCategory.mutate(catName)}
                disabled={!catName.trim() || addCategory.isPending}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-50 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ════════════════ Add Soft Skill Dialog ════════════════ */}
      <Dialog open={softDialog} onOpenChange={setSoftDialog}>
        <DialogContent title="Add Soft Skill">
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Add Soft Skill</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Soft Skill
              </label>
              <input
                value={softForm.text}
                onChange={(e) =>
                  setSoftForm({ ...softForm, text: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" && softForm.text.trim())
                    saveSoftSkill.mutate(softForm);
                }}
                placeholder="e.g. Leadership, Time Management"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSoftDialog(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => saveSoftSkill.mutate(softForm)}
                disabled={!softForm.text.trim() || saveSoftSkill.isPending}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-50 transition-colors"
              >
                {saveSoftSkill.isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
