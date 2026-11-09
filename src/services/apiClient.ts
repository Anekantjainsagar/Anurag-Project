/**
 * Type-Safe API Client for FastAPI Backend
 * Handles Bearer JWT tokens, Guest X-Session-Token, and automatic error handling.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// Generate or retrieve persistent guest device/session token
export function getSessionToken(): string {
  if (typeof window === "undefined") return "SSR-SESSION";
  let token = localStorage.getItem("onaar_session_token");
  if (!token) {
    token = `gst_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("onaar_session_token", token);
  }
  return token;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("onaar_auth_token");
}

export function setAuthToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("onaar_auth_token", token);
  } else {
    localStorage.removeItem("onaar_auth_token");
  }
}

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = new Headers(options.headers || {});

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  headers.set("X-Session-Token", getSessionToken());

  const token = getAuthToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  } else if (options.requiresAuth) {
    throw new Error("Authentication required for this operation.");
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorDetail = `Request failed with status ${response.status}`;
    try {
      const errJson = await response.json();
      errorDetail = errJson.detail || errorDetail;
    } catch {
      // Use fallback error message
    }
    throw new Error(errorDetail);
  }

  return response.json();
}

export const api = {
  // Authentication & Sessions
  auth: {
    sendOtp: (identifier: string, channel: string = "sms") =>
      request<{ success: boolean; message: string; channel: string; dev_code?: string }>(
        "/auth/otp/send",
        {
          method: "POST",
          body: JSON.stringify({ identifier, channel }),
        }
      ),

    verifyOtp: (identifier: string, otp_code: string, full_name?: string) =>
      request<{
        access_token: string;
        token_type: string;
        expires_in: number;
        user: any;
      }>("/auth/otp/verify", {
        method: "POST",
        body: JSON.stringify({ identifier, otp_code, full_name }),
      }),

    getMe: () => request<any>("/auth/me", { requiresAuth: true }),

    logout: () =>
      request<{ success: boolean; message: string }>("/auth/logout", {
        method: "POST",
        requiresAuth: true,
      }),
  },

  // User Profile & Address Book
  profile: {
    getProfile: () => request<any>("/profile", { requiresAuth: true }),

    updateProfile: (data: { full_name?: string; email?: string; dietary_preference?: string }) =>
      request<any>("/profile", {
        method: "PUT",
        requiresAuth: true,
        body: JSON.stringify(data),
      }),

    getAddresses: () => request<any[]>("/profile/addresses", { requiresAuth: true }),

    addAddress: (address: any) =>
      request<any>("/profile/addresses", {
        method: "POST",
        requiresAuth: true,
        body: JSON.stringify(address),
      }),

    updateAddress: (addressId: string, address: any) =>
      request<any>(`/profile/addresses/${addressId}`, {
        method: "PUT",
        requiresAuth: true,
        body: JSON.stringify(address),
      }),

    deleteAddress: (addressId: string) =>
      request<{ success: boolean; message: string }>(`/profile/addresses/${addressId}`, {
        method: "DELETE",
        requiresAuth: true,
      }),
  },

  // Catalog
  catalog: {
    getCategories: () => request<any[]>("/categories"),

    getProducts: (params?: { category?: string; search?: string; tag?: string; skip?: number; limit?: number }) => {
      const q = new URLSearchParams();
      if (params?.category) q.set("category", params.category);
      if (params?.search) q.set("search", params.search);
      if (params?.tag) q.set("tag", params.tag);
      if (params?.skip) q.set("skip", String(params.skip));
      if (params?.limit) q.set("limit", String(params.limit));
      return request<any[]>(`/products?${q.toString()}`);
    },

    getProductDetail: (productId: string) => request<any>(`/products/${productId}`),
  },

  // Orders & Checkout
  orders: {
    validateCoupon: (code: string, subtotal: number, customerPhone?: string) =>
      request<{ valid: boolean; code: string; discount_amount: number; new_total: number; message: string }>(
        "/coupons/validate",
        {
          method: "POST",
          body: JSON.stringify({
            code,
            subtotal,
            device_token: getSessionToken(),
            customer_phone: customerPhone,
          }),
        }
      ),

    checkoutOrder: (orderData: any) =>
      request<any>("/orders/checkout", {
        method: "POST",
        body: JSON.stringify({
          ...orderData,
          device_token: getSessionToken(),
        }),
      }),

    trackOrder: (orderNumber: string) => request<any>(`/orders/track/${encodeURIComponent(orderNumber)}`),

    getMyOrders: () => request<any[]>("/orders/my-orders", { requiresAuth: true }),
  },

  // Blogs
  blogs: {
    getCategories: () => request<any[]>("/blogs/categories"),
    getBlogs: (category?: string) =>
      request<any[]>(category ? `/blogs?category=${encodeURIComponent(category)}` : "/blogs"),
    getBlogDetail: (idOrSlug: string) => request<any>(`/blogs/${encodeURIComponent(idOrSlug)}`),
  },

  // Inquiries
  inquiries: {
    submitContact: (data: { name: string; email: string; phone: string; subject: string; message: string }) =>
      request<any>("/inquiries/contact", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    submitBulkEnquiry: (data: any) =>
      request<any>("/inquiries/bulk", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    subscribeNewsletter: (email: string) =>
      request<{ success: boolean; email: string; coupon_code: string; message: string }>("/newsletter/subscribe", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
  },

  // Storefront Dynamic Settings
  settings: {
    getSiteSettings: () => request<any>("/settings/site"),
    getBanners: () => request<any[]>("/settings/banners"),
    getTestimonials: () => request<any[]>("/settings/testimonials"),
    getWhyChoose: () => request<any[]>("/settings/why-choose"),
  },

  // Admin Portal
  admin: {
    getDashboard: () => request<any>("/admin/dashboard", { requiresAuth: true }),

    getOrders: (params?: { status?: string; phone?: string; search?: string; user_id?: string }) => {
      const q = new URLSearchParams();
      if (params?.status) q.set("status", params.status);
      if (params?.phone) q.set("phone", params.phone);
      if (params?.search) q.set("search", params.search);
      if (params?.user_id) q.set("user_id", params.user_id);
      return request<any[]>(`/admin/orders?${q.toString()}`, { requiresAuth: true });
    },

    getOrder: (orderId: string) => request<any>(`/admin/orders/${orderId}`, { requiresAuth: true }),

    // Customer & User Management
    getUsers: (params?: { search?: string; role?: string; is_active?: boolean; skip?: number; limit?: number }) => {
      const q = new URLSearchParams();
      if (params?.search) q.set("search", params.search);
      if (params?.role) q.set("role", params.role);
      if (params?.is_active !== undefined) q.set("is_active", params.is_active.toString());
      if (params?.skip !== undefined) q.set("skip", params.skip.toString());
      if (params?.limit !== undefined) q.set("limit", params.limit.toString());
      return request<{ total: number; items: any[]; stats: any }>(`/admin/users?${q.toString()}`, { requiresAuth: true });
    },

    getUser: (userId: string) => request<any>(`/admin/users/${userId}`, { requiresAuth: true }),

    createUser: (data: any) =>
      request<{ success: boolean; message: string; user: any }>("/admin/users", {
        method: "POST",
        requiresAuth: true,
        body: JSON.stringify(data),
      }),

    updateUser: (userId: string, data: any) =>
      request<{ success: boolean; message: string }>(`/admin/users/${userId}`, {
        method: "PUT",
        requiresAuth: true,
        body: JSON.stringify(data),
      }),

    toggleUserStatus: (userId: string) =>
      request<{ success: boolean; is_active: boolean; message: string }>(`/admin/users/${userId}/status`, {
        method: "PATCH",
        requiresAuth: true,
      }),

    deleteUser: (userId: string) =>
      request<{ success: boolean; message: string }>(`/admin/users/${userId}`, {
        method: "DELETE",
        requiresAuth: true,
      }),

    updateOrderStatus: (orderId: string, status: string, notes?: string) =>
      request<any>(`/admin/orders/${orderId}/status`, {
        method: "PATCH",
        requiresAuth: true,
        body: JSON.stringify({ status, notes }),
      }),

    dispatchOrder: (orderId: string, courierName: string, trackingAwb: string) =>
      request<any>(`/admin/orders/${orderId}/dispatch`, {
        method: "PATCH",
        requiresAuth: true,
        body: JSON.stringify({ courier_name: courierName, tracking_awb: trackingAwb }),
      }),

    getEmailTemplates: () => request<any[]>("/admin/email/templates", { requiresAuth: true }),

    getEmailTemplate: (key: string) => request<any>(`/admin/email/templates/${key}`, { requiresAuth: true }),

    updateEmailTemplate: (key: string, data: any) =>
      request<any>(`/admin/email/templates/${key}`, {
        method: "PUT",
        requiresAuth: true,
        body: JSON.stringify(data),
      }),

    previewEmailTemplate: (templateKey: string, sampleData?: any) =>
      request<{ subject: string; html: string; text: string }>("/admin/email/templates/preview", {
        method: "POST",
        requiresAuth: true,
        body: JSON.stringify({ template_key: templateKey, sample_data: sampleData }),
      }),

    sendTestEmail: (recipientEmail: string, templateKey: string, sampleData?: any) =>
      request<{ success: boolean; message: string }>("/admin/email/templates/send-test", {
        method: "POST",
        requiresAuth: true,
        body: JSON.stringify({ recipient_email: recipientEmail, template_key: templateKey, sample_data: sampleData }),
      }),

    getSmtpConfig: () => request<any>("/admin/email/smtp-config", { requiresAuth: true }),

    updateSmtpConfig: (data: any) =>
      request<{ success: boolean; message: string }>("/admin/email/smtp-config", {
        method: "PUT",
        requiresAuth: true,
        body: JSON.stringify(data),
      }),

    verifySmtp: () =>
      request<{ success: boolean; message: string }>("/admin/email/smtp-config/verify", {
        method: "POST",
        requiresAuth: true,
      }),

    // Products Management
    getProducts: (params?: { category_id?: string; search?: string; stock_status?: string; skip?: number; limit?: number }) => {
      const q = new URLSearchParams();
      if (params?.category_id) q.set("category_id", params.category_id);
      if (params?.search) q.set("search", params.search);
      if (params?.stock_status) q.set("stock_status", params.stock_status);
      if (params?.skip !== undefined) q.set("skip", params.skip.toString());
      if (params?.limit !== undefined) q.set("limit", params.limit.toString());
      return request<{ total: number; items: any[]; skip: number; limit: number }>(`/admin/products?${q.toString()}`, { requiresAuth: true });
    },

    getProduct: (id: string) => request<any>(`/admin/products/${id}`, { requiresAuth: true }),

    createProduct: (data: any) =>
      request<{ success: boolean; message: string; product_id: string }>("/admin/products", {
        method: "POST",
        requiresAuth: true,
        body: JSON.stringify(data),
      }),

    updateProduct: (id: string, data: any) =>
      request<{ success: boolean; message: string; product_id: string }>(`/admin/products/${id}`, {
        method: "PUT",
        requiresAuth: true,
        body: JSON.stringify(data),
      }),

    updateProductStock: (id: string, stock_quantity: number) =>
      request<{ success: boolean; message: string }>(`/admin/products/${id}/stock`, {
        method: "PATCH",
        requiresAuth: true,
        body: JSON.stringify({ stock_quantity }),
      }),

    deleteProduct: (id: string) =>
      request<{ success: boolean; message: string }>(`/admin/products/${id}`, {
        method: "DELETE",
        requiresAuth: true,
      }),

    // Categories Management
    getCategories: () => request<any[]>("/admin/categories", { requiresAuth: true }),

    createCategory: (data: any) =>
      request<{ success: boolean; message: string; category_id: string }>("/admin/categories", {
        method: "POST",
        requiresAuth: true,
        body: JSON.stringify(data),
      }),

    updateCategory: (id: string, data: any) =>
      request<{ success: boolean; message: string }>(`/admin/categories/${id}`, {
        method: "PUT",
        requiresAuth: true,
        body: JSON.stringify(data),
      }),

    deleteCategory: (id: string) =>
      request<{ success: boolean; message: string }>(`/admin/categories/${id}`, {
        method: "DELETE",
        requiresAuth: true,
      }),

    // Blogs Management
    getBlogs: (params?: { search?: string; category_id?: string }) => {
      const q = new URLSearchParams();
      if (params?.search) q.set("search", params.search);
      if (params?.category_id) q.set("category_id", params.category_id);
      return request<any[]>(`/admin/blogs?${q.toString()}`, { requiresAuth: true });
    },

    getBlog: (id: string) => request<any>(`/admin/blogs/${id}`, { requiresAuth: true }),

    createBlog: (data: any) =>
      request<{ success: boolean; message: string; blog_id: string }>("/admin/blogs", {
        method: "POST",
        requiresAuth: true,
        body: JSON.stringify(data),
      }),

    updateBlog: (id: string, data: any) =>
      request<{ success: boolean; message: string }>(`/admin/blogs/${id}`, {
        method: "PUT",
        requiresAuth: true,
        body: JSON.stringify(data),
      }),

    deleteBlog: (id: string) =>
      request<{ success: boolean; message: string }>(`/admin/blogs/${id}`, {
        method: "DELETE",
        requiresAuth: true,
      }),

    togglePublishBlog: (id: string) =>
      request<{ success: boolean; is_published: boolean; message: string }>(`/admin/blogs/${id}/publish`, {
        method: "PATCH",
        requiresAuth: true,
      }),

    // Cloud S3 & Media Asset Management
    uploadMedia: (file: File, folder: string = "products") => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      return request<{ success: boolean; provider: string; url: string; key: string }>("/admin/media/upload", {
        method: "POST",
        requiresAuth: true,
        body: formData,
      });
    },

    getS3Config: () => request<any>("/admin/media/config", { requiresAuth: true }),

    updateS3Config: (data: any) =>
      request<{ success: boolean; message: string; is_configured: boolean }>("/admin/media/config", {
        method: "PUT",
        requiresAuth: true,
        body: JSON.stringify(data),
      }),

    verifyS3Config: () =>
      request<{ success: boolean; configured: boolean; message: string }>("/admin/media/verify", {
        method: "POST",
        requiresAuth: true,
      }),

    getEmailLogs: () => request<any[]>("/admin/email/logs", { requiresAuth: true }),

    getContactInquiries: (params?: { status?: string; search?: string }) => {
      const q = new URLSearchParams();
      if (params?.status) q.set("status", params.status);
      if (params?.search) q.set("search", params.search);
      const qs = q.toString();
      return request<any[]>(qs ? `/admin/inquiries/contact?${qs}` : "/admin/inquiries/contact", {
        requiresAuth: true,
      });
    },

    updateContactInquiryStatus: (id: string, status: string, vendor_notes?: string) =>
      request<any>(`/admin/inquiries/contact/${id}`, {
        method: "PATCH",
        requiresAuth: true,
        body: JSON.stringify({ status, vendor_notes }),
      }),

    deleteContactInquiry: (id: string) =>
      request<any>(`/admin/inquiries/contact/${id}`, {
        method: "DELETE",
        requiresAuth: true,
      }),

    getBulkEnquiries: (params?: { status?: string; search?: string }) => {
      const q = new URLSearchParams();
      if (params?.status) q.set("status", params.status);
      if (params?.search) q.set("search", params.search);
      const qs = q.toString();
      return request<any[]>(qs ? `/admin/inquiries/bulk?${qs}` : "/admin/inquiries/bulk", {
        requiresAuth: true,
      });
    },

    updateBulkEnquiryStatus: (id: string, status: string, vendor_notes?: string) =>
      request<any>(`/admin/inquiries/bulk/${id}`, {
        method: "PATCH",
        requiresAuth: true,
        body: JSON.stringify({ status, vendor_notes }),
      }),

    deleteBulkEnquiry: (id: string) =>
      request<any>(`/admin/inquiries/bulk/${id}`, {
        method: "DELETE",
        requiresAuth: true,
      }),

    getNewsletterSubscribers: (params?: { search?: string; is_active?: boolean }) => {
      const q = new URLSearchParams();
      if (params?.search) q.set("search", params.search);
      if (params?.is_active !== undefined) q.set("is_active", String(params.is_active));
      const qs = q.toString();
      return request<any[]>(qs ? `/admin/inquiries/newsletter?${qs}` : "/admin/inquiries/newsletter", {
        requiresAuth: true,
      });
    },

    updateNewsletterSubscriber: (id: string, is_active: boolean) =>
      request<any>(`/admin/inquiries/newsletter/${id}`, {
        method: "PATCH",
        requiresAuth: true,
        body: JSON.stringify({ is_active }),
      }),

    deleteNewsletterSubscriber: (id: string) =>
      request<any>(`/admin/inquiries/newsletter/${id}`, {
        method: "DELETE",
        requiresAuth: true,
      }),
  },
};

