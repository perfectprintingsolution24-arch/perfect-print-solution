# PERFECT PRINT SOLUTION — Wedding Cards & Printing

A static GitHub Pages website inspired by common wedding-card catalogue patterns: category navigation, card gallery, model codes, enquiry forms and a guided order process. It is not a copy of King of Cards. All product photos should be your own.

## Upload these files to the repository root
- `index.html`
- `README.md`
- `.nojekyll`
- `assets/cards/card-01.jpg` through `card-08.jpg` (your own card photos, optional initially)
- `assets/banners/` (add your own banner photos if you later want a banner gallery)

## Add your own wedding-card photos
1. Prepare 8 card photos as JPG or PNG.
2. Rename them `card-01.jpg`, `card-02.jpg`, etc.
3. Upload them into `assets/cards/` in the GitHub repository.
4. The page already references these filenames. If your files are PNG, edit the matching `.jpg` path in the `cards` array in `index.html` to `.png`.
5. Update the card names and model codes in the `cards` array to match your real products.

If photos are not yet uploaded, each card shows a placeholder explaining the expected filename.

## Update contact details
In `index.html`, find `const WA="918892034849";` and confirm the WhatsApp number (country code + number, digits only). Also confirm the phone numbers and email in the contact sections.

## Publish / update GitHub Pages
1. Open your repository.
2. Click **Add file → Upload files**.
3. Upload the files and folders, keeping `index.html` at the repository root.
4. Click **Commit changes**.
5. If Pages is not enabled: **Settings → Pages → Deploy from a branch → main → /(root) → Save**.
6. Wait for deployment and refresh the Pages URL.

## Static-site limitations
- The quote form opens WhatsApp with a prepared message; the customer must press Send.
- File inputs do not upload/store files. The customer must attach their photo/artwork manually in WhatsApp.
- There is no database, secure admin panel, payment processing, or live price calculator in this static version.
