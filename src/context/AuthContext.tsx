"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api, getAuthToken, setAuthToken, getCachedUser, setCachedUser } from "@/services/apiClient";

export interface UserAddress {
  id: string;
  label: string;
  recipient_name: string;
  recipient_phone: string;
  flat_no: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  is_default_shipping: boolean;
  is_default_billing: boolean;
  delivery_instructions?: string;
  created_at?: string;
}

export interface UserProfile {
  id: string;
  phone?: string;
  email?: string;
  full_name: string;
  avatar_url?: string;
  role: "customer" | "vendor" | "admin";
  is_active: boolean;
  is_verified: boolean;
  dietary_preference?: string;
  newsletter_subscribed?: boolean;
  created_at?: string;
  addresses?: UserAddress[];
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  addresses: UserAddress[];
  sendOtp: (identifier: string, channel?: string) => Promise<{ success: boolean; message: string; dev_code?: string }>;
  verifyOtp: (identifier: string, otpCode: string, fullName?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  fetchAddresses: () => Promise<void>;
  addAddress: (address: Omit<UserAddress, "id">) => Promise<boolean>;
  updateAddress: (id: string, address: Partial<UserAddress>) => Promise<boolean>;
  deleteAddress: (id: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => getCachedUser());
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCurrentUser = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      setUser(null);
      setCachedUser(null);
      setAddresses([]);
      setIsLoading(false);
      return;
    }

    try {
      const userData = await api.auth.getMe();
      setUser(userData);
      setCachedUser(userData);
      if (userData.addresses) {
        setAddresses(userData.addresses);
      }
    } catch (err: any) {
      const msg = err?.message || "";
      // Only clear session if genuinely unauthorized (token expired / user not found)
      if (msg.includes("401") || msg.includes("Unauthorized") || msg.includes("credentials") || msg.includes("not found")) {
        setAuthToken(null);
        setCachedUser(null);
        setUser(null);
        setAddresses([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const sendOtp = async (identifier: string, channel: string = "sms") => {
    return await api.auth.sendOtp(identifier, channel);
  };

  const verifyOtp = async (identifier: string, otpCode: string, fullName?: string): Promise<boolean> => {
    try {
      const res = await api.auth.verifyOtp(identifier, otpCode, fullName);
      if (res.access_token) {
        setAuthToken(res.access_token);
        setCachedUser(res.user);
        setUser(res.user);
        await fetchAddresses();
        return true;
      }
      return false;
    } catch (err: any) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch {
      // Ignore network errors on logout
    } finally {
      setAuthToken(null);
      setCachedUser(null);
      setUser(null);
      setAddresses([]);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    try {
      const updated = await api.profile.updateProfile(data);
      setUser(updated);
      return true;
    } catch {
      return false;
    }
  };

  const fetchAddresses = async () => {
    try {
      const addrs = await api.profile.getAddresses();
      setAddresses(addrs);
    } catch {
      // Ignore
    }
  };

  const addAddress = async (addressData: Omit<UserAddress, "id">): Promise<boolean> => {
    try {
      const newAddr = await api.profile.addAddress(addressData);
      setAddresses((prev) => [newAddr, ...prev]);
      return true;
    } catch {
      return false;
    }
  };

  const updateAddress = async (id: string, addressData: Partial<UserAddress>): Promise<boolean> => {
    try {
      const updated = await api.profile.updateAddress(id, addressData);
      setAddresses((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return true;
    } catch {
      return false;
    }
  };

  const deleteAddress = async (id: string): Promise<boolean> => {
    try {
      await api.profile.deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        addresses,
        sendOtp,
        verifyOtp,
        logout,
        updateProfile,
        fetchAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

