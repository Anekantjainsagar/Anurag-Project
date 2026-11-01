#!/usr/bin/env python3
"""
Update mockData.ts to use authentic Indian product images from the API extraction.
Also update category images.
"""

import json, re, os, shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def update_mockdata():
    """Replace image paths in mockData.ts with authentic API images."""
    with open(os.path.join(BASE_DIR, 'scripts', 'final_image_mapping.json')) as f:
        mapping = json.load(f)
    
    mockdata_path = os.path.join(BASE_DIR, 'src', 'data', 'mockData.ts')
    with open(mockdata_path, 'r') as f:
        content = f.read()
    
    updated = 0
    
    for product_name, new_image_path in mapping.items():
        # Escape special regex characters in the product name
        escaped_name = re.escape(product_name)
        
        # Find the product block and replace its "image" field
        # Pattern: "name": "Product Name", ... "image": "/old/path.jpg"
        pattern = rf'("name":\s*"{escaped_name}".*?"image":\s*")([^"]+)(")'
        
        def replacer(match):
            return match.group(1) + new_image_path + match.group(3)
        
        new_content, count = re.subn(pattern, replacer, content, flags=re.DOTALL)
        if count > 0:
            content = new_content
            updated += count
        
        # Also update the images array - replace first entry
        # Pattern within the product's images array
        pattern2 = rf'("name":\s*"{escaped_name}".*?"images":\s*\[\s*")([^"]+)(")'
        new_content2, count2 = re.subn(pattern2, replacer, content, flags=re.DOTALL)
        if count2 > 0:
            content = new_content2
    
    with open(mockdata_path, 'w') as f:
        f.write(content)
    
    print(f"Updated {updated} image references in mockData.ts")

def update_category_images():
    """Copy best API images as category thumbnails."""
    with open(os.path.join(BASE_DIR, 'scripts', 'category_images.json')) as f:
        cat_images = json.load(f)
    
    # Map our website categories to API categories
    cat_map = {
        "PULSES": "pulses.jpg",
        "MILLET": "millets.jpg",
        "MASALA": "spices.jpg",
        "SWEETS": "sweets.jpg",
        "HONEY": "honey.jpg",
        "DRY FRUITS": "dry-fruits.jpg",
        "SEEDS": "seeds.jpg",
        "RICE & WHEAT": "rice-wheat.jpg",
    }
    
    categories_dir = os.path.join(BASE_DIR, 'public', 'images', 'categories')
    
    for api_cat, target_filename in cat_map.items():
        if api_cat in cat_images:
            src_rel = cat_images[api_cat]  # e.g. /images/products/pulses/organic-arhar-dal.webp
            src_path = os.path.join(BASE_DIR, 'public', src_rel.lstrip('/'))
            target_path = os.path.join(categories_dir, target_filename)
            
            if os.path.exists(src_path):
                # Copy the webp as the category image (keeping .jpg extension for compatibility)
                shutil.copy2(src_path, target_path)
                print(f"  Updated {target_filename} from {src_rel}")
            else:
                print(f"  SKIP {target_filename}: source not found at {src_path}")

if __name__ == "__main__":
    print("=" * 50)
    print("Updating mockData.ts image references...")
    print("=" * 50)
    update_mockdata()
    
    print("\n" + "=" * 50)
    print("Updating category thumbnail images...")
    print("=" * 50)
    update_category_images()
    
    print("\nDone!")
