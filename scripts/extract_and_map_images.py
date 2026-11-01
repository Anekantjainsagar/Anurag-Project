#!/usr/bin/env python3
"""
Extract all authentic Indian product images from the Rajlakshmi Javiks API,
save them locally, and build a mapping to update mockData.ts.
"""

import urllib.request, ssl, json, base64, os, re, time, sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_IMAGES = os.path.join(BASE_DIR, "public", "images")
PRODUCTS_DIR = os.path.join(PUBLIC_IMAGES, "products")
CATEGORIES_DIR = os.path.join(PUBLIC_IMAGES, "categories")

API_URL = "https://api.rajlakshmijaviks.com/products/get_all_products"
HEADERS = {"User-Agent": "Mozilla/5.0", "ngrok-skip-browser-warning": "true"}

# Category slug mapping
CAT_SLUG = {
    "PULSES": "pulses",
    "MILLET": "millets",
    "MASALA": "spices",
    "SWEETS": "sweets",
    "HONEY": "honey",
    "DRY FRUITS": "dry-fruits",
    "SEEDS": "seeds",
    "RICE & WHEAT": "rice-wheat",
    "OILS & GHEE": "oils-ghee",
    "OTHER ITEMS": "other-items",
    "HOME MADE AACHAR": "aachar",
    "FRUITS DRINKS / CHUTNEY": "drinks",
}

def slugify(name):
    """Convert a product name to a clean filename slug."""
    s = name.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    s = s.strip('-')
    return s[:60]

def fetch_all_products():
    """Fetch all products from the API with pagination."""
    ctx = ssl._create_unverified_context()
    all_prods = []
    page = 1
    limit = 30
    
    while True:
        url = f"{API_URL}?limit={limit}&page={page}"
        req = urllib.request.Request(url, headers=HEADERS)
        try:
            with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
                data = json.loads(resp.read().decode('utf-8'))
            prods = data.get('products', [])
            if not prods:
                break
            all_prods.extend(prods)
            pagination = data.get('pagination', {})
            total_pages = pagination.get('totalPages', 1)
            print(f"  Page {page}/{total_pages}: fetched {len(prods)} products (total: {len(all_prods)})")
            if page >= total_pages:
                break
            page += 1
        except Exception as e:
            print(f"  Error on page {page}: {e}")
            break
    
    return all_prods

def save_product_images(products):
    """Decode and save base64 images, return mapping dict."""
    mapping = {}  # api_product_name -> local image path
    cat_best = {}  # category -> first image path (for category thumbnails)
    
    for p in products:
        name = p.get('product_name', '')
        category = p.get('category_name', '')
        imgs = p.get('product_images', [])
        
        if not imgs or not imgs[0].startswith('data:image'):
            print(f"  SKIP (no image): {name}")
            continue
        
        cat_slug = CAT_SLUG.get(category, slugify(category))
        cat_dir = os.path.join(PRODUCTS_DIR, cat_slug)
        os.makedirs(cat_dir, exist_ok=True)
        
        file_slug = slugify(name)
        
        # Decode base64 image
        header, b64_data = imgs[0].split(',', 1)
        ext = 'webp' if 'webp' in header else ('png' if 'png' in header else 'jpg')
        filename = f"{file_slug}.{ext}"
        filepath = os.path.join(cat_dir, filename)
        
        try:
            raw = base64.b64decode(b64_data)
            with open(filepath, 'wb') as f:
                f.write(raw)
            
            rel_path = f"/images/products/{cat_slug}/{filename}"
            mapping[name] = rel_path
            
            # Track first image per category for category thumbnails
            if category not in cat_best:
                cat_best[category] = rel_path
                
        except Exception as e:
            print(f"  ERROR saving {name}: {e}")
    
    return mapping, cat_best

def normalize(s):
    """Normalize a string for fuzzy matching."""
    return re.sub(r'[^a-z0-9]', '', s.lower())

def extract_keywords(name):
    """Extract meaningful keywords from a product name."""
    # Remove common prefixes
    name = re.sub(r'^(organic|premium|natural|pure|raw|desi|homemade)\s+', '', name, flags=re.I)
    # Split into words
    words = re.findall(r'[a-z]{3,}', name.lower())
    # Remove common stop words
    stops = {'the', 'and', 'for', 'with', 'from', 'per', 'whole', 'split', 'powder', 'flour', 'seed', 'seeds'}
    return [w for w in words if w not in stops]

