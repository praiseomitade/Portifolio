# Praise Omitade | Portfolio Website

A responsive portfolio website using plain HTML, CSS, JavaScript, and a simple editable JSON content file. No paid hosting or build tools required.

## Homepage design (approved)

The homepage uses a dark navy gradient that complements the original uploaded portrait, a circular photograph on the right and name/headline on the left. It contains **View My Projects**, **Download Resume** and a **Let's Connect** text link. The top navigation includes **Hire Me**. Content sections below use alternating light and dark backgrounds.

**Important:** The resume button is intentionally disabled until you upload your CV as a PDF and add its relative path (such as `assets/Praise-Omitade-Resume.pdf`) to `contact.resume` using the content editor or GitHub. We have not invented or published a resume file.

## Technical skill cards

The Technical Skills section shows **individual cards with locally stored SVG icons** for Excel, MySQL, Power BI, Tableau and IBM SPSS. Edit the list in `content.json` or `editor.html`, one skill per line. Recognized tool names keep their corresponding icons, and new tool names display a styled text fallback until a matching icon is added to `assets/icons/` and `script.js`.

## Files

- `index.html`: website structure
- `styles.css`: design, colors, layouts and mobile responsiveness
- `script.js`: turns the JSON content into website sections
- `content.json`: text, links, skills, certifications and projects
- `editor.html` and `editor.js`: optional browser-based content editor (no login or backend)
- `assets/profile.jpg`: supplied profile photo

## Publish using GitHub Pages

1. Sign in to GitHub as `praiseomitade`.
2. Create a **public** repository called `Portfolio` (capital P, matching your intended URL).
3. Upload **all files and folders inside** this package to the repository root. Do not put them inside an extra `praise-portfolio` folder.
4. Go to **Settings → Pages → Build and deployment**. Select **Deploy from a branch**.
5. Choose `main` and `/(root)`, and click **Save**.
6. Visit `https://praiseomitade.github.io/Portfolio/` after GitHub Pages has deployed.

If Pages is not enabled, check repository visibility and account restrictions.

## Update content: two options

### A. Content editor (recommended for text/projects)

1. Open `https://praiseomitade.github.io/Portfolio/editor.html` after publishing. The editor works entirely in your browser, with no authentication, so it **does not** save to the website directly.
2. Edit the visible fields. Add or remove project cards as needed.
3. Click **Download updated content.json**.
4. In GitHub, open the repository and replace the existing `content.json` with the new one, then commit the change. One method is to open `content.json`, click the pencil icon, paste the downloaded JSON content, and commit.
5. Refresh the live website after deployment.

**Security:** This editor cannot push to GitHub; do not add GitHub tokens, passwords, or private information to website files. The editor is publicly accessible, but only your GitHub account can publish changes.

### B. Directly in GitHub

1. Open `content.json` in GitHub and click **Edit**.
2. Modify the text while preserving valid JSON syntax.
3. Commit to `main`. GitHub Pages will redeploy.

## Change the layout and appearance

- Colors: open `styles.css`, change the custom properties at the top (`--navy`, `--blue`, etc.).
- Section order: change the sequence of `<section>` elements in `index.html`.
- Photo: replace `assets/profile.jpg` with an image using the same filename, or update `hero.image` in `content.json`.
- Add a screenshot: upload `assets/my-dashboard.png` and enter that file path in the project editor.
- Downloadable resume: upload e.g. `assets/Praise-Omitade-Resume.pdf` and set `contact.resume` to that path.
- Contact email and LinkedIn are blank on purpose. Enter the links you want published.

## Preview locally

This website loads JSON using `fetch()`. Browsers commonly block it when opening `index.html` directly from your file manager (`file://`). Use a local web server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/` or `http://localhost:8000/editor.html`. You can also use VS Code's Live Server extension.

## Important content notes

- The e-commerce project is labeled a **portfolio case study** and is a placeholder, not a claim of completed or verified client work. Replace its description and link once ready.
- No client names, impact figures, contact email, LinkedIn URL, or testimonials have been invented.
- Confirm the certification names and dates against your certificate PDFs before publishing.



