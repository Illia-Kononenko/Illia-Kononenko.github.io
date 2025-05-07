# SEO Robots & Canonical Checker Bookmarklet

This bookmarklet helps you quickly check if a webpage is **blocked from indexing** (via meta robots or `robots.txt`) and whether it is **canonical**.

## 🔍 Features

- Detects `meta robots` and `X-Robots-Tag` headers
- Displays the canonical URL, if present
- Works instantly on any page with one click

## 🧩 Bookmarklet

Drag the link below to your bookmarks bar or right-click to save it:

```
javascript:(function(){var s=document.createElement('script');s.type='text/javascript';s.src='https://illia-kononenko.github.io/robots.js';s.setAttribute('charset','utf-8');document.getElementsByTagName('body')[0].appendChild(s)})();void(0);
```

## 💡 How to Use

1. Visit any webpage.
2. Click the bookmarklet from your bookmarks bar.
3. A small popup will show indexing and canonical info.

## ⚠️ Notes

- This tool runs entirely in your browser — no data is sent anywhere.
- Best used for quick on-page SEO diagnostics.