def build_mockdata_mapping(api_mapping):
    """Map mockData product names to the best matching API product image."""
    mockdata_path = os.path.join(BASE_DIR, "src", "data", "mockData.ts")
    with open(mockdata_path, 'r') as f:
        text = f.read()
    
    # Extract product names and categories from mockData
    products = re.findall(r'"name":\s*"([^"]+)".*?"category":\s*"([^"]+)"', text, re.DOTALL)
    # Deduplicate while preserving order
    seen = set()
    unique_products = []
    for name, cat in products:
        if name not in seen:
            seen.add(name)
            unique_products.append((name, cat))
    
    print(f"\n  Found {len(unique_products)} unique products in mockData.ts")
    
    # Build normalized API mapping
    api_norm = {}
    for api_name, path in api_mapping.items():
        api_norm[normalize(api_name)] = (api_name, path)
    
    # Build keyword index
    api_keywords = {}
    for api_name, path in api_mapping.items():
        kws = extract_keywords(api_name)
        for kw in kws:
            api_keywords.setdefault(kw, []).append((api_name, path))
    
    # Category mapping from mockData to API
    cat_map = {
        "Pulses": "PULSES",
        "Millets": "MILLET",
        "Masala & Spices": "MASALA",
        "Sweets": "SWEETS",
        "Honey": "HONEY",
        "Dry Fruits": "DRY FRUITS",
        "Seeds": "SEEDS",
        "Rice & Wheat": "RICE & WHEAT",
    }
    
    final_mapping = {}
    matched = 0
    fuzzy_matched = 0
    category_fallback = 0
    
    for mock_name, mock_cat in unique_products:
        # 1. Exact match
        if mock_name in api_mapping:
            final_mapping[mock_name] = api_mapping[mock_name]
            matched += 1
            continue
        
        # 2. Normalized match
        norm_mock = normalize(mock_name)
        if norm_mock in api_norm:
            final_mapping[mock_name] = api_norm[norm_mock][1]
            matched += 1
            continue
        
        # 3. Keyword-based fuzzy match
        mock_kws = extract_keywords(mock_name)
        best_score = 0
        best_path = None
        
        for api_name, path in api_mapping.items():
            api_kws = extract_keywords(api_name)
            # Count shared keywords
            shared = len(set(mock_kws) & set(api_kws))
            if shared > best_score:
                best_score = shared
                best_path = path
        
        if best_score >= 2:
            final_mapping[mock_name] = best_path
            fuzzy_matched += 1
            continue
        
        # 4. Single keyword match within same category
        api_cat = cat_map.get(mock_cat, mock_cat)
        cat_slug = CAT_SLUG.get(api_cat, slugify(api_cat))
        
        for kw in mock_kws:
            if kw in api_keywords:
                # Prefer same-category matches
                same_cat = [p for p in api_keywords[kw] if CAT_SLUG.get(next((c for c, s in CAT_SLUG.items() if s == cat_slug), ''), '') == cat_slug]
                if same_cat:
                    final_mapping[mock_name] = same_cat[0][1]
                    fuzzy_matched += 1
                    break
                else:
                    final_mapping[mock_name] = api_keywords[kw][0][1]
                    fuzzy_matched += 1
                    break
        
        if mock_name in final_mapping:
            continue
        
        # 5. Category fallback: use any image from the same category
        cat_images = [p for n, p in api_mapping.items() if f"/images/products/{cat_slug}/" in p]
        if cat_images:
            # Pick a varied one based on position
            idx = hash(mock_name) % len(cat_images)
            final_mapping[mock_name] = cat_images[idx]
            category_fallback += 1
        else:
            # Absolute fallback: first available image
            final_mapping[mock_name] = list(api_mapping.values())[0]
            category_fallback += 1
    
    print(f"  Exact/normalized matches: {matched}")
    print(f"  Fuzzy keyword matches: {fuzzy_matched}")
    print(f"  Category fallbacks: {category_fallback}")
    print(f"  Total mapped: {len(final_mapping)} / {len(unique_products)}")
    
    return final_mapping

def main():
    print("=" * 60)
    print("STEP 1: Fetching all products from Rajlakshmi Javiks API")
    print("=" * 60)
    products = fetch_all_products()
    print(f"\n  Total products fetched: {len(products)}")
    
    print("\n" + "=" * 60)
    print("STEP 2: Extracting and saving authentic product images")
    print("=" * 60)
    api_mapping, cat_best = save_product_images(products)
    print(f"\n  Saved {len(api_mapping)} authentic product images")
    
    # Save API mapping
    mapping_path = os.path.join(BASE_DIR, "scripts", "api_image_mapping.json")
    with open(mapping_path, 'w') as f:
        json.dump(api_mapping, f, indent=2)
    print(f"  API mapping saved to scripts/api_image_mapping.json")
    
    print("\n" + "=" * 60)
    print("STEP 3: Building mockData product → image mapping")
    print("=" * 60)
    final_mapping = build_mockdata_mapping(api_mapping)
    
    final_path = os.path.join(BASE_DIR, "scripts", "final_image_mapping.json")
    with open(final_path, 'w') as f:
        json.dump(final_mapping, f, indent=2)
    print(f"  Final mapping saved to scripts/final_image_mapping.json")
    
    # Save category best images info
    cat_path = os.path.join(BASE_DIR, "scripts", "category_images.json")
    with open(cat_path, 'w') as f:
        json.dump(cat_best, f, indent=2)
    print(f"  Category images info saved to scripts/category_images.json")
    
    print("\n" + "=" * 60)
    print("DONE! All images extracted and mapped.")
    print("=" * 60)

if __name__ == "__main__":
    main()
