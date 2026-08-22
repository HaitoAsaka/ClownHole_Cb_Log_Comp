// ── VIDEO CONFIG ──────────────────────────────────────────────────
// Video tab panels are 100% data-driven from this array — the container
// markup, grid layout and mobile styling are all generic (see #video-container
// / .video-panel in Clown Hole Tool.html's <style>) and never need to change.
//
// To add a new video: append ONE object below with a unique `storageSuffix`
// (never reuse/reorder existing suffixes — they key localStorage persistence),
// a `title`, an optional `desc`, and a `defaultUrl` pointing at the Google
// Drive share link. `renderVideoView()` (in Clown Hole Tool.html) maps over
// this array on every render, so the new panel appears automatically — no
// HTML/CSS/JS changes needed elsewhere.
//
// This file must stay a plain <script>-loaded .js (not JSON/fetch) so the
// tool still works when someone just downloads the .html and double-clicks
// it — fetch() of a local file is blocked by browsers, but <script src>
// loading of an adjacent local file is not.

//ĐỔI video URL mặc định nếu muốn, nhưng phải là link share của Google Drive (như ví dụ dưới)
const DEFAULT_DRIVE_VIDEO_URL =
  "https://drive.google.com/file/d/17ra4YFg_RZfzO_mShFHs6otuhdJWoxLP/view";

const driveVideoConfigs = [
  {
    storageSuffix: 0,
    title: "Luce Cancel",
    desc: "Cancel skill Luce của A múp (khi Textbox hiện lên và A múp bắt đầu giơ tay lên thì bấm UB)",
    defaultUrl: DEFAULT_DRIVE_VIDEO_URL,
  },
  {
    storageSuffix: 1,
    title: "Ayane's Cheer Cancel",
    desc: "đây là mô tả",
    defaultUrl: "https://drive.google.com/file/d/1UHnDZ3tMrsTD8uqaxJNl3nI0DsaH8t5I/view?usp=sharing",
  },
  // {
  //   storageSuffix: 2,
  //   title: "Test Video 2",
  //   desc: "đây là mô tả",
  //   defaultUrl: "https://drive.google.com/file/d/1UHnDZ3tMrsTD8uqaxJNl3nI0DsaH8t5I/view?usp=sharing",
  // },
  // { storageSuffix: 2, title: "New Move Name", desc: "mô tả ngắn", defaultUrl: "https://drive.google.com/file/d/FILE_ID/view?usp=sharing" },
];
