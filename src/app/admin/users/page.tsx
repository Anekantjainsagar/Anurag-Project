"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Users,
  UserPlus,
  Search,
  X,
  Phone,
  Mail,
  ShoppingBag,
  MapPin,
  CheckCircle2,
  Edit3,
  Trash2,
  Eye,
  RefreshCw,
} from "lucide-react";
import { api } from "@/services/apiClient";
import { useCart } from "@/context/CartContext";
import { useConfirm } from "@/context/ConfirmContext";

function UsersContent() {
  const { showToast } = useCart();
  const { confirm } = useConfirm();
  const searchParams = useSearchParams();
  const highlightUserId = searchParams.get("highlight");

  const [users, setUsers] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userStats, setUserStats] = useState<any | null>(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");

  // User detail drawer
  const [selectedUserDetail, setSelectedUserDetail] = useState<any | null>(null);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);
  const [isLoadingUserDetail, setIsLoadingUserDetail] = useState(false);
  const [userDetailTab, setUserDetailTab] = useState<"orders" | "addresses">("orders");

  // User Add/Edit modal
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [isSavingUser, setIsSavingUser] = useState(false);
  const [userForm, setUserForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    role: "customer",
    password: "",
    dietary_preference: "Strictly Organic",
    is_active: true,
    newsletter_subscribed: true,
  });

  const loadUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const res = await api.admin.getUsers({
        search: userSearch || undefined,
        role: userRoleFilter === "all" ? undefined : userRoleFilter,
        limit: 100,
      });
      setUsers(res.items || []);
      setTotalUsers(res.total || 0);
      setUserStats(res.stats || null);
    } catch (err: any) {
      showToast(err.message || "Failed to load users");
      setUsers([]);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [userRoleFilter]);

  const handleOpenUserDetail = async (userId: string) => {
    setIsLoadingUserDetail(true);
    setIsUserDetailOpen(true);
    try {
      const detail = await api.admin.getUser(userId);
      setSelectedUserDetail(detail);
    } catch (err: any) {
      showToast(err.message || "Failed to load customer profile");
      setIsUserDetailOpen(false);
    } finally {
      setIsLoadingUserDetail(false);
    }
  };

  useEffect(() => {
    if (highlightUserId) {
      handleOpenUserDetail(highlightUserId);
    }
  }, [highlightUserId]);

  const handleOpenAddUser = () => {
    setEditingUser(null);
    setUserForm({
      full_name: "",
      phone: "",
      email: "",
      role: "customer",
      password: "",
      dietary_preference: "Strictly Organic",
      is_active: true,
      newsletter_subscribed: true,
    });
    setIsUserModalOpen(true);
  };

  const handleOpenEditUser = (u: any) => {
    setEditingUser(u);
    setUserForm({
      full_name: u.full_name || "",
      phone: u.phone || "",
      email: u.email || "",
      role: u.role || "customer",
      password: "",
      dietary_preference: u.dietary_preference || "",
      is_active: u.is_active !== undefined ? u.is_active : true,
      newsletter_subscribed: u.newsletter_subscribed !== undefined ? u.newsletter_subscribed : true,
    });
    setIsUserModalOpen(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.full_name.trim()) {
      showToast("Please enter customer name");
      return;
    }
    if (!userForm.phone && !userForm.email) {
      showToast("Please provide either phone number or email");
      return;
    }
    setIsSavingUser(true);
    try {
      if (editingUser) {
        await api.admin.updateUser(editingUser.id, userForm);
        showToast(`User '${userForm.full_name}' updated`);
      } else {
        await api.admin.createUser(userForm);
        showToast("New user account created");
      }
      setIsUserModalOpen(false);
      loadUsers();
    } catch (err: any) {
      showToast(err.message || "Failed to save user");
    } finally {
      setIsSavingUser(false);
    }
  };

  const handleToggleUserStatus = async (userId: string, userName: string, isActive: boolean) => {
    const action = isActive ? "suspend" : "activate";
    const isConfirmed = await confirm({
      title: isActive ? "Suspend User Account" : "Activate User Account",
      message: isActive
        ? `Are you sure you want to suspend user account '${userName}'? This will immediately prevent the user from logging in or placing orders.`
        : `Are you sure you want to activate user account '${userName}'? The user will regain full access to their account.`,
      confirmText: isActive ? "Yes, Suspend Account" : "Yes, Activate Account",
      cancelText: "Cancel",
      variant: isActive ? "danger" : "info",
    });
    if (!isConfirmed) return;

    try {
      const res = await api.admin.toggleUserStatus(userId);
      showToast(res.message || `User '${userName}' account ${isActive ? "suspended" : "activated"}`);
      loadUsers();
      if (selectedUserDetail && selectedUserDetail.id === userId) {
        setSelectedUserDetail({ ...selectedUserDetail, is_active: !selectedUserDetail.is_active });
      }
    } catch (err: any) {
      showToast(err.message || `Failed to ${action} user`);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    const isConfirmed = await confirm({
      title: "Delete User Account",
      message: `Are you sure you want to permanently delete user account '${userName}'? This cannot be undone.`,
      confirmText: "Delete Account",
      cancelText: "Cancel",
      variant: "danger",
    });
    if (!isConfirmed) return;

    try {
      await api.admin.deleteUser(userId);
      showToast(`User account deleted.`);
      if (isUserDetailOpen && selectedUserDetail?.id === userId) {
        setIsUserDetailOpen(false);
      }
      loadUsers();
    } catch (err: any) {
      showToast(err.message || "Failed to delete user");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 font-serif">Customer Directory & User Accounts</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time ledger of shoppers, lifetime spending, order records, and saved address books.
          </p>
        </div>
        <button
          onClick={handleOpenAddUser}
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            title: "Total Users",
            value: userStats?.total_users || totalUsers || users.length,
            sub: "All platform accounts",
            badge: "Directory",
          },
          {
            title: "Active Shoppers",
            value: userStats?.active_customers || users.filter((u) => u.role === "customer" && u.is_active).length,
            sub: "Active accounts",
            badge: "Shoppers",
          },
          {
            title: "Customer Orders",
            value: userStats?.total_orders_placed || 0,
            sub: "Across all accounts",
            badge: "Fulfillment",
          },
          {
            title: "Lifetime Spend",
            value: `₹${Number(userStats?.total_revenue || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
            sub: "Direct farm revenue",
            badge: "GMV",
          },
        ].map((s, idx) => (
          <div key={idx} className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 font-medium mb-1 gap-1">
              <span className="truncate">{s.title}</span>
              <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 shrink-0">
                {s.badge}
              </span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-serif text-slate-900 mt-1 truncate">{s.value}</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Search & Role Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name, phone number, or email..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") loadUsers();
            }}
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-xs focus:outline-emerald-600 bg-slate-50 focus:bg-white transition-all"
          />
          {userSearch && (
            <button
              onClick={() => {
                setUserSearch("");
                loadUsers();
              }}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={userRoleFilter}
            onChange={(e) => setUserRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-emerald-600 bg-white"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customers Only</option>
            <option value="admin">Administrators</option>
            <option value="vendor">Vendors</option>
          </select>

          <button
            onClick={loadUsers}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingUsers ? "animate-spin" : ""}`} />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Mobile View: Clean Card Layout (< md) */}
        <div className="md:hidden divide-y divide-slate-100">
          {isLoadingUsers ? (
            <div className="p-8 text-center text-slate-400">
              <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-600" />
              Loading customer directory...
            </div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              No user accounts found matching current query.
            </div>
          ) : (
            users.map((u) => {
              const initials = u.full_name
                ? u.full_name
                    .split(" ")
                    .map((w: string) => w[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()
                : "US";

              return (
                <div key={u.id} className="p-4 space-y-3 bg-white">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5 truncate">
                          <span className="truncate">{u.full_name}</span>
                          {u.is_verified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          ID: {u.id.slice(0, 8)}...
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          u.role === "admin"
                            ? "bg-purple-100 text-purple-800 border border-purple-200"
                            : u.role === "vendor"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        }`}
                      >
                        {u.role}
                      </span>
                      <button
                        onClick={() => handleToggleUserStatus(u.id, u.full_name, u.is_active)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-all border ${
                          u.is_active
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-rose-50 hover:text-rose-700"
                            : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-emerald-50 hover:text-emerald-700"
                        }`}
                      >
                        {u.is_active ? "Active" : "Suspended"}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">Contact</span>
                      {u.phone ? (
                        <a href={`tel:${u.phone}`} className="text-slate-800 font-medium truncate block">
                          {u.phone}
                        </a>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">No phone</span>
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">Lifetime Spend</span>
                      <span className="font-bold text-slate-900">₹{Number(u.total_spent || 0).toFixed(2)}</span>
                      <Link
                        href={`/admin/orders?userId=${u.id}`}
                        className="text-[10px] text-emerald-700 hover:underline block font-sans"
                      >
                        {u.total_orders || 0} orders
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-0.5 text-xs">
                    <span className="text-[10px] text-slate-400 font-mono">
                      Joined: {u.created_at ? new Date(u.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenUserDetail(u.id)}
                        className="p-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg cursor-pointer"
                        title="View Profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEditUser(u)}
                        className="p-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg cursor-pointer"
                        title="Edit User"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u.id, u.full_name)}
                        className="p-1.5 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 rounded-lg cursor-pointer"
                        title="Delete User"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop Table View (>= md) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-5 py-3.5">User / Customer</th>
                <th className="px-4 py-3.5">Contact Details</th>
                <th className="px-4 py-3.5">Role</th>
                <th className="px-4 py-3.5">Orders & Spend</th>
                <th className="px-4 py-3.5">Addresses</th>
                <th className="px-4 py-3.5">Joined Date</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoadingUsers ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-slate-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-600" />
                    Loading customer directory...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-slate-400">
                    No user accounts found matching current query.
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const initials = u.full_name
                    ? u.full_name
                        .split(" ")
                        .map((w: string) => w[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()
                    : "US";

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                            {initials}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{u.full_name}</span>
                              {u.is_verified && (
                                <span title="Verified Account">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              ID: {u.id.slice(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="space-y-0.5">
                          {u.phone ? (
                            <a
                              href={`tel:${u.phone}`}
                              className="flex items-center gap-1 text-slate-800 hover:text-emerald-700 font-mono"
                              title="Click to call"
                            >
                              <Phone className="w-3 h-3 text-slate-400" />
                              <span>{u.phone}</span>
                            </a>
                          ) : (
                            <span className="text-slate-400 italic">No phone</span>
                          )}
                          {u.email ? (
                            <a
                              href={`mailto:${u.email}`}
                              className="flex items-center gap-1 text-slate-500 hover:text-emerald-700 text-[11px]"
                              title="Click to email"
                            >
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span className="truncate max-w-[150px]">{u.email}</span>
                            </a>
                          ) : (
                            <span className="text-slate-400 italic text-[10px]">No email</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            u.role === "admin"
                              ? "bg-purple-100 text-purple-800 border border-purple-200"
                              : u.role === "vendor"
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-900 font-mono">
                          ₹{Number(u.total_spent || 0).toFixed(2)}
                        </div>
                        <Link
                          href={`/admin/orders?userId=${u.id}`}
                          className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                          title="Click to view all orders placed by this customer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>{u.total_orders || 0} orders</span>
                        </Link>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 text-slate-600 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{u.addresses_count || 0} saved</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 font-mono text-[11px]">
                        {u.created_at ? new Date(u.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => handleToggleUserStatus(u.id, u.full_name, u.is_active)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all border ${
                            u.is_active
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-rose-50 hover:text-rose-700"
                              : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700"
                          }`}
                          title={u.is_active ? "Click to suspend user account" : "Click to activate account"}
                        >
                          {u.is_active ? "Active" : "Suspended"}
                        </button>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenUserDetail(u.id)}
                            className="p-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg cursor-pointer transition-all"
                            title="View Profile, Orders & Addresses"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEditUser(u)}
                            className="p-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg cursor-pointer transition-all"
                            title="Edit User"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u.id, u.full_name)}
                            className="p-1.5 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 rounded-lg cursor-pointer transition-all"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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

      {/* USER DETAIL MODAL / DRAWER */}
      {isUserDetailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 space-y-6 text-xs">
            {isLoadingUserDetail || !selectedUserDetail ? (
              <div className="py-16 text-center text-slate-400">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
                Loading customer profile & purchase records...
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-base">
                      {selectedUserDetail.full_name
                        ? selectedUserDetail.full_name
                            .split(" ")
                            .map((w: string) => w[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()
                        : "US"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900 font-serif">
                          {selectedUserDetail.full_name}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            selectedUserDetail.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : selectedUserDetail.role === "vendor"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {selectedUserDetail.role}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            selectedUserDetail.is_active
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {selectedUserDetail.is_active ? "Active" : "Suspended"}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-slate-500 font-mono text-[11px] mt-1">
                        {selectedUserDetail.phone && (
                          <a href={`tel:${selectedUserDetail.phone}`} className="hover:text-emerald-700 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{selectedUserDetail.phone}</span>
                          </a>
                        )}
                        {selectedUserDetail.email && (
                          <a href={`mailto:${selectedUserDetail.email}`} className="hover:text-emerald-700 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{selectedUserDetail.email}</span>
                          </a>
                        )}
                        <span className="text-slate-400">ID: {selectedUserDetail.id}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsUserDetailOpen(false)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer self-start sm:self-auto"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* KPI Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Lifetime Spend</div>
                    <div className="text-lg font-bold font-serif text-slate-900 mt-0.5">
                      ₹{Number(selectedUserDetail.total_spent || 0).toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Orders Placed</div>
                    <div className="text-lg font-bold font-serif text-slate-900 mt-0.5">
                      {selectedUserDetail.total_orders || 0}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Loyalty Coins</div>
                    <div className="text-lg font-bold font-serif text-emerald-700 mt-0.5">
                      {selectedUserDetail.loyalty_balance || 0} pts
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Dietary Pref</div>
                    <div className="text-xs font-bold text-slate-800 mt-1 truncate">
                      {selectedUserDetail.dietary_preference || "All Organic"}
                    </div>
                  </div>
                </div>

                {/* Sub Tab Navigation */}
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <button
                    onClick={() => setUserDetailTab("orders")}
                    className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                      userDetailTab === "orders"
                        ? "bg-emerald-700 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Customer Orders ({selectedUserDetail.orders?.length || 0})</span>
                  </button>
                  <button
                    onClick={() => setUserDetailTab("addresses")}
                    className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                      userDetailTab === "addresses"
                        ? "bg-emerald-700 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Saved Addresses ({selectedUserDetail.addresses?.length || 0})</span>
                  </button>
                </div>

                {/* Tab: Orders */}
                {userDetailTab === "orders" && (
                  <div className="space-y-3">
                    {selectedUserDetail.orders && selectedUserDetail.orders.length > 0 ? (
                      <div className="border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">
                        {selectedUserDetail.orders.map((o: any) => {
                          const statusColor =
                            o.order_status === "DELIVERED"
                              ? "bg-emerald-100 text-emerald-800"
                              : o.order_status === "DISPATCHED"
                              ? "bg-purple-100 text-purple-800"
                              : o.order_status === "CONFIRMED"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800";

                          return (
                            <div key={o.id} className="p-3.5 hover:bg-slate-50 flex items-center justify-between gap-4">
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-slate-900">
                                    #{o.order_number || o.id.slice(0, 8)}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${statusColor}`}>
                                    {o.order_status.replace(/_/g, " ")}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-600">
                                  {o.items_preview?.join(", ") || "Farm harvest items"}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  Placed: {o.created_at ? new Date(o.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"}
                                  {o.courier_name && ` · ${o.courier_name} (${o.tracking_awb})`}
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <div className="text-right font-mono">
                                  <div className="font-bold text-slate-900">₹{Number(o.total_amount).toFixed(2)}</div>
                                  <div className="text-[9px] text-slate-400">{o.payment_method}</div>
                                </div>
                                <Link
                                  href={`/admin/orders?userId=${selectedUserDetail.id}`}
                                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Inspect</span>
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        No orders recorded for this customer yet.
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Addresses */}
                {userDetailTab === "addresses" && (
                  <div className="space-y-3">
                    {selectedUserDetail.addresses && selectedUserDetail.addresses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedUserDetail.addresses.map((a: any) => (
                          <div key={a.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-800 flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{a.label || "Delivery Location"}</span>
                              </span>
                              {a.is_default_shipping && (
                                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="font-semibold text-slate-900">{a.recipient_name} ({a.recipient_phone})</div>
                            <div className="text-slate-600 leading-relaxed text-[11px]">
                              {a.flat_no}, {a.street}
                              {a.landmark && `, near ${a.landmark}`}
                              <br />
                              {a.city}, {a.state} - {a.pincode}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        No delivery addresses saved by this customer.
                      </div>
                    )}
                  </div>
                )}

                {/* Action Bar Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2">
                    {selectedUserDetail.phone && (
                      <a
                        href={`tel:${selectedUserDetail.phone}`}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-bold rounded-xl flex items-center gap-1 cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                    )}
                    {selectedUserDetail.email && (
                      <a
                        href={`mailto:${selectedUserDetail.email}`}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-bold rounded-xl flex items-center gap-1 cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email</span>
                      </a>
                    )}
                    <Link
                      href={`/admin/orders?userId=${selectedUserDetail.id}`}
                      className="px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold rounded-xl flex items-center gap-1 hover:bg-emerald-100 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>View Orders in Fulfillment Queue</span>
                    </Link>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleUserStatus(selectedUserDetail.id, selectedUserDetail.full_name, selectedUserDetail.is_active)}
                      className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer ${
                        selectedUserDetail.is_active
                          ? "bg-rose-50 text-rose-700 hover:bg-rose-100"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      }`}
                    >
                      {selectedUserDetail.is_active ? "Suspend Account" : "Activate Account"}
                    </button>
                    <button
                      onClick={() => {
                        handleOpenEditUser(selectedUserDetail);
                        setIsUserDetailOpen(false);
                      }}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl cursor-pointer"
                    >
                      Edit Account
                    </button>
                    <button
                      onClick={() => setIsUserDetailOpen(false)}
                      className="px-4 py-1.5 bg-slate-900 text-white font-bold rounded-xl cursor-pointer hover:bg-slate-800"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* USER MODAL (ADD / EDIT) */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {editingUser ? "Edit User Account" : "Create New User Account"}
              </h3>
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anurag Jain"
                  value={userForm.full_name}
                  onChange={(e) => setUserForm({ ...userForm, full_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mobile Phone</label>
                  <input
                    type="text"
                    placeholder="+91 9XXXXXXXXX"
                    value={userForm.phone}
                    onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="customer@domain.com"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">System Role</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium"
                  >
                    <option value="customer">Customer (Shopper)</option>
                    <option value="admin">Administrator</option>
                    <option value="vendor">Vendor / Farmer Partner</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dietary Preference</label>
                  <input
                    type="text"
                    placeholder="e.g. Strictly Organic"
                    value={userForm.dietary_preference}
                    onChange={(e) => setUserForm({ ...userForm, dietary_preference: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {editingUser ? "Change Password (Leave blank to keep unchanged)" : "Account Password (Optional)"}
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={userForm.password}
                  onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userForm.is_active}
                    onChange={(e) => setUserForm({ ...userForm, is_active: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="font-bold text-slate-700">Account Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userForm.newsletter_subscribed}
                    onChange={(e) => setUserForm({ ...userForm, newsletter_subscribed: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="font-bold text-slate-700">Newsletter Subscribed</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingUser}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold cursor-pointer disabled:opacity-50 transition-colors"
                >
                  {isSavingUser ? "Saving..." : "Save User Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading customer directory...</div>}>
      <UsersContent />
    </Suspense>
  );
}
