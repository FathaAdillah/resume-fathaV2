import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2, X } from "lucide-react";
import { Dialog, DialogContent } from "../../components/ui/Dialog";
import api from "../../services/api";

interface ProjectImage {
  gradient: string;
  label: string;
}
interface ProjectData {
  id?: number;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  icon: string;
  images: ProjectImage[];
}

const emptyProject: ProjectData = {
  title: "",
  description: "",
  tags: [],
  gradient: "from-blue-500 to-blue-700",
  icon: "",
  images: [],
};

export default function ProjectsPage() {
  const qc = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<ProjectData>(emptyProject);
  const [tagsInput, setTagsInput] = useState("");

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => api.get("/projects").then((r) => r.data),
  });

  const saveMutation = useMutation({
    mutationFn: (p: ProjectData) =>
      p.id ? api.put(`/projects/${p.id}`, p) : api.post("/projects", p),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      setDialogOpen(false);
      setForm(emptyProject);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/projects/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      setDeleteId(null);
    },
  });

  const openAdd = () => {
    setForm(emptyProject);
    setTagsInput("");
    setDialogOpen(true);
  };
  const openEdit = (p: ProjectData & { id: number }) => {
    setForm(p);
    setTagsInput((p.tags || []).join(", "));
    setDialogOpen(true);
  };

  const handleSave = () => {
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    saveMutation.mutate({ ...form, tags });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Projects</h1>
          <p className="text-gray-400 text-sm">Manage portfolio projects</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors"
        >
          + Add Project
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-400 text-center py-8">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p: ProjectData & { id: number }) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{p.icon}</span>
                  <h3 className="font-bold text-gray-900">{p.title}</h3>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(p)}
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteId(p.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(p.tags || []).map((t: string, i: number) => (
                  <span
                    key={i}
                    className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent title={form.id ? "Edit Project" : "Add Project"}>
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              {form.id ? "Edit" : "Add"} Project
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Title
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Icon (emoji)
                </label>
                <input
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Laravel, PHP, MySQL"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Gradient
                </label>
                <input
                  value={form.gradient}
                  onChange={(e) =>
                    setForm({ ...form, gradient: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Preview Images
              </label>
              {form.images.map((img, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    value={img.gradient}
                    onChange={(e) => {
                      const imgs = [...form.images];
                      imgs[i] = { ...imgs[i], gradient: e.target.value };
                      setForm({ ...form, images: imgs });
                    }}
                    placeholder="Gradient"
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    value={img.label}
                    onChange={(e) => {
                      const imgs = [...form.images];
                      imgs[i] = { ...imgs[i], label: e.target.value };
                      setForm({ ...form, images: imgs });
                    }}
                    placeholder="Label"
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {form.images.length > 0 && (
                    <button
                      onClick={() =>
                        setForm({
                          ...form,
                          images: form.images.filter((_, j) => j !== i),
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
                  setForm({
                    ...form,
                    images: [...form.images, { gradient: "", label: "" }],
                  })
                }
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                + Add image
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
                onClick={handleSave}
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
              Are you sure you want to delete this project? This cannot be
              undone.
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
