# Hero Video

Drop your cinematic hero footage here as:

    public/videos/hero.mp4

Recommended specs for best performance:
- Format: MP4 (H.264)
- Resolution: 1920x1080 (or 2560x1440 for very high-end displays)
- Duration: 10–20 seconds, seamlessly loopable
- File size: keep under ~8–12 MB (compress with Handbrake / ffmpeg) so it
  loads fast on mobile connections
- No audio needed — the video is muted by default (autoplay policies in all
  browsers require this), but a mute/unmute button is included in the UI in
  case you want to add ambient audio for desktop visitors who unmute.

Example ffmpeg compression command:

    ffmpeg -i input.mov -vcodec libx264 -crf 28 -preset slow -vf scale=1920:-2 -an public/videos/hero.mp4

Until you add hero.mp4, the Hero section automatically falls back to a
high-quality poster image, so the site never shows a broken player.

You can also swap the fallback poster image by editing the `poster` prop
passed to <HeroVideo /> in components/home/Hero.tsx.
