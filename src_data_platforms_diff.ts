--- src/data/platforms.ts (原始)
export interface Platform {
  name: string;
  url: string;
  category: string;
  icon: string;
  color: string;
}

export const platforms: Platform[] = [
  // Social Media
  { name: "Twitter/X", url: "https://x.com/{username}", category: "Social Media", icon: "fa-brands fa-x-twitter", color: "#1DA1F2" },
  { name: "Instagram", url: "https://www.instagram.com/{username}/", category: "Social Media", icon: "fa-brands fa-instagram", color: "#E4405F" },
  { name: "Facebook", url: "https://www.facebook.com/{username}", category: "Social Media", icon: "fa-brands fa-facebook", color: "#1877F2" },
  { name: "TikTok", url: "https://www.tiktok.com/@{username}", category: "Social Media", icon: "fa-brands fa-tiktok", color: "#000000" },
  { name: "Snapchat", url: "https://www.snapchat.com/add/{username}", category: "Social Media", icon: "fa-brands fa-snapchat", color: "#FFFC00" },
  { name: "Reddit", url: "https://www.reddit.com/user/{username}", category: "Social Media", icon: "fa-brands fa-reddit", color: "#FF4500" },
  { name: "Pinterest", url: "https://www.pinterest.com/{username}", category: "Social Media", icon: "fa-brands fa-pinterest", color: "#E60023" },
  { name: "Tumblr", url: "https://{username}.tumblr.com", category: "Social Media", icon: "fa-brands fa-tumblr", color: "#35465C" },
  { name: "Threads", url: "https://www.threads.net/@{username}", category: "Social Media", icon: "fa-brands fa-threads", color: "#000000" },
  { name: "Mastodon", url: "https://mastodon.social/@{username}", category: "Social Media", icon: "fa-brands fa-mastodon", color: "#6364FF" },

  // Developer / Tech
  { name: "GitHub", url: "https://github.com/{username}", category: "Developer", icon: "fa-brands fa-github", color: "#ffffff" },
  { name: "GitLab", url: "https://gitlab.com/{username}", category: "Developer", icon: "fa-brands fa-gitlab", color: "#FC6D26" },
  { name: "Stack Overflow", url: "https://stackoverflow.com/users/{username}", category: "Developer", icon: "fa-brands fa-stack-overflow", color: "#F58025" },
  { name: "Dev.to", url: "https://dev.to/{username}", category: "Developer", icon: "fa-brands fa-dev", color: "#0A0A0A" },
  { name: "CodePen", url: "https://codepen.io/{username}", category: "Developer", icon: "fa-brands fa-codepen", color: "#ffffff" },
  { name: "Replit", url: "https://replit.com/@{username}", category: "Developer", icon: "fa-solid fa-code", color: "#F26207" },
  { name: "HackerRank", url: "https://www.hackerrank.com/{username}", category: "Developer", icon: "fa-brands fa-hackerrank", color: "#00EA64" },
  { name: "LeetCode", url: "https://leetcode.com/{username}", category: "Developer", icon: "fa-solid fa-code", color: "#FFA116" },
  { name: "npm", url: "https://www.npmjs.com/~{username}", category: "Developer", icon: "fa-brands fa-npm", color: "#CB3837" },
  { name: "PyPI", url: "https://pypi.org/user/{username}/", category: "Developer", icon: "fa-brands fa-python", color: "#3776AB" },

  // Gaming
  { name: "Steam", url: "https://steamcommunity.com/id/{username}", category: "Gaming", icon: "fa-brands fa-steam", color: "#000000" },
  { name: "Twitch", url: "https://www.twitch.tv/{username}", category: "Gaming", icon: "fa-brands fa-twitch", color: "#9146FF" },
  { name: "Xbox Gamertag", url: "https://xboxgamertag.com/search/{username}", category: "Gaming", icon: "fa-brands fa-xbox", color: "#107C10" },
  { name: "Chess.com", url: "https://www.chess.com/member/{username}", category: "Gaming", icon: "fa-solid fa-chess", color: "#81B64C" },
  { name: "Lichess", url: "https://lichess.org/@/{username}", category: "Gaming", icon: "fa-solid fa-chess-knight", color: "#ffffff" },

  // Video / Streaming
  { name: "YouTube", url: "https://www.youtube.com/@{username}", category: "Video", icon: "fa-brands fa-youtube", color: "#FF0000" },
  { name: "Vimeo", url: "https://vimeo.com/{username}", category: "Video", icon: "fa-brands fa-vimeo-v", color: "#1AB7EA" },
  { name: "Dailymotion", url: "https://www.dailymotion.com/{username}", category: "Video", icon: "fa-solid fa-video", color: "#0066DC" },
  { name: "SoundCloud", url: "https://soundcloud.com/{username}", category: "Video", icon: "fa-brands fa-soundcloud", color: "#FF3300" },
  { name: "Spotify", url: "https://open.spotify.com/user/{username}", category: "Video", icon: "fa-brands fa-spotify", color: "#1DB954" },

  // Professional
  { name: "LinkedIn", url: "https://www.linkedin.com/in/{username}", category: "Professional", icon: "fa-brands fa-linkedin", color: "#0A66C2" },
  { name: "Medium", url: "https://medium.com/@{username}", category: "Professional", icon: "fa-brands fa-medium", color: "#ffffff" },
  { name: "Behance", url: "https://www.behance.net/{username}", category: "Professional", icon: "fa-brands fa-behance", color: "#1769FF" },
  { name: "Dribbble", url: "https://dribbble.com/{username}", category: "Professional", icon: "fa-brands fa-dribbble", color: "#EA4C89" },
  { name: "Product Hunt", url: "https://www.producthunt.com/@{username}", category: "Professional", icon: "fa-solid fa-rocket", color: "#DA552F" },
  { name: "Keybase", url: "https://keybase.io/{username}", category: "Professional", icon: "fa-brands fa-keybase", color: "#33A0FF" },

  // Messaging / Chat
  { name: "Telegram", url: "https://t.me/{username}", category: "Messaging", icon: "fa-brands fa-telegram", color: "#26A5E4" },
  { name: "Discord (via id)", url: "https://discord.com/users/{username}", category: "Messaging", icon: "fa-brands fa-discord", color: "#5865F2" },
  { name: "Slack", url: "https://{username}.slack.com", category: "Messaging", icon: "fa-brands fa-slack", color: "#4A154B" },

  // Other
  { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/User:{username}", category: "Other", icon: "fa-brands fa-wikipedia-w", color: "#ffffff" },
  { name: "Patreon", url: "https://www.patreon.com/{username}", category: "Other", icon: "fa-brands fa-patreon", color: "#FF424D" },
  { name: "Ko-fi", url: "https://ko-fi.com/{username}", category: "Other", icon: "fa-solid fa-mug-hot", color: "#FF5E5B" },
  { name: "Linktree", url: "https://linktr.ee/{username}", category: "Other", icon: "fa-solid fa-link", color: "#43E55E" },
  { name: "About.me", url: "https://about.me/{username}", category: "Other", icon: "fa-solid fa-user", color: "#00A98F" },
  { name: "Gravatar", url: "https://en.gravatar.com/{username}", category: "Other", icon: "fa-solid fa-user-circle", color: "#1E8CBE" },
  { name: "Flickr", url: "https://www.flickr.com/people/{username}", category: "Other", icon: "fa-brands fa-flickr", color: "#FF0084" },
  { name: "500px", url: "https://500px.com/{username}", category: "Other", icon: "fa-solid fa-camera", color: "#0099E5" },
  { name: "Imgur", url: "https://imgur.com/user/{username}", category: "Other", icon: "fa-solid fa-image", color: "#1BB76E" },
  { name: "Pinterest", url: "https://www.pinterest.com/{username}", category: "Other", icon: "fa-brands fa-pinterest-p", color: "#E60023" },
  { name: "Quora", url: "https://www.quora.com/profile/{username}", category: "Other", icon: "fa-brands fa-quora", color: "#B92B27" },
  { name: "Kick", url: "https://kick.com/{username}", category: "Other", icon: "fa-solid fa-bolt", color: "#53FC18" },
  { name: "Rumble", url: "https://rumble.com/user/{username}", category: "Other", icon: "fa-solid fa-play", color: "#85C742" },
  { name: "Myspace", url: "https://myspace.com/{username}", category: "Other", icon: "fa-solid fa-music", color: "#000000" },
];

export const categories = [...new Set(platforms.map(p => p.category))];


+++ src/data/platforms.ts (修改后)
export interface Platform {
  name: string;
  url: string;
  category: string;
  icon: string;
  color: string;
}

export const platforms: Platform[] = [
  // Social Media
  { name: "Twitter/X", url: "https://x.com/{username}", category: "Social Media", icon: "fa-brands fa-x-twitter", color: "#1DA1F2" },
  { name: "Instagram", url: "https://www.instagram.com/{username}/", category: "Social Media", icon: "fa-brands fa-instagram", color: "#E4405F" },
  { name: "Facebook", url: "https://www.facebook.com/{username}", category: "Social Media", icon: "fa-brands fa-facebook", color: "#1877F2" },
  { name: "TikTok", url: "https://www.tiktok.com/@{username}", category: "Social Media", icon: "fa-brands fa-tiktok", color: "#000000" },
  { name: "Snapchat", url: "https://www.snapchat.com/add/{username}", category: "Social Media", icon: "fa-brands fa-snapchat", color: "#FFFC00" },
  { name: "Reddit", url: "https://www.reddit.com/user/{username}", category: "Social Media", icon: "fa-brands fa-reddit", color: "#FF4500" },
  { name: "Pinterest", url: "https://www.pinterest.com/{username}", category: "Social Media", icon: "fa-brands fa-pinterest", color: "#E60023" },
  { name: "Tumblr", url: "https://{username}.tumblr.com", category: "Social Media", icon: "fa-brands fa-tumblr", color: "#35465C" },
  { name: "Threads", url: "https://www.threads.net/@{username}", category: "Social Media", icon: "fa-brands fa-threads", color: "#000000" },
  { name: "Mastodon", url: "https://mastodon.social/@{username}", category: "Social Media", icon: "fa-brands fa-mastodon", color: "#6364FF" },

  // Developer / Tech
  { name: "GitHub", url: "https://github.com/{username}", category: "Developer", icon: "fa-brands fa-github", color: "#ffffff" },
  { name: "GitLab", url: "https://gitlab.com/{username}", category: "Developer", icon: "fa-brands fa-gitlab", color: "#FC6D26" },
  { name: "Stack Overflow", url: "https://stackoverflow.com/users/{username}", category: "Developer", icon: "fa-brands fa-stack-overflow", color: "#F58025" },
  { name: "Dev.to", url: "https://dev.to/{username}", category: "Developer", icon: "fa-brands fa-dev", color: "#0A0A0A" },
  { name: "CodePen", url: "https://codepen.io/{username}", category: "Developer", icon: "fa-brands fa-codepen", color: "#ffffff" },
  { name: "Replit", url: "https://replit.com/@{username}", category: "Developer", icon: "fa-solid fa-code", color: "#F26207" },
  { name: "HackerRank", url: "https://www.hackerrank.com/{username}", category: "Developer", icon: "fa-brands fa-hackerrank", color: "#00EA64" },
  { name: "LeetCode", url: "https://leetcode.com/{username}", category: "Developer", icon: "fa-solid fa-code", color: "#FFA116" },
  { name: "npm", url: "https://www.npmjs.com/~{username}", category: "Developer", icon: "fa-brands fa-npm", color: "#CB3837" },
  { name: "PyPI", url: "https://pypi.org/user/{username}/", category: "Developer", icon: "fa-brands fa-python", color: "#3776AB" },

  // Gaming
  { name: "Steam", url: "https://steamcommunity.com/id/{username}", category: "Gaming", icon: "fa-brands fa-steam", color: "#000000" },
  { name: "Twitch", url: "https://www.twitch.tv/{username}", category: "Gaming", icon: "fa-brands fa-twitch", color: "#9146FF" },
  { name: "Xbox Gamertag", url: "https://xboxgamertag.com/search/{username}", category: "Gaming", icon: "fa-brands fa-xbox", color: "#107C10" },
  { name: "Chess.com", url: "https://www.chess.com/member/{username}", category: "Gaming", icon: "fa-solid fa-chess", color: "#81B64C" },
  { name: "Lichess", url: "https://lichess.org/@/{username}", category: "Gaming", icon: "fa-solid fa-chess-knight", color: "#ffffff" },

  // Video / Streaming
  { name: "YouTube", url: "https://www.youtube.com/@{username}", category: "Video", icon: "fa-brands fa-youtube", color: "#FF0000" },
  { name: "Vimeo", url: "https://vimeo.com/{username}", category: "Video", icon: "fa-brands fa-vimeo-v", color: "#1AB7EA" },
  { name: "Dailymotion", url: "https://www.dailymotion.com/{username}", category: "Video", icon: "fa-solid fa-video", color: "#0066DC" },
  { name: "SoundCloud", url: "https://soundcloud.com/{username}", category: "Video", icon: "fa-brands fa-soundcloud", color: "#FF3300" },
  { name: "Spotify", url: "https://open.spotify.com/user/{username}", category: "Video", icon: "fa-brands fa-spotify", color: "#1DB954" },

  // Professional
  { name: "LinkedIn", url: "https://www.linkedin.com/in/{username}", category: "Professional", icon: "fa-brands fa-linkedin", color: "#0A66C2" },
  { name: "Medium", url: "https://medium.com/@{username}", category: "Professional", icon: "fa-brands fa-medium", color: "#ffffff" },
  { name: "Behance", url: "https://www.behance.net/{username}", category: "Professional", icon: "fa-brands fa-behance", color: "#1769FF" },
  { name: "Dribbble", url: "https://dribbble.com/{username}", category: "Professional", icon: "fa-brands fa-dribbble", color: "#EA4C89" },
  { name: "Product Hunt", url: "https://www.producthunt.com/@{username}", category: "Professional", icon: "fa-solid fa-rocket", color: "#DA552F" },
  { name: "Keybase", url: "https://keybase.io/{username}", category: "Professional", icon: "fa-brands fa-keybase", color: "#33A0FF" },

  // Messaging / Chat
  { name: "Telegram", url: "https://t.me/{username}", category: "Messaging", icon: "fa-brands fa-telegram", color: "#26A5E4" },
  { name: "Discord (via id)", url: "https://discord.com/users/{username}", category: "Messaging", icon: "fa-brands fa-discord", color: "#5865F2" },
  { name: "Slack", url: "https://{username}.slack.com", category: "Messaging", icon: "fa-brands fa-slack", color: "#4A154B" },

  // Other
  { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/User:{username}", category: "Other", icon: "fa-brands fa-wikipedia-w", color: "#ffffff" },
  { name: "Patreon", url: "https://www.patreon.com/{username}", category: "Other", icon: "fa-brands fa-patreon", color: "#FF424D" },
  { name: "Ko-fi", url: "https://ko-fi.com/{username}", category: "Other", icon: "fa-solid fa-mug-hot", color: "#FF5E5B" },
  { name: "Linktree", url: "https://linktr.ee/{username}", category: "Other", icon: "fa-solid fa-link", color: "#43E55E" },
  { name: "About.me", url: "https://about.me/{username}", category: "Other", icon: "fa-solid fa-user", color: "#00A98F" },
  { name: "Gravatar", url: "https://en.gravatar.com/{username}", category: "Other", icon: "fa-solid fa-user-circle", color: "#1E8CBE" },
  { name: "Flickr", url: "https://www.flickr.com/people/{username}", category: "Other", icon: "fa-brands fa-flickr", color: "#FF0084" },
  { name: "500px", url: "https://500px.com/{username}", category: "Other", icon: "fa-solid fa-camera", color: "#0099E5" },
  { name: "Imgur", url: "https://imgur.com/user/{username}", category: "Other", icon: "fa-solid fa-image", color: "#1BB76E" },
  { name: "Quora", url: "https://www.quora.com/profile/{username}", category: "Other", icon: "fa-brands fa-quora", color: "#B92B27" },
  { name: "Kick", url: "https://kick.com/{username}", category: "Other", icon: "fa-solid fa-bolt", color: "#53FC18" },
  { name: "Rumble", url: "https://rumble.com/user/{username}", category: "Other", icon: "fa-solid fa-play", color: "#85C742" },
  { name: "Myspace", url: "https://myspace.com/{username}", category: "Other", icon: "fa-solid fa-music", color: "#000000" },
];

export const categories = [...new Set(platforms.map(p => p.category))];
