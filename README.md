# Alejandro Cano — Personal Website

A static, single-page academic portfolio. The page content and extracted images are stored locally in this repository; no build step or external content service is required.

## GitHub Pages

For a personal site on the `alexcano404` account, use the repository name `alexcano404.github.io`. Publish from the `main` branch and the repository root in **Settings → Pages**. The expected site address is `https://alexcano404.github.io`.

Google Fonts are loaded remotely; the page remains readable if that service is unavailable. The photo gallery and project visuals are included under `assets/google-site/`.

## Languages

The navigation language button offers English, Spanish, and Simplified Chinese. Translations include the academic history, research, projects, seminar archive, photography captions, image descriptions, and accessible control labels. The visitor's choice is remembered locally when browser storage is available; English is the default. Names, software identifiers, links, and text embedded inside images retain their original form.

Translation pairs are maintained in `assets/translations.js`, keyed by the original English text. `assets/languages.js` switches text without replacing links or interactive elements, and `assets/languages.css` styles the responsive picker. When changing English copy, update its translation key as well. Run `node tests/languages.cjs` from the repository root to check switching, restoration, persistence, storage fallback, and dynamic control labels.

## Search engines

The root-level `robots.txt` allows crawling and points crawlers to `sitemap.xml`. The sitemap lists the canonical home page at `https://alexcano404.github.io/`. The page also includes a canonical URL, social sharing metadata, and basic Person structured data. No build step or additional package dependencies are required.

To request indexing, add `https://alexcano404.github.io/` as a URL-prefix property in [Google Search Console](https://search.google.com/search-console), verify ownership using the HTML meta tag Google provides, then submit `sitemap.xml` in the Sitemaps report. You can also add the site in [Bing Webmaster Tools](https://www.bing.com/webmasters) and submit the same sitemap, or import the verified site from Search Console. Sitemap submission helps discovery but does not guarantee indexing or a particular search ranking.

## Source and attribution

The site was adapted from the [8B Reflow repair-shop template](https://github.com/8bsite/repair-shop-website-template); see [LICENSE](LICENSE) and [CREDITS.md](CREDITS.md). The text and photography belong to their respective authors.
