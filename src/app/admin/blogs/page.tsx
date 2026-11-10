"use client";

import React, { useState, useEffect } from "react";
import { Plus, X, Upload, BookOpen, RefreshCw, Eye, Edit, Trash2 } from "lucide-react";
import { api } from "@/services/apiClient";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useConfirm } from "@/context/ConfirmContext";
import RichHtmlEditor from "@/components/RichHtmlEditor";

export default function AdminBlogsPage() {
  const { showToast } = useCart();
  const { user } = useAuth();
  const { confirm } = useConfirm();

  const [blogs, setBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [blogSearch, setBlogSearch] = useState("");

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [isSavingBlog, setIsSavingBlog] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    category_id: "Health & Nutrition",
    summary: "",
    read_time: "5 min read",
    image_url: "/images/products/pulse-toor-1.jpg",
    author_name: "Agronomy Research Cell",
    author_role: "Lead Agronomist",
    health_tip: "",
    tags_string: "organic, heirloom, farming",
    content_text: "<p></p>",
    is_published: true,
  });

  const loadBlogs = async () => {
    setIsLoadingBlogs(true);
    try {
      const data = await api.admin.getBlogs({ search: blogSearch || undefined });
      setBlogs(data || []);
    } catch (err: any) {
      showToast(err.message || "Failed to load blogs");
      setBlogs([]);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  const loadCategories = async () => {
    try {
      const cats = await api.admin.getCategories();
      setCategories(cats || []);
    } catch {
      // Ignore category load error for blogs
    }
  };

  useEffect(() => {
    loadBlogs();
    loadCategories();
  }, []);

  const handleOpenAddBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      title: "",
      slug: "",
      category_id: categories.length > 0 ? categories[0].name : "Health & Nutrition",
      summary: "",
      read_time: "5 min read",
      image_url: "/images/products/pulse-toor-1.jpg",
      author_name: user?.full_name || "Agronomy Research Cell",
      author_role: user?.role === "admin" ? "ONAAR Chief Agronomist" : "Contributor",
      health_tip: "",
      tags_string: "organic, heirloom, lab-tested",
      content_text: "<p>Write your in-depth organic agriculture and nutrition report here...</p>",
      is_published: true,
    });
    setIsBlogModalOpen(true);
  };

  const handleOpenEditBlog = async (b: any) => {
    setEditingBlog(b);
    try {
      const full = await api.admin.getBlog(b.id);
      let htmlContent = "";
      if (Array.isArray(full.content)) {
        htmlContent = full.content
          .map((p: string) => (p.includes("<") ? p : `<p>${p}</p>`))
          .join("\n\n");
      } else if (typeof full.content === "string") {
        htmlContent = full.content;
      }

      setBlogForm({
        title: full.title,
        slug: full.slug,
        category_id: full.category_id || "Health & Nutrition",
        summary: full.summary,
        read_time: full.read_time,
        image_url: full.image_url,
        author_name: full.author_name,
        author_role: full.author_role,
        health_tip: full.health_tip || "",
        tags_string: (full.tags || []).join(", "),
        content_text: htmlContent || "<p>Start writing article content...</p>",
        is_published: full.is_published,
      });
    } catch {
      setBlogForm({
        title: b.title,
        slug: b.slug,
        category_id: b.category_id,
        summary: b.summary,
        read_time: b.read_time,
        image_url: b.image_url,
        author_name: b.author_name,
        author_role: b.author_role,
        health_tip: "",
        tags_string: (b.tags || []).join(", "),
        content_text: "<p>Start writing article content...</p>",
        is_published: b.is_published,
      });
    }
    setIsBlogModalOpen(true);
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMedia(true);
    try {
      const res = await api.admin.uploadMedia(file, "blogs");
      showToast(`Image uploaded via ${res.provider}!`);
      setBlogForm((prev) => ({ ...prev, image_url: res.url }));
    } catch (err: any) {
      showToast(err.message || "Failed to upload image");
    } finally {
      setIsUploadingMedia(false);
      if (e.target) e.target.value = "";
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title.trim()) {
      showToast("Please enter article title");
      return;
    }
    setIsSavingBlog(true);
    const tags = blogForm.tags_string.split(",").map((t) => t.trim()).filter(Boolean);

    const payload = {
      ...blogForm,
      tags,
      content: blogForm.content_text, // Preserves rich HTML with all spacing, tags & headings
    };

    try {
      if (editingBlog) {
        await api.admin.updateBlog(editingBlog.id, payload);
        showToast("Article updated successfully!");
      } else {
        await api.admin.createBlog(payload);
        showToast("New article published!");
      }
      setIsBlogModalOpen(false);
      loadBlogs();
    } catch (err: any) {
      showToast(err.message || "Failed to save blog");
    } finally {
      setIsSavingBlog(false);
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      const res = await api.admin.togglePublishBlog(id);
      showToast(res.message);
      loadBlogs();
    } catch (err: any) {
      showToast(err.message || "Failed to toggle status");
    }
  };

  const handleDeleteBlog = async (id: string, title: string) => {
    const isConfirmed = await confirm({
      title: "Delete Article",
      message: `Are you sure you want to delete article '${title}'?`,
      confirmText: "Delete Article",
      cancelText: "Cancel",
      variant: "danger",
    });
    if (!isConfirmed) return;

    try {
      await api.admin.deleteBlog(id);
      showToast(`Article deleted.`);
      loadBlogs();
    } catch (err: any) {
      showToast(err.message || "Failed to delete blog");
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>Agronomy Journal & Health Research Blogs ({blogs.length})</span>
          </h2>
          <p className="text-xs text-slate-500">
            Publish nutritional guides, zero-chemical reports, and ancient crop health articles with full HTML formatting.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={loadBlogs}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            title="Refresh Articles"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingBlogs ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleOpenAddBlog}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer ml-auto sm:ml-0"
          >
            <Plus className="w-4 h-4" />
            <span>Write Article</span>
          </button>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-5 py-3.5">Article</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Author</th>
                <th className="px-4 py-3.5">Read Time</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoadingBlogs ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-600" />
                    Loading blog articles...
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                    No articles published yet. Click &quot;Write Article&quot; to draft one.
                  </td>
                </tr>
              ) : (
                blogs.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={b.image_url}
                          alt={b.title}
                          className="w-12 h-10 object-cover rounded-lg border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as any).src = "/images/products/pulse-toor-1.jpg";
                          }}
                        />
                        <div>
                          <div className="font-bold text-slate-900 max-w-md truncate">{b.title}</div>
                          <div className="text-[11px] text-slate-400 truncate max-w-sm">{b.summary}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-semibold">
                        {b.category_id || "Health"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-700">{b.author_name}</td>
                    <td className="px-4 py-3.5 text-slate-500 font-mono text-[11px]">{b.read_time}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          b.is_published
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {b.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-1">
                      <button
                        onClick={() => handleTogglePublish(b.id)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors"
                      >
                        {b.is_published ? "Draft" : "Publish"}
                      </button>
                      <button
                        onClick={() => handleOpenEditBlog(b)}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(b.id, b.title)}
                        className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD / EDIT BLOG WITH RICH HTML WYSIWYG EDITOR */}
      {isBlogModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsBlogModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[92dvh] sm:max-h-[90vh] my-auto overflow-y-auto shadow-2xl border border-slate-100 p-4 sm:p-6 space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  {editingBlog ? "Edit Agronomy Article" : "Write Agronomy Article"}
                </h3>
                <p className="text-xs text-slate-500">
                  Compose with rich formatting, headings, bullet lists, blockquotes, and image embeds.
                </p>
              </div>
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Science of Unpolished Toor Dal and Bioactive Retention"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold focus:outline-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <input
                    type="text"
                    value={blogForm.category_id}
                    onChange={(e) => setBlogForm({ ...blogForm, category_id: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 min read"
                    value={blogForm.read_time}
                    onChange={(e) => setBlogForm({ ...blogForm, read_time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Author Name</label>
                  <input
                    type="text"
                    value={blogForm.author_name}
                    onChange={(e) => setBlogForm({ ...blogForm, author_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Author Role / Designation</label>
                  <input
                    type="text"
                    value={blogForm.author_role}
                    onChange={(e) => setBlogForm({ ...blogForm, author_role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Summary / Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="A concise summary highlighting the key nutritional takeaway..."
                  value={blogForm.summary}
                  onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Featured Header Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={blogForm.image_url}
                    onChange={(e) => setBlogForm({ ...blogForm, image_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-[11px] focus:outline-emerald-600"
                  />
                  <label className="bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl font-bold shrink-0 cursor-pointer flex items-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-slate-600" />
                    <span>{isUploadingMedia ? "..." : "Upload"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploadingMedia}
                      onChange={handleUploadFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="organic, toor dal, gut health, unpolished"
                  value={blogForm.tags_string}
                  onChange={(e) => setBlogForm({ ...blogForm, tags_string: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-emerald-600"
                />
              </div>

              {/* Rich HTML WYSIWYG Editor */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700 block">
                    Article Body (Rich HTML WYSIWYG Editor) *
                  </label>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    Preserves paragraphs, headings, bullet lists &amp; spacing
                  </span>
                </div>
                <RichHtmlEditor
                  value={blogForm.content_text}
                  onChange={(html) => setBlogForm({ ...blogForm, content_text: html })}
                  placeholder="Write your in-depth agronomy article, format paragraphs, insert subheadings, bullet points, and health research..."
                  minHeight="320px"
                  onUploadImage={async (file) => {
                    const res = await api.admin.uploadMedia(file, "blogs");
                    return res.url;
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={blogForm.is_published}
                    onChange={(e) => setBlogForm({ ...blogForm, is_published: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="font-bold text-slate-700">Publish Immediately</span>
                </label>

                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsBlogModalOpen(false)}
                    className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold cursor-pointer transition-all text-center whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingBlog}
                    className="w-full sm:w-auto px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold cursor-pointer disabled:opacity-50 transition-all shadow-xs text-center whitespace-nowrap"
                  >
                    {isSavingBlog ? "Saving..." : "Save & Publish Article"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
