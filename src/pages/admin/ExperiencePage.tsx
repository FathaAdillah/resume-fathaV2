import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2, X } from "lucide-react";
import { Dialog, DialogContent } from "../../components/ui/Dialog";
import api from "../../services/api";

interface ExperienceData {
  id?: number;
  company: string;
  role: string;
  period: string;
  current: boolean;
  bullets: string[];
  achievements: string[];
}

const emptyExp: ExperienceData = {
  company: "",
  role: "",
  period: "",
  current: false,
  bullets: [""],
  achievements: [""],
};

export default function ExperiencePage() {
  const qc = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<ExperienceData>(emptyExp);

  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: () => api.get("/experiences").then((r) => r.data),
  });

  const saveMutation = useMutation({
    mutationFn: (exp: ExperienceData) =>
      exp.id
        ? api.put(`/experiences/${exp.id}`, exp)
        : api.post("/experiences", exp),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["experiences"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      setDialogOpen(false);
      setForm(emptyExp);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/experiences/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["experiences"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      setDeleteId(null);
    },
  });

  const openAdd = () => {
    setForm(emptyExp);
    setDialogOpen(true);
  };
  const openEdit = (exp: ExperienceData) => {
    setForm({
      ...exp,
      bullets: exp.bullets.length ? exp.bullets : [""],
      achievements: exp.achievements.length ? exp.achievements : [""],
    });
    setDialogOpen(true);
  };

  const updateBullet = (i: number, val: string) => {
    const b = [...form.bullets];
    b[i] = val;
    setForm({ ...form, bullets: b });
  };
  const updateAchievement = (i: number, val: string) => {
    const a = [...form.achievements];
    a[i] = val;
    setForm({ ...form, achievements: a });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Experience</h1>
          <p className="text-gray-400 text-sm">
            Manage work experience entries
          </p>
        </div>
        <button
          onClick={openAdd}
          className="bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors"
        >
          + Add Entry
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-400 text-center py-8">Loading...</p>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp: ExperienceData & { id: number }) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.role}</h3>
                  <p className="text-sm text-gray-500">
                    {exp.company} &middot; {exp.period}
                  </p>
                  {exp.current && (
                    <span className="inline-block mt-1 text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(exp)}
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteId(exp.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {exp.bullets.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {exp.bullets.map((b: string, i: number) => (
                    <li key={i} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent title={form.id ? "Edit Experience" : "Add Experience"}>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              {form.id ? "Edit" : "Add"} Experience
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Company
                </label>
                <input
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Role
                </label>
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Period
                </label>
                <input
                  value={form.period}
                  onChange={(e) => setForm({ ...form, period: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-end gap-2">
                <input
                  type="checkbox"
                  id="current"
                  checked={form.current}
                  onChange={(e) =>
                    setForm({ ...form, current: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="current"
                  className="text-sm font-semibold text-gray-700"
                >
                  Currently working here
                </label>
              </div>
            </div>

            {/* Bullets */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Responsibilities
              </label>
              {form.bullets.map((b, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    value={b}
                    onChange={(e) => updateBullet(i, e.target.value)}
                    placeholder={`Bullet ${i + 1}`}
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {form.bullets.length > 1 && (
                    <button
                      onClick={() =>
                        setForm({
                          ...form,
                          bullets: form.bullets.filter((_, j) => j !== i),
                        })
                      }
                      className="p-2 text-red-400 hover:text-red-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() =>
                  setForm({ ...form, bullets: [...form.bullets, ""] })
                }
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                + Add bullet
              </button>
            </div>

            {/* Achievements */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Achievements
              </label>
              {form.achievements.map((a, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    value={a}
                    onChange={(e) => updateAchievement(i, e.target.value)}
                    placeholder={`Achievement ${i + 1}`}
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {form.achievements.length > 1 && (
                    <button
                      onClick={() =>
                        setForm({
                          ...form,
                          achievements: form.achievements.filter(
                            (_, j) => j !== i,
                          ),
                        })
                      }
                      className="p-2 text-red-400 hover:text-red-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() =>
                  setForm({ ...form, achievements: [...form.achievements, ""] })
                }
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                + Add achievement
              </button>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => saveMutation.mutate(form)}
                disabled={saveMutation.isPending}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-50 transition-colors"
              >
                {saveMutation.isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog
        open={deleteId !== null}
        onOpenChange={(o) => {
          if (!o) setDeleteId(null);
        }}
      >
        <DialogContent title="Confirm Delete">
          <div className="p-6 text-center">
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this experience entry? This cannot
              be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteId && deleteMutation.mutate(deleteId)}
                disabled={deleteMutation.isPending}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
