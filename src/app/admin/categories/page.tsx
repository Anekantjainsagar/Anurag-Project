"use client";

import React, { useState, useEffect } from "react";
import { Plus, X, Upload, Layers, RefreshCw, Edit, Trash2 } from "lucide-react";
import { api } from "@/services/apiClient";
import { useCart } from "@/context/CartContext";

export default function AdminCategoriesPage() {
  const { showToast } = useCart();
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const [categoryForm, setCategoryForm] = useState({
    id: "",
    name: "",
    slug: "",
    tagline: "",
    image_url: "/images/categories/pulses.jpg",
    display_order: 1,
    is_active: true,
  });

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const data = await api.admin.getCategories();
      setCategories(data);
    } catch (err: any) {
      showToast(err.message || "Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({
      id: "",
      name: "",
      slug: "",
      tagline: "",
      image_url: "/images/categories/pulses.jpg",
      display_order: categories.length + 1,
      is_active: true,
    });
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (c: any) => {
    setEditingCategory(c);
    setCategoryForm({
      id: c.id,
      name: c.name,
      slug: c.slug,
      tagline: c.tagline || "",
      image_url: c.image_url,
      display_order: c.display_order,
      is_active: c.is_active,
    });
    setIsCategoryModalOpen(true);
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMedia(true);
    try {
      const res = await api.admin.uploadMedia(file, "category");
      showToast(`Image uploaded via ${res.provider}!`);
      setCategoryForm((prev) => ({ ...prev, image_url: res.url }));
    } catch (err: any) {
      showToast(err.message || "Failed to upload image");
    } finally {
      setIsUploadingMedia(false);
      if (e.target) e.target.value = "";
    }
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) {
      showToast("Please enter category name");
      return;
    }
    setIsSavingCategory(true);
    try {
      if (editingCategory) {
        await api.admin.updateCategory(editingCategory.id, categoryForm);
        showToast(`Category '${categoryForm.name}' updated!`);
      } else {
        await api.admin.createCategory(categoryForm);
        showToast(`Category '${categoryForm.name}' created!`);
      }
      setIsCategoryModalOpen(false);
      loadCategories();
    } catch (err: any) {
      showToast(err.message || "Failed to save category");
    } finally {
      setIsSavingCategory(false);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category '${name}'?`)) return;
    try {
      await api.admin.deleteCategory(id);
      showToast(`Category deleted.`);
      loadCategories();
    } catch (err: any) {
      showToast(err.message || "Failed to delete category");
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>Crop Taxonomy & Categories ({categories.length})</span>
          </h2>
          <p className="text-xs text-slate-500">
            Group organic harvest items for storefront navigation, filtering & collection catalogs.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={loadCategories}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            title="Refresh Categories"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleOpenAddCategory}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer ml-auto sm:ml-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Category</span>
          </button>
        </div>
      </div>

      {/* Grid of Categories */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-400 text-xs">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
          Loading crop taxonomy...
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200/80">
          <p className="text-sm font-bold text-slate-700 mb-2">No Categories Found</p>
          <p className="text-xs text-slate-500 mb-4">Get started by creating your first organic produce category.</p>
          <button
            onClick={handleOpenAddCategory}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Category</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:border-emerald-200 transition-all"
            >
              <div>
                <div className="h-36 bg-slate-100 relative overflow-hidden group">
                  <img
                    src={c.image_url}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as any).src = "/images/categories/pulses.jpg";
                    }}
                  />
                  <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {c.products_count ?? 0} Crops
                  </span>
                  {!c.is_active && (
                    <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Inactive
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono">slug: /{c.slug}</div>
                  {c.tagline && <p className="text-xs text-slate-600 line-clamp-2 mt-1">{c.tagline}</p>}
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] font-mono">Order: #{c.display_order}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleOpenEditCategory(c)}
                    className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(c.id, c.name)}
                    className="text-rose-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add / Edit Category */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {editingCategory ? "Edit Category" : "New Category"}
              </h3>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Pulses & Dals"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Unpolished heirloom pulses rich in plant protein"
                  value={categoryForm.tagline}
                  onChange={(e) => setCategoryForm({ ...categoryForm, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Display Order</label>
                  <input
                    type="number"
                    value={categoryForm.display_order}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, display_order: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Visibility Status</label>
                  <select
                    value={categoryForm.is_active ? "active" : "inactive"}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, is_active: e.target.value === "active" })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 bg-white"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="inactive">Hidden (Draft)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Category Banner Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={categoryForm.image_url}
                    onChange={(e) => setCategoryForm({ ...categoryForm, image_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-[11px] focus:outline-none focus:border-emerald-600"
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
                {categoryForm.image_url && (
                  <div className="mt-2 h-16 w-24 rounded-lg overflow-hidden border border-slate-200">
                    <img src={categoryForm.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingCategory}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold cursor-pointer disabled:opacity-50 transition-colors"
                >
                  {isSavingCategory ? "Saving..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