## Version 5: Featured Projects cards
Each featured project card contains a 16:9 screenshot slot, title, category, short description, tool tags, and **View Project** button.

The initial E-Commerce project is a draft case study with **no screenshot or destination attached**. The visual clearly says to add an actual screenshot, and the button remains disabled until you add a real URL. Do not represent demo graphics as genuine project evidence.

To update a project: open `editor.html` on the hosted site, edit the Project cards fields, download `content.json`, and replace the repository copy. For images, upload a genuine dashboard screenshot to `assets/` (for example `assets/ecommerce-dashboard.png`) and set the card's Image path accordingly. Paste a live GitHub repository or project details URL into Project URL to activate **View Project**. You can also add or remove project cards using the editor.

The homepage photo is now circular, on the right on desktop.

## Version 6: Individual certification cards
The Certifications section has individual cards displaying a certificate preview slot, certificate title, issuer, and a View Certificate button. The existing AQskills credentials are listed by title only, without inventing certificate dates or credential IDs. Until actual certificates are uploaded, the preview area uses a generic *Certificate* placeholder and the action is disabled.

Edit cards using `editor.html` (add/remove certificate buttons included) or `content.json`. Upload actual PDFs/images to `assets/certificates/` and set `link` to a relative path such as `assets/certificates/mysql.pdf`. Set `image` to a preview image, if available. The editor downloads updated JSON, which must be committed to GitHub.


## Version 7: Contact Me

The contact area now says **Let's Work Together** and includes buttons for **Email Me**, **LinkedIn**, **GitHub**, and **Upwork**. Only links with real destinations appear. GitHub is already set to `https://github.com/praiseomitade`; the email address, LinkedIn and Upwork URLs have not been supplied and are left empty deliberately.

A responsive form includes **Name**, **Email address**, and **Message**. **The Send Message button is intentionally disabled until you configure delivery** so visitors are never led to believe an unsent message was delivered. To enable it:

1. Create a form with a provider such as Formspree and verify the delivery address with that provider. Free-tier limits and terms may change.
2. Copy the endpoint URL in the form `https://formspree.io/f/YOUR_FORM_ID`.
3. Enter that endpoint into **Formspree form endpoint** in `editor.html` or directly into `contact.formEndpoint` in `content.json`.
4. Download the updated JSON and commit it to GitHub. Submit a test inquiry after publishing to confirm successful delivery. The browser displays success or failure status.

Use the editor to provide your public contact email, LinkedIn profile URL and Upwork URL. Do not put passwords, API secrets, private contact details, or tokens in public GitHub Pages files. Form submissions are handled by the provider, not stored on GitHub Pages. The browser-side form includes standard validation but will still require spam controls managed with the provider.

## Version 8: Services

Added a Services section with six editable cards. Open `editor.html` through a local web server or GitHub Pages to edit service titles, descriptions, labels, and add/remove cards. Download `content.json` from the editor and commit it to your GitHub repository to publish changes.

## Version 9: Final section order and self-service publishing

The site now displays: Home → About → Expertise → Technical Skills → Services → Featured Projects → Certifications → Contact. The navigation matches that order. All existing text, project drafts, certificate placeholders, buttons, and editor features remain intact.

You can **publish now and add your actual files later**. Projects and certificates with no links remain clearly marked as placeholders/inactive. Your resume button stays inactive until you add the PDF. The contact form does not deliver messages until you configure its Formspree endpoint.

**Easy uploads:** In the GitHub repository, choose **Add file → Upload files**. Upload your CV and certificates into the appropriate `assets/` folder, then use the site's `editor.html` to update the paths and links. Download the updated `content.json` and replace it on GitHub. For your profile links, edit `contact` fields in the editor.

**Viewing live:** GitHub Pages publishes from `main` / `(root)` in Settings → Pages. Once Pages deployment completes, visit https://praiseomitade.github.io/Portfolio/ . This link is NOT live until the files are published to your repository.
