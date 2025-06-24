# Enhancus: Developer Utility Suite

Enhancus is a web-based collection of developer tools designed to simplify common tasks. The suite includes **EnvBuddy** for managing environment variables, **Django Secret Key Generator** for creating secure keys, **Unfold Colors** for generating Django Unfold color schemes, and **Unfold Colors Advanced** for customizing individual shades. A **category page** organizes tools by type (e.g., Security, Design). Built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Shadcn/UI**, Enhancus offers a modern, responsive interface for developers.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
  - [EnvBuddy](#envbuddy)
  - [Django Secret Key Generator](#django-secret-key-generator)
  - [Unfold Colors](#unfold-colors)
  - [Unfold Colors Advanced](#unfold-colors-advanced)
  - [Category Page](#category-page)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Support the Project](#support-the-project)
- [Contributing](#contributing)
- [License](#license)

## Features

### EnvBuddy

- **Manage Environment Variables**:
  - Add, edit, delete, and reorder variables in a table interface.
  - Drag-and-drop reordering using `@dnd-kit`.
  - Toggle variables as optional or secret (with password-like visibility controls).
  - Add descriptions for documentation.
- **Import**:
  - Paste `.env` content or upload `.env` files to populate the table.
- **Export**:
  - Download as `envbuddy.env` (includes descriptions as comments), `envbuddy.env.example` (keys only), or `envbuddy.json`.
  - Preview `.env` content in a textarea with a copy button.
- **Validation**:
  - Real-time checks for duplicate keys or missing values.
- **Persistence**:
  - Optional LocalStorage to save variables across sessions.
- **Utilities**:
  - "Load Sample Data" button to populate with example variables (e.g., `API_KEY`, `DEBUG_MODE`).
  - "Reset" button to clear all variables and LocalStorage.
- **UI**:
  - Responsive design with Shadcn/UI components.
  - Sidebar with `InfoCard` and summary stats (total, optional, secret variables, errors).
  - FAQs via `FAQCard` (data from `data/envBuddyFAQ.ts`).
  - Consistent navigation with `HeaderCard` and breadcrumbs.

### Django Secret Key Generator

- Generate cryptographically secure keys for Django applications.
- Copy keys, toggle visibility, and track generation history (`components/django_key_gen/HistoryCard.tsx`).
- Strength indicator for key security (`components/django_key_gen/StrengthIndicator.tsx`).
- Usage guides and FAQs (`data/djangoFAQ.ts`).
- Shared UI components (`HeaderCard`, `InfoCard`, `FAQCard`).

### Unfold Colors

- Generate color schemes for Django Unfold admin interfaces.
- Use color picker to customize palettes (`components/unfoldcolors/ColorPicker.tsx`).
- Preview color schemes in a mock Django Unfold admin interface.
- Export color configurations for Django Unfold settings.
- Responsive UI with Shadcn/UI components and `HeaderCard` for navigation.
- FAQs and usage guides (`data/unfoldColorsFAQ.ts`).

### Unfold Colors Advanced

- Customize individual shades for Django Unfold color schemes.
- Fine-tune hue, saturation, and lightness using advanced controls (`components/unfoldcolors/ColorPicker.tsx`).
- Preview and export advanced color configurations.
- Shared UI components (`HeaderCard`, `InfoCard`, `FAQCard`).
- Responsive design for desktop and mobile.

### Category Page

- Browse tools organized by category (e.g., Security, Configuration, Design) at `/tools`.
- Display tools from `data/tools.ts` with details (title, description, icon, status).
- Responsive grid layout with Shadcn/UI cards (`components/ui/card.tsx`).
- Links to tool pages (e.g., `/env-buddy`, `/unfold-colors`).
- Consistent navigation via `components/Navbar.tsx`.

## Getting Started

### Prerequisites

- **Node.js**: v18 or higher.
- **npm**: v8 or higher.
- A modern web browser (e.g., Chrome, Firefox).

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/amruthlp12/enhancus.git
   cd enhancus
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Install Shadcn/UI Components**:

   Ensure the required components are installed (configured in `components.json`):

   ```bash
   npx shadcn-ui@latest add accordion alert badge button card command dialog dropdown-menu input label popover separator slider switch table textarea
   ```

### Running the Application

1. **Start the Development Server**:

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000` in your browser.

2. **Build for Production**:

   ```bash
   npm run build
   npm run start
   ```

## Usage

### EnvBuddy

1. **Access**: Navigate to `/env-buddy` (e.g., `http://localhost:3000/env-buddy`).
2. **Add Variables**:
   - Click "+ Add Variable" in `components/envbuddy/EnvVariableTable.tsx`.
   - Enter key (e.g., `DATABASE_URL`), value (e.g., `postgres://user:pass@host:5432/db`), description (e.g., "Main DB"), and toggle optional/secret.
3. **Reorder**: Drag rows using the grip icon.
4. **Import**:
   - Paste `.env` content (e.g., `API_KEY=12345`) or upload a `.env` file in `components/envbuddy/EnvImportCard.tsx`.
5. **Export**:
   - View `.env` content in the preview textarea and copy it.
   - Download as `envbuddy.env`, `envbuddy.env.example`, or `envbuddy.json` via export buttons.
6. **Utilities**:
   - Click "Load Sample Data" to add example variables (`API_KEY`, `DEBUG_MODE`).
   - Click "Reset" to clear all variables and LocalStorage.
   - Enable LocalStorage to persist variables.
7. **Monitor**: Check stats in `components/InfoCard.tsx` for total, optional, secret variables, and errors.

**Example `envbuddy.env` Export**:

```env
# Description: Your API key
API_KEY=12345

# Description: Enable debug logs
DEBUG_MODE=true
```

**Example `envbuddy.env.example` Export**:

```env
API_KEY=
# DEBUG_MODE=
```

**Example `envbuddy.json` Export**:

```json
{
  "API_KEY": "12345",
  "DEBUG_MODE": "true"
}
```

### Django Secret Key Generator

1. **Access**: Navigate to `/key-gen`.
2. **Generate**: Click to create a secure key using `utils/keyUtils.ts`.
3. **Copy**: Copy the key or toggle visibility.
4. **History**: View past keys in `components/django_key_gen/HistoryCard.tsx`.
5. **Strength**: Check security with `components/django_key_gen/StrengthIndicator.tsx`.
6. **Guides**: Follow instructions in `components/FAQCard.tsx` (data from `data/djangoFAQ.ts`).

### Unfold Colors

1. **Access**: Navigate to `/unfold-colors`.
2. **Generate**: Use `components/unfoldcolors/ColorPicker.tsx` to select or generate a palette.
3. **Customize**: Adjust colors via pickers or sliders.
4. **Preview**: View the palette in a mock Django Unfold admin interface.
5. **Export**: Copy or download color configuration using `utils/colorUtils.ts`.
6. **Guides**: Refer to `components/FAQCard.tsx` (data from `data/unfoldColorsFAQ.ts`).

### Unfold Colors Advanced

1. **Access**: Navigate to `/unfold-colors/advanced`.
2. **Customize**: Fine-tune shades (hue, saturation, lightness) in `components/unfoldcolors/ColorPicker.tsx`.
3. **Preview**: See real-time updates in a mock admin interface.
4. **Export**: Save or copy advanced color scheme using `utils/colorUtils.ts`.
5. **Guides**: Use `components/FAQCard.tsx` (data from `data/unfoldColorsFAQ.ts`).

### Category Page

1. **Access**: Navigate to `/tools`.
2. **Browse**: View tools from `data/tools.ts`, grouped by category (e.g., Security, Design).
3. **Select**: Click a tool card to visit its page (e.g., `/env-buddy`, `/key-gen`).
4. **UI**: Responsive grid with `components/ui/card.tsx` showing title, description, icon, and status.

## Screenshots

Below are screenshots of key pages in Enhancus:

- **Main Page**: Homepage with featured tools and stats.
  ![Main Page](screenshots/main-page.png)

- **Category Page**: Tool listing by category.
  ![Category Page](screenshots/category-page.png)

- **EnvBuddy**: Environment variable management interface.
  ![EnvBuddy](screenshots/envbuddy.png)

- **Django Secret Key Generator**: Secure key generation tool.
  ![Django Secret Key Generator](screenshots/django-key-gen.png)

- **Unfold Colors**: Color scheme generator for Django Unfold.
  ![Unfold Colors](screenshots/unfold-colors.png)

- **Unfold Colors Advanced**: Advanced shade customization for Django Unfold.
  ![Unfold Colors Advanced](screenshots/unfold-colors-advanced.png)

## Project Structure

```
├── app/
│   ├── env-buddy/
│   │   ├── EnvBuddyPage.tsx     # EnvBuddy main component
│   │   └── page.tsx             # EnvBuddy route
│   ├── key-gen/
│   │   └── page.tsx             # Django Secret Key Generator route
│   ├── tools/
│   │   └── page.tsx             # Category page route
│   ├── unfold-colors/
│   │   ├── advanced/
│   │   │   └── page.tsx         # Unfold Colors Advanced route
│   │   └── page.tsx             # Unfold Colors route
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── favicon.ico
│   ├── globals.css              # Global styles
├── components/
│   ├── django_key_gen/
│   │   ├── HistoryCard.tsx      # Key history
│   │   ├── StrengthIndicator.tsx # Key strength visualization
│   ├── envbuddy/
│   │   ├── EnvImportCard.tsx    # EnvBuddy import UI
│   │   ├── EnvVariableTable.tsx # EnvBuddy table with drag-and-drop
│   ├── unfoldcolors/
│   │   ├── ColorPicker.tsx      # Color picker for Unfold Colors
│   ├── ui/
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── command.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── mode-toggle.tsx
│   │   ├── popover.tsx
│   │   ├── separator.tsx
│   │   ├── slider.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── textarea.tsx
│   ├── AlertCard.tsx
│   ├── CodeGuideCard.tsx
│   ├── DisplayField.tsx
│   ├── FAQCard.tsx              # Reusable FAQ component
│   ├── Footer.tsx               # Footer with credits
│   ├── HeaderCard.tsx           # Reusable header with breadcrumbs
│   ├── InfoCard.tsx             # Reusable stats card
│   ├── Navbar.tsx               # Navigation bar
│   ├── Support.tsx              # Support dialog and floating button
│   ├── mode-toggle.tsx          # Theme toggle
│   ├── search-command.tsx       # Tool search command palette
│   ├── theme-provider.tsx       # Theme management
├── data/
│   ├── djangoFAQ.ts             # Key Generator FAQs
│   ├── envBuddyFAQ.ts           # EnvBuddy FAQs
│   ├── tools.ts                 # List of tools
│   ├── unfoldColorsFAQ.ts       # Unfold Colors FAQs
├── types/
│   ├── django_key_gen.ts        # Key Generator types
│   ├── envbuddy.ts              # EnvBuddy types
│   ├── types.ts                 # General types
│   ├── unfoldColors.ts          # Unfold Colors types
├── utils/
│   ├── colorUtils.ts            # Unfold Colors utilities
│   ├── envUtils.ts              # EnvBuddy parsing/exporting utilities
│   ├── keyUtils.ts              # Key Generator utilities
├── screenshots/
│   ├── main-page.png            # Main page screenshot
│   ├── category-page.png        # Category page screenshot
│   ├── envbuddy.png             # EnvBuddy screenshot
│   ├── django-key-gen.png       # Django Secret Key Generator screenshot
│   ├── unfold-colors.png        # Unfold Colors screenshot
│   ├── unfold-colors-advanced.png # Unfold Colors Advanced screenshot
├── lib/
│   ├── utils.ts                 # General utilities
├── components.json              # Shadcn/UI configuration
├── eslint.config.mjs
├── next.config.ts
├── next-sitemap.config.js
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── package-lock.json
├── README.md                    # This file
```

## Dependencies

- **Core**:
  - `next`: ^14
  - `react`: ^18
  - `typescript`: ^5
- **UI**:
  - `tailwindcss`: ^3
  - `@radix-ui/*`: Shadcn/UI primitives
  - `lucide-react`: Icons
  - `react-qr-code`: QR code generation for Support dialog
- **EnvBuddy**:
  - `@dnd-kit/core`: Drag-and-drop
  - `@dnd-kit/sortable`: Sortable lists
  - `uuid`: Unique IDs
- **Dev**:
  - `@types/react`
  - `@types/node`
  - `@types/uuid`

Install with:

```bash
npm install next react typescript tailwindcss @radix-ui/react-* lucide-react react-qr-code @dnd-kit/core @dnd-kit/sortable uuid
npm install -D @types/react @types/node @types/uuid
```

## Support the Project

EnhancUS is free to use, but your support helps cover development and hosting costs. If you find the tools useful, consider contributing via:

[![Ko-Fi](https://img.shields.io/badge/Ko--fi-Support-brightgreen)](https://ko-fi.com/codewithamruth)
[![PayPal](https://img.shields.io/badge/PayPal-Donate-blue)](https://paypal.me/amruthlp)

You can also donate via UPI or explore more options in the app’s Support dialog (accessible via the Support button in `components/Support.tsx`). Every contribution is appreciated!

Alternatively, support the project by:
- ⭐ Starring the repo: [![GitHub Stars](https://img.shields.io/github/stars/amruthlp12/enhancus)](https://github.com/amruthlp12/enhancus)
- Sharing EnhancUS with your network
- Contributing code or feedback (see [Contributing](#contributing))

## Contributing

1. **Fork the Repository**.
2. **Create a Branch**:

   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make Changes** and test locally.
4. **Commit**:

   ```bash
   git commit -m "Add your-feature"
   ```

5. **Push**:

   ```bash
   git push origin feature/your-feature
   ```

6. **Open a Pull Request** with a clear description.

**Guidelines**:

- Follow TypeScript and ESLint rules (`eslint.config.mjs`).
- Use Shadcn/UI and Tailwind CSS for UI consistency.
- Update documentation for new features.
- Ensure compatibility with Next.js app router.

## License

MIT License. See [LICENSE](LICENSE) for details.

---

Built with ❤️ by Amruth. Contributions welcome!