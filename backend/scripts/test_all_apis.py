"""
Comprehensive API Testing Script for Onaar Backend
Tests public and admin endpoints, measuring response times and status codes.
"""

import sys
import time
import httpx

BASE_URL = "http://127.0.0.1:8000"

def test_endpoint(name: str, method: str, path: str, json_data=None, headers=None, expected_status=200):
    url = f"{BASE_URL}{path}"
    t0 = time.time()
    try:
        with httpx.Client(timeout=30.0) as client:
            if method.upper() == "GET":
                resp = client.get(url, headers=headers)
            elif method.upper() == "POST":
                resp = client.post(url, json=json_data, headers=headers)
            elif method.upper() == "PUT":
                resp = client.put(url, json=json_data, headers=headers)
            elif method.upper() == "DELETE":
                resp = client.delete(url, headers=headers)
            else:
                raise ValueError(f"Unknown method {method}")
        elapsed = (time.time() - t0) * 1000
        ok = (resp.status_code == expected_status)
        status_symbol = "✅" if ok else "❌"
        print(f"{status_symbol} [{resp.status_code}] {name:35} {elapsed:6.1f}ms  ({method} {path})")
        if not ok:
            print(f"   Response text: {resp.text[:200]}")
        return ok, resp
    except Exception as e:
        elapsed = (time.time() - t0) * 1000
        print(f"❌ [ERR] {name:35} {elapsed:6.1f}ms  Error: {e}")
        return False, None

def main():
    print("=" * 70)
    print("🌾 TESTING ALL ONAAR BACKEND APIS")
    print("=" * 70)
    
    passed = 0
    total = 0

    # 1. Public Health
    total += 1
    ok, _ = test_endpoint("Health Check", "GET", "/api/v1/health")
    if ok: passed += 1

    # 2. Categories
    total += 1
    ok, _ = test_endpoint("List Categories", "GET", "/api/v1/categories")
    if ok: passed += 1

    # 3. Products List
    total += 1
    ok, r = test_endpoint("List Products (Public)", "GET", "/api/v1/products?limit=8")
    if ok: passed += 1

    # 4. Single Product
    total += 1
    ok, _ = test_endpoint("Get Single Product", "GET", "/api/v1/products/pulses-organic-arhar-dal-toor-dal-pige")
    if ok: passed += 1

    # 5. Blog Categories
    total += 1
    ok, _ = test_endpoint("Blog Categories", "GET", "/api/v1/blogs/categories")
    if ok: passed += 1

    # 6. Blog Posts
    total += 1
    ok, _ = test_endpoint("Blog Posts", "GET", "/api/v1/blogs?limit=5")
    if ok: passed += 1

    # 7. Site Settings
    total += 1
    ok, _ = test_endpoint("Public Site Settings", "GET", "/api/v1/settings/site")
    if ok: passed += 1

    # 8. FAQs Settings
    total += 1
    ok, _ = test_endpoint("Transparency FAQs", "GET", "/api/v1/settings/faqs")
    if ok: passed += 1

    # 9. Active Coupons
    total += 1
    ok, _ = test_endpoint("Active Coupons", "GET", "/api/v1/coupons/active")
    if ok: passed += 1

    # 10. Cart
    total += 1
    ok, _ = test_endpoint("Get Cart (Guest)", "GET", "/api/v1/cart", headers={"X-Session-Token": "test_guest_123"})
    if ok: passed += 1

    # 11. Cart Sync
    total += 1
    test_cart_payload = {
        "items": [
            {
                "id": "pulses-organic-arhar-dal-toor-dal-pige-10kg",
                "productId": "pulses-organic-arhar-dal-toor-dal-pige",
                "name": "Organic Arhar Dal / Toor Dal / Pigeon Pea Split",
                "subtitle": "100% Certified Organic • Unpolished & Natural",
                "price": 180.0,
                "weight": "10kg",
                "image": "/images/products/pulses/organic-arhar-dal-toor-dal-pigeon-pea-split.webp",
                "quantity": 2
            }
        ]
    }
    ok, _ = test_endpoint("Sync Cart (Guest)", "POST", "/api/v1/cart/sync", json_data=test_cart_payload, headers={"X-Session-Token": "test_guest_123"})
    if ok: passed += 1

    # 12. Admin Authentication via OTP Verify (dev bypass 1234)
    print("\n--- Testing Admin Authentication & Admin Endpoints ---")
    admin_token = None
    total += 1
    ok, auth_resp = test_endpoint("Admin Login (OTP Verify)", "POST", "/api/v1/auth/otp/verify", json_data={
        "identifier": "meriwebdunia@gmail.com",
        "otp_code": "1234"
    })
    if ok and auth_resp:
        passed += 1
        admin_token = auth_resp.json().get("access_token")
    
    admin_headers = {"Authorization": f"Bearer {admin_token}"} if admin_token else {}

    # 13. Admin Dashboard
    total += 1
    ok, _ = test_endpoint("Admin Dashboard Metrics", "GET", "/api/v1/admin/dashboard", headers=admin_headers)
    if ok: passed += 1

    # 14. Admin Products
    total += 1
    ok, _ = test_endpoint("Admin Products List", "GET", "/api/v1/admin/products?limit=10", headers=admin_headers)
    if ok: passed += 1

    # 15. Admin Categories
    total += 1
    ok, _ = test_endpoint("Admin Categories List", "GET", "/api/v1/admin/categories", headers=admin_headers)
    if ok: passed += 1

    # 16. Admin Orders
    total += 1
    ok, _ = test_endpoint("Admin Orders List", "GET", "/api/v1/admin/orders?limit=10", headers=admin_headers)
    if ok: passed += 1

    # 17. Admin Users
    total += 1
    ok, _ = test_endpoint("Admin Users List", "GET", "/api/v1/admin/users?limit=10", headers=admin_headers)
    if ok: passed += 1

    # 18. Admin Coupons
    total += 1
    ok, _ = test_endpoint("Admin Coupons List", "GET", "/api/v1/admin/coupons", headers=admin_headers)
    if ok: passed += 1

    # 19. Admin Settings
    total += 1
    ok, _ = test_endpoint("Admin Settings Full", "GET", "/api/v1/admin/settings", headers=admin_headers)
    if ok: passed += 1

    # 20. Contact inquiry
    total += 1
    ok, _ = test_endpoint("Submit Contact Inquiry", "POST", "/api/v1/inquiries/contact", json_data={
        "name": "Test User",
        "email": "test@onaar.com",
        "phone": "+919876543210",
        "subject": "Testing System",
        "message": "Automated verification message"
    })
    if ok: passed += 1

    print("=" * 70)
    print(f"RESULTS: {passed}/{total} endpoints passed successfully.")
    print("=" * 70)

if __name__ == "__main__":
    main()
