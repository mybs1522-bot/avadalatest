import urllib.request
import re

url = 'https://iframe.mediadelivery.net/embed/489113/a214b199-e64a-4eaf-af70-edfbc586e5fd?autoplay=true&loop=true&muted=true&preload=true&responsive=true'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

print('Searching for stream URLs...')
for line in html.split('\n'):
    if 'b-cdn.net' in line or 'playlist.m3u8' in line or 'video.mp4' in line or '500' in line:
        print(line.strip()[:300])
