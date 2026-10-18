# Alejandro Cano — Personal Website

A static, single-page academic portfolio. The page content and extracted images are stored locally in this repository; no build step or external content service is required.

## GitHub Pages

For a personal site on the `alexcano404` account, use the repository name `alexcano404.github.io`. Publish from the `main` branch and the repository root in **Settings → Pages**. The expected site address is `https://alexcano404.github.io`.

Google Fonts are loaded remotely; the page remains readable if that service is unavailable. The photo gallery and project visuals are included under `assets/google-site/`.

## Search engines

The root-level `robots.txt` allows crawling and points crawlers to `sitemap.xml`. The sitemap lists the canonical home page at `https://alexcano404.github.io/`. The page also includes a canonical URL, social sharing metadata, and basic Person structured data. No build step or additional package dependencies are required.

To request indexing, add `https://alexcano404.github.io/` as a URL-prefix property in [Google Search Console](https://search.google.com/search-console), verify ownership using the HTML meta tag Google provides, then submit `sitemap.xml` in the Sitemaps report. You can also add the site in [Bing Webmaster Tools](https://www.bing.com/webmasters) and submit the same sitemap, or import the verified site from Search Console. Sitemap submission helps discovery but does not guarantee indexing or a particular search ranking.

## Source and attribution

The site was adapted from the [8B Reflow repair-shop template](https://github.com/8bsite/repair-shop-website-template); see [LICENSE](LICENSE) and [CREDITS.md](CREDITS.md). The text and photography belong to their respective authors.
