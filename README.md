# Atul — Portfolio Website

A clean, multi-page static website with a shared header/footer/CSS/JS —
nothing is duplicated across pages.

## Folder structure

```
atul-site/
├── index.html                              Home page
├── about.html                              About page
├── services.html                           Services overview + pricing + FAQ
├── service-social-media-management.html    Service detail
├── service-content-creation.html           Service detail
├── service-photography.html                Service detail
├── service-video-production.html           Service detail
├── service-digital-marketing.html          Service detail
├── service-360-virtual-tour.html           Service detail (with drag-to-pan demo)
├── portfolio.html                          Portfolio grid + filters + lightbox
├── testimonials.html                       Testimonials + ratings
├── contact.html                            Contact form + map
├── assets/
│   ├── css/
│   │   └── style.css       ← single shared stylesheet for the whole site
│   └── js/
│       ├── partials.js     ← builds the header + footer once, injects into
│       │                     every page (nothing is copy-pasted)
│       └── app.js          ← all interactive behavior (filters, lightbox,
│                              load more, form, counters, panorama demo…),
│                              each feature checks the page has the right
│                              elements before running
└── README.md
```

## How the shared header/footer works

Every page has two empty containers:

```html
<header><div id="site-header"></div></header>
...
<footer><div id="site-footer"></div></footer>
```

`assets/js/partials.js` fills these in automatically on page load and marks
the correct nav link as active based on `<body data-page="...">`. To change
the logo, nav links, or footer contact info, edit it in **one place**:
`assets/js/partials.js`.

## How to run it

Because the header/footer are injected with plain JavaScript (not `fetch`),
you can open `index.html` directly in a browser — no local server required.
Just keep the folder structure intact.

For the best experience (and if you add anything that does use `fetch`
later), you can also serve it locally:

```bash
cd atul-site
python3 -m http.server 8000
# then open http://localhost:8000
```

## Editing content

- **Site-wide look**: `assets/css/style.css`
- **Site-wide behavior**: `assets/js/app.js`
- **Nav / footer / contact info**: `assets/js/partials.js`
- **Page content**: edit the relevant `.html` file directly — only the
  content unique to that page lives there.

## Notes

- All photos are placeholder stock images (Unsplash/Pexels). Swap the
  `src` attributes for real photos when available.
- The contact form and "Load More" buttons are front-end demos — wire the
  form up to a backend or a service like Formspree/EmailJS to actually
  receive messages.
