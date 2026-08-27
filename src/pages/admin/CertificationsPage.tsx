import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2, X } from "lucide-react";
import { Dialog, DialogContent } from "../../components/ui/Dialog";
import api from "../../services/api";

interface CertData {
  id?: number;
  title: string;
  issuer: string;
  category: string;
  gradient: string;
  icon: string;
  issuer_bg: string;
  issuer_text: string;
  accent_color: string;
  cert_label: string;
  recipient_name: string;
  date: string;
  sort_order: number;
}

const emptyCert: CertData = {
  title: "",
  issuer: "",
  category: "",
  gradient: "",
  icon: "🏆",
  issuer_bg: "",
  issuer_text: "",
  accent_color: "",
  cert_label: "",
  recipient_name: "",
  date: "",
  sort_order: 0,
};

const CATEGORIES = [
  "Cloud",
  "Management",
  "AI",
  "Data",
  "Security",
  "Development",
  "Other",
];

export default function CertificationsPage() {
  const qc = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<CertData>(emptyCert);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: certs = [], isLoading } = useQuery({
    queryKey: ["certifications"],
    queryFn: () => api.get("/certifications").then((r) => r.data),
  });

  const saveMutation = useMutation({
    mutationFn: (data: CertData) =>
      editId
        ? api.put(`/certifications/${editId}`, data)
        : api.post("/certifications", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["certifications"] });
      setDialogOpen(false);
      setForm(emptyCert);
      setEditId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/certifications/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["certifications"] });
      setDeleteId(null);
    },
  });

  function openAdd() {
    setForm(emptyCert);
    setEditId(null);
    setDialogOpen(true);
  }

  function openEdit(cert: CertData) {
    setForm(cert);
    setEditId(cert.id!);
    setDialogOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveMutation.mutate(form);
  }

  const grouped = certs.reduce(
    (acc: Record<string, CertData[]>, c: CertData) => {
      const cat = c.category || "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(c);
      return acc;
    },
    {},
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Certifications</h1>
          <p className="text-gray-400 text-sm">
            {certs.length} certification entries
          </p>
        </div>
        <button
          onClick={openAdd}
          className="bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors"
        >
          + Add Certificate
        </button>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400 shadow-sm">
          Loading...
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(items as CertData[]).map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex gap-4"
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{
                        background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                        backgroundImage: `linear-gradient(135deg, ${cert.issuer_bg || "#e5e7eb"}, ${cert.accent_color || "#e5e7eb"})`,
                      }}
                    >
                      {cert.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-gray-500">{cert.issuer}</p>
                      {cert.date && (
                        <p className="text-xs text-gray-400 mt-1">
                          {cert.date}
                        </p>
                      )}
                      {cert.cert_label && (
                        <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {cert.cert_label}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={() => openEdit(cert)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteId(cert.id!)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          title={editId ? "Edit Certification" : "Add Certification"}
        >
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <h2 className="text-xl font-black text-gray-900 mb-2">
              {editId ? "Edit Certification" : "Add Certification"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-semibold text-gray-500">
                  Title
                </span>
                <input
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-gray-500">
                  Issuer
                </span>
                <input
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.issuer}
                  onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                  required
                />
              </label>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <label className="block">
                <span className="text-xs font-semibold text-gray-500">
                  Category
                </span>
                <select
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-gray-500">
                  Icon (emoji)
                </span>
                <input
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-gray-500">
                  Date
                </span>
                <input
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  placeholder="e.g. January 2023"
                />
              </label>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <label className="block">
                <span className="text-xs font-semibold text-gray-500">
                  Issuer BG Color
                </span>
                <input
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.issuer_bg}
                  onChange={(e) =>
                    setForm({ ...form, issuer_bg: e.target.value })
                  }
                  placeholder="#232f3e"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-gray-500">
                  Issuer Text Color
                </span>
                <input
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.issuer_text}
                  onChange={(e) =>
                    setForm({ ...form, issuer_text: e.target.value })
                  }
                  placeholder="#ff9900"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-gray-500">
                  Accent Color
                </span>
                <input
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.accent_color}
                  onChange={(e) =>
                    setForm({ ...form, accent_color: e.target.value })
                  }
                  placeholder="#ff9900"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-semibold text-gray-500">
                Cert Label
              </span>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.cert_label}
                onChange={(e) =>
                  setForm({ ...form, cert_label: e.target.value })
                }
                placeholder="e.g. Cloud Computing Foundations"
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-semibold text-gray-500">
                  Recipient Name
                </span>
                <input
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.recipient_name}
                  onChange={(e) =>
                    setForm({ ...form, recipient_name: e.target.value })
                  }
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-gray-500">
                  Sort Order
                </span>
                <input
                  type="number"
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.sort_order}
                  onChange={(e) =>
                    setForm({ ...form, sort_order: Number(e.target.value) })
                  }
                />
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-semibold text-gray-500">
                Gradient (Tailwind classes)
              </span>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.gradient}
                onChange={(e) => setForm({ ...form, gradient: e.target.value })}
                placeholder="from-orange-400 to-amber-500"
              />
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveMutation.isPending}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 disabled:opacity-50 transition-colors"
              >
                {saveMutation.isPending
                  ? "Saving..."
                  : editId
                    ? "Update"
                    : "Create"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <DialogContent title="Delete Certification">
          <div className="p-6 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X size={24} className="text-red-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Delete this certification?
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteId != null) deleteMutation.mutate(deleteId);
                }}
                disabled={deleteId == null || deleteMutation.isPending}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
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
