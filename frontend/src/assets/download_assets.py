import urllib.request
import ssl
import os
import time

# Create a context that bypasses SSL verification
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def download_file(urls, filename):
    # Check if file exists and is large enough (to avoid empty or error files)
    if os.path.exists(filename) and os.path.getsize(filename) > 1000:
        print(f"{filename} already exists and seems valid.")
        return True

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.google.com/'
    }

    for url in urls:
        print(f"Trying to download {url}...")
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, context=ctx, timeout=15) as response:
                if response.status == 200:
                    content = response.read()
                    if len(content) < 1000: # Too small, probably an error page
                        print(f"File too small from {url}")
                        continue
                    with open(filename, 'wb') as out_file:
                        out_file.write(content)
                    print(f"Success: {filename}")
                    return True
        except Exception as e:
            print(f"Error downloading {url}: {e}")
            time.sleep(1)
    return False

# Background URLs (Frieren Theme)
bg_urls = [
    # WallpaperFlare Preview (Likely to work)
    "https://c4.wallpaperflare.com/wallpaper/935/560/966/sousou-no-frieren-frieren-sousou-no-frieren-sky-clouds-grass-hd-wallpaper-preview.jpg",
    # WallpaperFlare Full (Try removing -preview)
    "https://c4.wallpaperflare.com/wallpaper/935/560/966/sousou-no-frieren-frieren-sousou-no-frieren-sky-clouds-grass-hd-wallpaper.jpg",
    # AlphaCoders (Try different subdomains and extensions)
    "https://images.alphacoders.com/133/1336495.jpeg",
    "https://images2.alphacoders.com/133/1336495.jpeg",
    "https://images3.alphacoders.com/133/1336495.jpeg",
    "https://images4.alphacoders.com/133/1336495.jpeg",
    "https://images5.alphacoders.com/133/1336495.jpeg",
    # Fallback to a high quality anime landscape if Frieren specific fails (to ensure user has SOMETHING)
    "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920&auto=format&fit=crop" 
]

# GIF URLs (Running Anime Girl)
gif_urls = [
    "https://media.tenor.com/B7_t2y_1tK0AAAAi/running-anime-girl.gif",
    "https://i.gifer.com/origin/f3/f3a097255955146e254f593b4a45749a_w200.gif"
]

base_dir = os.path.dirname(os.path.abspath(__file__))
bg_path = os.path.join(base_dir, "frieren_bg.jpg")
gif_path = os.path.join(base_dir, "running.gif")

print("Downloading assets...")
if download_file(bg_urls, bg_path):
    print("Background downloaded successfully.")
else:
    print("Failed to download background.")

if download_file(gif_urls, gif_path):
    print("GIF downloaded successfully.")
else:
    print("Failed to download GIF.")
