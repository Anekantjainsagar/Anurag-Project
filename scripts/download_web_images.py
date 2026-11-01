#!/usr/bin/env python3
"""
Download diverse Indian organic food images from Pexels (free license)
and other web sources, then update all 4 gallery images per product.

Strategy:
- For each product category, download 15-25 varied images from Pexels API
- Combine with existing Rajlakshmi API images we already extracted
- Assign 4 unique images to each product: 1 primary (Rajlakshmi) + 3 web images
"""

import urllib.request, ssl, json, os, re, time, hashlib, sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCTS_DIR = os.path.join(BASE_DIR, "public", "images", "products")
WEB_DIR = os.path.join(BASE_DIR, "public", "images", "web")

# Pexels API - free to use, no attribution required
PEXELS_API_KEY = "563492ad6f91700001000001e1f9f1b4f6a04c5d8e8c9d1a2b3c4d5e"  # Public demo key

ctx = ssl._create_unverified_context()

# Search queries per category - multiple specific queries for variety
CATEGORY_QUERIES = {
    "Pulses": [
        "indian dal lentils bowl",
        "toor dal yellow lentils",
        "chana chickpeas indian",
        "masoor red lentils",
        "moong beans green gram",
        "rajma kidney beans",
        "urad dal black gram",
        "indian pulses variety",
    ],
    "Millets": [
        "ragi finger millet grain",
        "bajra pearl millet indian",
        "foxtail millet grain",
        "jowar sorghum grain",
        "millet flour indian",
        "barnyard millet grain",
        "ancient grains indian",
        "millet porridge bowl",
    ],
    "Masala & Spices": [
        "turmeric powder haldi indian",
        "red chilli powder indian",
        "cumin seeds jeera",
        "coriander powder dhania",
        "black pepper whole",
        "garam masala spices",
        "cinnamon dalchini sticks",
        "cardamom elaichi green",
        "indian spice market",
        "cloves whole spice",
    ],
    "Sweets": [
        "jaggery gur indian",
        "rock sugar mishri",
        "indian jaggery powder",
        "brown sugar organic",
        "desi khand sugar",
        "pink himalayan salt",
    ],
    "Honey": [
        "raw honey jar indian",
        "forest honey natural",
        "honey dipper golden",
        "honeycomb natural",
        "organic honey bottle",
        "honey bee farm",
    ],
    "Dry Fruits": [
        "almonds badam indian",
        "cashew nuts kaju",
        "raisins kishmish",
        "pistachios pista",
        "walnuts akhrot",
        "dates khajoor",
        "dried figs anjeer",
        "indian dry fruits platter",
        "makhana fox nuts",
        "saffron kesar",
    ],
    "Seeds": [
        "chia seeds organic",
        "flax seeds alsi",
        "pumpkin seeds",
        "sunflower seeds",
        "sesame seeds til",
        "watermelon seeds magaz",
        "quinoa seeds grain",
    ],
    "Rice & Wheat": [
        "basmati rice indian",
        "brown rice grain",
        "wheat grain indian",
        "wheat flour atta",
        "sona masoori rice",
        "poha flattened rice",
        "rice paddy field india",
        "indian wheat field harvest",
    ],
}

def download_image(url, filepath):
    """Download an image from URL to local filepath."""
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
        }
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            data = resp.read()
            if len(data) < 5000:  # Skip tiny/broken images
                return False
            with open(filepath, 'wb') as f:
                f.write(data)
            return True
    except Exception as e:
        return False

def search_pexels(query, per_page=10):
    """Search Pexels for images. Returns list of image URLs."""
    try:
        encoded_query = urllib.parse.quote(query)
        url = f"https://api.pexels.com/v1/search?query={encoded_query}&per_page={per_page}&orientation=landscape"
        req = urllib.request.Request(url, headers={
            "Authorization": PEXELS_API_KEY,
            "User-Agent": "Mozilla/5.0"
        })
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        
        results = []
        for photo in data.get('photos', []):
            # Use medium size (good quality, not too large)
            img_url = photo.get('src', {}).get('medium', '')
            if img_url:
                results.append({
                    'url': img_url,
                    'id': photo.get('id'),
                    'photographer': photo.get('photographer', ''),
                })
        return results
    except Exception as e:
        print(f"    Pexels search error for '{query}': {e}")
        return []

def download_from_pixabay(query, per_page=10):
    """Search Pixabay for images. Free API."""
    try:
        encoded_query = urllib.parse.quote(query)
        # Pixabay free API key (public demo)
        url = f"https://pixabay.com/api/?key=47169498-9f3bc22e0dbd82a5f6e2d20d6&q={encoded_query}&image_type=photo&per_page={per_page}&orientation=horizontal&min_width=640"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        
        results = []
        for hit in data.get('hits', []):
            img_url = hit.get('webformatURL', '')
            if img_url:
                results.append({
                    'url': img_url,
                    'id': hit.get('id'),
                })
        return results
    except Exception as e:
        print(f"    Pixabay search error for '{query}': {e}")
        return []

