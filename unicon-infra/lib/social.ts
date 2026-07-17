/**
 * Helpers for auto-pulling the latest content from a YouTube channel.
 *
 * No API key is required:
 * - The channel ID is resolved by reading the public channel page once
 *   (result is cached for a day, since a channel's ID never changes).
 * - The latest video is read from YouTube's public RSS feed, which every
 *   channel exposes for free and which updates the moment a new video
 *   is uploaded. This is cached for a short time so we don't hit YouTube
 *   on every single page load.
 */

const CHANNEL_ID_PATTERN = /^UC[A-Za-z0-9_-]{22}$/;

function buildChannelPageUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (CHANNEL_ID_PATTERN.test(trimmed)) {
    return `https://www.youtube.com/channel/${trimmed}`;
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  if (trimmed.startsWith("@")) {
    return `https://www.youtube.com/${trimmed}`;
  }
  // Bare handle without the @ sign
  return `https://www.youtube.com/@${trimmed}`;
}

/**
 * Resolves any of: a channel ID, a full channel URL, a /@handle URL,
 * or a bare handle, down to the canonical UC... channel ID.
 */
export async function resolveYoutubeChannelId(input?: string): Promise<string | null> {
  if (!input) return null;
  const trimmed = input.trim();
  if (CHANNEL_ID_PATTERN.test(trimmed)) return trimmed;

  const pageUrl = buildChannelPageUrl(trimmed);
  if (!pageUrl) return null;

  try {
    const res = await fetch(pageUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; UniconInfraBot/1.0)" },
      next: { revalidate: 60 * 60 * 24 }, // channel ID never changes, cache for a day
    });
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(/"channelId":"(UC[A-Za-z0-9_-]{22})"/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/**
 * Reads the channel's public RSS feed and returns the most recent video ID.
 */
export async function getLatestYoutubeVideoId(channelId?: string | null): Promise<string | null> {
  if (!channelId) return null;

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`,
      { next: { revalidate: 60 * 15 } } // refresh every 15 minutes
    );
    if (!res.ok) return null;
    const xml = await res.text();
    const match = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/**
 * Convenience wrapper: takes whatever the admin pasted in settings
 * (channel URL / handle / ID) and returns the latest video's embeddable ID.
 */
export async function getLatestVideoIdFromChannelInput(
  channelInput?: string
): Promise<string | null> {
  const channelId = await resolveYoutubeChannelId(channelInput);
  return getLatestYoutubeVideoId(channelId);
}

/**
 * Instagram's own Graph API — the only route that's both free and free of
 * any third-party widget branding. Requires a one-time setup on
 * developers.facebook.com to get an access token for the account, but after
 * that, nothing else needs to be touched: new reels/posts show up
 * automatically as the token stays valid.
 */
export interface InstagramMedia {
  permalink: string;
  mediaType: string;
}

export async function getLatestInstagramMedia(
  accessToken?: string
): Promise<InstagramMedia | null> {
  if (!accessToken || !accessToken.trim()) return null;

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,permalink,timestamp&limit=10&access_token=${encodeURIComponent(
        accessToken.trim()
      )}`,
      { next: { revalidate: 60 * 15 } } // refresh every 15 minutes
    );
    if (!res.ok) return null;
    const data = await res.json();
    const items: { id: string; media_type: string; permalink: string }[] = data?.data ?? [];
    if (!items.length) return null;

    // Prefer a reel/video if the latest few posts include one, otherwise
    // just show whatever was posted most recently.
    const reel = items.find((item) => item.media_type === "VIDEO" || item.media_type === "REELS");
    const chosen = reel ?? items[0];
    return { permalink: chosen.permalink, mediaType: chosen.media_type };
  } catch {
    return null;
  }
}

/** Turns a permalink (e.g. .../reel/Cabc123/) into its official embeddable URL. */
export function getInstagramEmbedUrl(permalink?: string | null): string | null {
  if (!permalink) return null;
  const normalized = permalink.endsWith("/") ? permalink : `${permalink}/`;
  return `${normalized}embed`;
}
