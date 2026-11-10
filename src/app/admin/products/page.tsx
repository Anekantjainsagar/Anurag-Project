"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/services/apiClient";
import { useCart } from "@/context/CartContext";
import { useConfirm } from "@/context/ConfirmContext";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Boxes,
  Check,
  X,
  Upload,
  Tag,
  Sparkles,
  RefreshCw,
  Package,
} from "lucide-react";

export default function AdminProductsPage() {
  const { showToast } = useCart();
  const { confirm } = useConfirm();

  const [products, setProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("ALL");
  const [productStockFilter, setProductStockFilter] = useState("ALL");
  const [categories, setCategories] = useState<any[]>([]);

  // Product Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    category_id: "",
    subtitle: "",
    description: "",
    origin: "",
    tag: "",
    in_stock: true,
    is_featured: false,
    primary_image: "",
    health_benefits: "",
    ingredients: "",
    storage_instructions: "",
    variants: [
      { weight_label: "500g", price: 0, original_price: 0, stock_quantity: 0, is_default: true },
    ],
  });
  const [isSavingProduct, setIsSavingProduct] = useState(false);

  // Quick Stock Modal
  const [stockModalProduct, setStockModalProduct] = useState<any | null>(null);
  const [newStockValue, setNewStockValue] = useState(0);
  const [isUpdatingStock, setIsUpdatingStock] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, [productCategoryFilter, productStockFilter]);

  const loadCategories = async () => {
    try {
      const data = await api.admin.getCategories();
      setCategories(data || []);
    } catch {
      setCategories([]);
    }
  };

  const loadProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const res = await api.admin.getProducts({
        category_id: productCategoryFilter === "ALL" ? undefined : productCategoryFilter,
        search: productSearch || undefined,
        stock_status: productStockFilter === "ALL" ? undefined : productStockFilter,
        limit: 100,
      });
      setProducts(res.items || []);
      setTotalProducts(res.total || 0);
    } catch {
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      category_id: categories.length > 0 ? categories[0].id : "",
      subtitle: "",
      description: "",
      origin: "",
      tag: "",
      in_stock: true,
      is_featured: false,
      primary_image: "",
      health_benefits: "",
      ingredients: "",
      storage_instructions: "",
      variants: [
        { weight_label: "500g", price: 0, original_price: 0, stock_quantity: 0, is_default: true },
      ],
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: any) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name || "",
      category_id: p.category_id || (categories.length > 0 ? categories[0].id : ""),
      subtitle: p.subtitle || "",
      description: p.description || p.subtitle || "",
      origin: p.origin || "",
      tag: p.tag || "",
      in_stock: p.in_stock,
      is_featured: p.is_featured,
      primary_image: p.primary_image || "",
      health_benefits: p.health_benefits || "",
      ingredients: p.ingredients || "",
      storage_instructions: p.storage_instructions || "",
      variants: p.variants && p.variants.length > 0 ? p.variants.map((v: any) => ({
        weight_label: v.weight_label,
        price: v.price,
        original_price: v.original_price,
        stock_quantity: v.stock_quantity,
        is_default: v.is_default,
      })) : [
        { weight_label: "500g", price: p.default_price || 0, original_price: p.default_original_price || 0, stock_quantity: 50, is_default: true },
      ],
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      showToast("Please enter crop / product name");
      return;
    }
    setIsSavingProduct(true);
    try {
      if (editingProduct) {
        await api.admin.updateProduct(editingProduct.id, productForm);
        showToast("Crop updated successfully!");
      } else {
        await api.admin.createProduct(productForm);
        showToast("New organic crop created!");
      }
      setIsProductModalOpen(false);
      loadProducts();
    } catch (err: any) {
      showToast(err.message || "Failed to save product");
    } finally {
      setIsSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    const isConfirmed = await confirm({
      title: "Delete Organic Crop",
      message: `Are you sure you want to permanently delete '${name}' from catalog?`,
      confirmText: "Delete Product",
      cancelText: "Cancel",
      variant: "danger",
    });
    if (!isConfirmed) return;

    try {
      await api.admin.deleteProduct(id);
      showToast(`Deleted ${name}`);
      loadProducts();
    } catch (err: any) {
      showToast(err.message || "Failed to delete product");
    }
  };

  const handleSaveQuickStock = async () => {
    if (!stockModalProduct) return;
    setIsUpdatingStock(true);
    try {
      await api.admin.updateProductStock(stockModalProduct.id, newStockValue);
      showToast(`Updated stock for ${stockModalProduct.name}`);
      setStockModalProduct(null);
      loadProducts();
    } catch (err: any) {
      showToast(err.message || "Failed to update stock");
    } finally {
      setIsUpdatingStock(false);
    }
  };

  const handleUploadMedia = async (file: File) => {
    setIsUploadingMedia(true);
    try {
      const res = await api.admin.uploadMedia(file, "products");
      setProductForm((prev) => ({ ...prev, primary_image: res.url }));
      showToast(`Image uploaded via ${res.provider}!`);
    } catch (err: any) {
      showToast(err.message || "Upload failed");
    } finally {
      setIsUploadingMedia(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search, Filter Toolbar & Action */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by crop name or tag..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && loadProducts()}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-emerald-600 focus:bg-white"
            />
          </div>

          <select
            value={productCategoryFilter}
            onChange={(e) => setProductCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700"
          >
            <option value="ALL">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={productStockFilter}
            onChange={(e) => setProductStockFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700"
          >
            <option value="ALL">All Stock Status</option>
            <option value="IN_STOCK">In Stock Only</option>
            <option value="LOW_STOCK">Low Stock (≤ 10)</option>
            <option value="OUT_OF_STOCK">Out of Stock</option>
          </select>

          <button
            onClick={() => loadProducts()}
            className="p-2 text-slate-600 hover:text-emerald-700 bg-slate-100 rounded-xl cursor-pointer"
            title="Refresh Products"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleOpenAddProduct}
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Organic Crop</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Produce</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Origin & Certification</th>
                <th className="py-3 px-4">Pack Sizes & Pricing</th>
                <th className="py-3 px-4">Inventory</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoadingProducts ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Loading organic crop catalog...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No organic crops found matching your filters.
                  </td>
                </tr>
              ) : (
                products.map((p) => {
                  const defaultVar = (p.variants && p.variants.find((v: any) => v.is_default)) || (p.variants && p.variants[0]);
                  const totalStock = (p.variants || []).reduce((acc: number, v: any) => acc + (v.stock_quantity || 0), 0);

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.primary_image || "/images/placeholder.jpg"}
                            alt={p.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 bg-slate-100 shrink-0"
                            onError={(e: any) => {
                              e.target.src = "/images/categories/pulses.jpg";
                            }}
                          />
                          <div className="min-w-0 max-w-xs">
                            <div className="font-bold text-slate-900 truncate">{p.name}</div>
                            <div className="text-[11px] text-slate-500 truncate">{p.subtitle}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-semibold text-slate-700 capitalize">
                        {p.category_id || "Produce"}
                      </td>

                      <td className="py-3 px-4 text-slate-600">
                        <div className="truncate max-w-[150px]">{p.origin || "Direct Organic Farm"}</div>
                        <span className="inline-block mt-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {p.tag || "100% Organic"}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">
                          ₹{defaultVar?.price || p.default_price || 0}
                          {defaultVar && (
                            <span className="text-[10px] text-slate-500 font-normal ml-1">
                              ({defaultVar.weight_label})
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {p.variants?.length || 1} available size{(p.variants?.length || 1) > 1 ? "s" : ""}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              totalStock <= 0
                                ? "bg-rose-100 text-rose-800"
                                : totalStock <= 10
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {totalStock <= 0 ? "Out of Stock" : `${totalStock} in stock`}
                          </span>
                          <button
                            onClick={() => {
                              setStockModalProduct(p);
                              setNewStockValue(defaultVar?.stock_quantity || 50);
                            }}
                            className="p-1 hover:bg-slate-200 text-slate-500 rounded cursor-pointer"
                            title="Quick Edit Stock"
                          >
                            <Boxes className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-1.5 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 rounded-lg cursor-pointer transition-colors"
                            title="Edit Crop"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer transition-colors"
                            title="Delete Crop"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: ADD / EDIT PRODUCT */}
      {/* ========================================================= */}
      {isProductModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsProductModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92dvh] sm:max-h-[90vh] my-auto overflow-y-auto shadow-2xl border border-slate-100 p-4 sm:p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  {editingProduct ? `Edit Crop: ${editingProduct.name}` : "Add New Organic Crop"}
                </h3>
                <p className="text-xs text-slate-500">Configure catalog details, pack sizes, and images.</p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Crop / Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. Heirloom Black Wheat Grain"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category *</label>
                  <select
                    value={productForm.category_id}
                    onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Purity Subtitle</label>
                <input
                  type="text"
                  value={productForm.subtitle}
                  onChange={(e) => setProductForm({ ...productForm, subtitle: e.target.value })}
                  placeholder="e.g. 100% Certified Organic • Unpolished & Sun-Dried"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Origin / Farm Region</label>
                  <input
                    type="text"
                    value={productForm.origin}
                    onChange={(e) => setProductForm({ ...productForm, origin: e.target.value })}
                    placeholder="e.g. Sehore, Madhya Pradesh, India"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tag / Certification Badge</label>
                  <input
                    type="text"
                    value={productForm.tag}
                    onChange={(e) => setProductForm({ ...productForm, tag: e.target.value })}
                    placeholder="e.g. Certified Organic"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Describe the agronomic lineage, traditional farming methods, and health properties..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-emerald-600"
                />
              </div>

              {/* Primary Image Upload / URL */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Primary Produce Photo</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={productForm.primary_image}
                    onChange={(e) => setProductForm({ ...productForm, primary_image: e.target.value })}
                    placeholder="https://... or /images/products/..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
                  />
                  <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0">
                    <Upload className="w-4 h-4 text-emerald-700" />
                    <span>{isUploadingMedia ? "Uploading..." : "Upload File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUploadMedia(file);
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Variants Section */}
              <div className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Pack Sizes & Variant Pricing</span>
                  <button
                    type="button"
                    onClick={() => {
                      setProductForm({
                        ...productForm,
                        variants: [
                          ...productForm.variants,
                          { weight_label: "2 kg", price: 0, original_price: 0, stock_quantity: 0, is_default: false },
                        ],
                      });
                    }}
                    className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Size</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {productForm.variants.map((v, i) => (
                    <div key={i} className="grid grid-cols-5 gap-2 items-center bg-white p-2.5 rounded-xl border border-slate-200">
                      <div>
                        <label className="text-[10px] text-slate-400 block">Weight Label</label>
                        <input
                          type="text"
                          value={v.weight_label}
                          onChange={(e) => {
                            const copy = [...productForm.variants];
                            copy[i].weight_label = e.target.value;
                            setProductForm({ ...productForm, variants: copy });
                          }}
                          className="w-full px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block">Price (₹)</label>
                        <input
                          type="number"
                          value={v.price}
                          onChange={(e) => {
                            const copy = [...productForm.variants];
                            copy[i].price = Number(e.target.value);
                            setProductForm({ ...productForm, variants: copy });
                          }}
                          className="w-full px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block">MRP (₹)</label>
                        <input
                          type="number"
                          value={v.original_price}
                          onChange={(e) => {
                            const copy = [...productForm.variants];
                            copy[i].original_price = Number(e.target.value);
                            setProductForm({ ...productForm, variants: copy });
                          }}
                          className="w-full px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block">Stock Qty</label>
                        <input
                          type="number"
                          value={v.stock_quantity}
                          onChange={(e) => {
                            const copy = [...productForm.variants];
                            copy[i].stock_quantity = Number(e.target.value);
                            setProductForm({ ...productForm, variants: copy });
                          }}
                          className="w-full px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <div className="flex items-center justify-end gap-1 pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            const copy = productForm.variants.map((varItem, idx) => ({
                              ...varItem,
                              is_default: idx === i,
                            }));
                            setProductForm({ ...productForm, variants: copy });
                          }}
                          className={`p-1 rounded text-[10px] font-bold ${
                            v.is_default ? "bg-emerald-100 text-emerald-800" : "text-slate-400 hover:text-slate-700"
                          }`}
                        >
                          {v.is_default ? "Default" : "Make Default"}
                        </button>
                        {productForm.variants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const copy = productForm.variants.filter((_, idx) => idx !== i);
                              setProductForm({ ...productForm, variants: copy });
                            }}
                            className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 cursor-pointer text-center whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingProduct}
                  className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-xl font-bold cursor-pointer disabled:opacity-50 text-center whitespace-nowrap shadow-xs"
                >
                  {isSavingProduct ? "Saving..." : editingProduct ? "Save Changes" : "Create Crop"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: QUICK STOCK UPDATE */}
      {/* ========================================================= */}
      {stockModalProduct && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setStockModalProduct(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl sm:rounded-3xl max-w-sm w-full my-auto p-5 sm:p-6 space-y-4 border border-slate-100 shadow-2xl"
          >
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Quick Stock: {stockModalProduct.name}
              </h3>
              <p className="text-xs text-slate-500">Update in-stock balance for default pack size.</p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">New Stock Units</label>
              <input
                type="number"
                value={newStockValue}
                onChange={(e) => setNewStockValue(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold focus:outline-emerald-600"
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStockModalProduct(null)}
                className="w-full sm:w-auto px-4 py-2 border text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer text-center whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isUpdatingStock}
                onClick={handleSaveQuickStock}
                className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50 text-center whitespace-nowrap shadow-xs"
              >
                {isUpdatingStock ? "Updating..." : "Update Stock"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