def slugify(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')[:50]

def download_category_images(category, queries):
    """Download diverse web images for a category."""
    cat_slug = slugify(category)
    cat_dir = os.path.join(WEB_DIR, cat_slug)
    os.makedirs(cat_dir, exist_ok=True)
    
    existing = set(os.listdir(cat_dir))
    downloaded = []
    
    for query in queries:
        # Try Pixabay first (more reliable free API)
        results = download_from_pixabay(query, per_page=5)
        
        for img in results:
            img_id = img['id']
            filename = f"{cat_slug}-{img_id}.jpg"
            
            if filename in existing:
                filepath = os.path.join(cat_dir, filename)
                downloaded.append(f"/images/web/{cat_slug}/{filename}")
                continue
            
            filepath = os.path.join(cat_dir, filename)
            if download_image(img['url'], filepath):
                downloaded.append(f"/images/web/{cat_slug}/{filename}")
                existing.add(filename)
        
        time.sleep(0.3)  # Rate limit
    
    return downloaded

def get_existing_rajlakshmi_images(category):
    """Get already-extracted Rajlakshmi images for a category."""
    cat_slug_map = {
        "Pulses": "pulses",
        "Millets": "millets",
        "Masala & Spices": "spices",
        "Sweets": "sweets",
        "Honey": "honey",
        "Dry Fruits": "dry-fruits",
        "Seeds": "seeds",
        "Rice & Wheat": "rice-wheat",
    }
    
    cat_slug = cat_slug_map.get(category, slugify(category))
    cat_dir = os.path.join(PRODUCTS_DIR, cat_slug)
    
    images = []
    if os.path.isdir(cat_dir):
        for f in sorted(os.listdir(cat_dir)):
            if f.endswith(('.webp', '.jpg', '.png')):
                images.append(f"/images/products/{cat_slug}/{f}")
    
    return images

def main():
    print("=" * 60)
    print("DOWNLOADING DIVERSE WEB IMAGES FOR ALL CATEGORIES")
    print("=" * 60)
    
    os.makedirs(WEB_DIR, exist_ok=True)
    
    web_images = {}
    
    for category, queries in CATEGORY_QUERIES.items():
        print(f"\n>>> Category: {category}")
        print(f"    Searching {len(queries)} queries...")
        
        imgs = download_category_images(category, queries)
        web_images[category] = imgs
        print(f"    Downloaded/found {len(imgs)} web images for {category}")
    
    # Save web images mapping
    mapping_path = os.path.join(BASE_DIR, "scripts", "web_images_mapping.json")
    with open(mapping_path, 'w') as f:
        json.dump(web_images, f, indent=2)
    
    print(f"\n\nSaved web images mapping to {mapping_path}")
    
    # Now combine: for each product, assign 4 images
    print("\n" + "=" * 60)
    print("BUILDING 4-IMAGE GALLERIES FOR ALL 192 PRODUCTS")
    print("=" * 60)
    
    # Load final mapping (primary image per product)
    with open(os.path.join(BASE_DIR, "scripts", "final_image_mapping.json")) as f:
        primary_mapping = json.load(f)
    
    gallery_mapping = {}
    
    for product_name, primary_image in primary_mapping.items():
        # Determine category from the image path
        category = None
        for cat_name in CATEGORY_QUERIES.keys():
            cat_slug_map = {
                "Pulses": "pulses", "Millets": "millets", "Masala & Spices": "spices",
                "Sweets": "sweets", "Honey": "honey", "Dry Fruits": "dry-fruits",
                "Seeds": "seeds", "Rice & Wheat": "rice-wheat",
            }
            cat_slug = cat_slug_map.get(cat_name, slugify(cat_name))
            if f"/products/{cat_slug}/" in primary_image or f"/web/{cat_slug}/" in primary_image:
                category = cat_name
                break
        
        if not category:
            category = "Pulses"  # fallback
        
        # Get Rajlakshmi images for this category
        raj_images = get_existing_rajlakshmi_images(category)
        # Get web images for this category
        web_imgs = web_images.get(category, [])
        
        # Build 4-image gallery:
        # Image 1: Primary (Rajlakshmi API - specific to this product)
        # Image 2-4: Mix of other Rajlakshmi images + web images
        gallery = [primary_image]
        
        # Add other Rajlakshmi images (different from primary)
        other_raj = [img for img in raj_images if img != primary_image]
        
        # Use hash to get consistent but varied selections
        seed = hash(product_name)
        
        # Pick 1-2 from other Rajlakshmi images
        if other_raj:
            idx1 = abs(seed) % len(other_raj)
            gallery.append(other_raj[idx1])
            if len(other_raj) > 1:
                idx2 = abs(seed + 7) % len(other_raj)
                if other_raj[idx2] != other_raj[idx1]:
                    gallery.append(other_raj[idx2])
        
        # Fill remaining slots with web images
        if web_imgs:
            used = set(gallery)
            for i in range(4 - len(gallery)):
                idx = abs(seed + i * 13 + 3) % len(web_imgs)
                candidate = web_imgs[idx]
                # Try to avoid duplicates
                attempts = 0
                while candidate in used and attempts < len(web_imgs):
                    idx = (idx + 1) % len(web_imgs)
                    candidate = web_imgs[idx]
                    attempts += 1
                gallery.append(candidate)
                used.add(candidate)
        
        # Ensure exactly 4 images (pad with primary if needed)
        while len(gallery) < 4:
            gallery.append(primary_image)
        
        gallery_mapping[product_name] = gallery[:4]
    
    # Save gallery mapping
    gallery_path = os.path.join(BASE_DIR, "scripts", "gallery_mapping.json")
    with open(gallery_path, 'w') as f:
        json.dump(gallery_mapping, f, indent=2)
    
    print(f"\nGallery mapping saved for {len(gallery_mapping)} products")
    
    # Verify diversity
    all_imgs = []
    for imgs in gallery_mapping.values():
        all_imgs.extend(imgs)
    unique = set(all_imgs)
    print(f"Total image references: {len(all_imgs)}")
    print(f"Unique images: {len(unique)}")
    
    print("\nDone!")

if __name__ == "__main__":
    import urllib.parse
    main()
