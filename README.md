# Enhancus: Developer Utility Suite

Enhancus is a web-based collection of developer tools designed to simplify common tasks. The suite includes **EnvBuddy** for managing environment variables and a **Django Secret Key Generator** for creating secure keys. Built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Shadcn/UI**, Enhancus offers a modern, responsive interface for developers.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
  - [EnvBuddy](#envbuddy)
  - [Django Secret Key Generator](#django-secret-key-generator)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
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
  - FAQs via `FAQCard`.
  - Consistent navigation with `HeaderCard` and breadcrumbs.

### Django Secret Key Generator

- Generate cryptographically secure keys for Django applications.
- Copy keys, toggle visibility, and track generation history.
- Strength indicator for key security.
- Usage guides and FAQs.
- Shared UI components (`HeaderCard`, `InfoCard`, `FAQCard`).

## Getting Started

### Prerequisites

- **Node.js**: v18 or higher.
- **npm**: v8 or higher.
- A modern web browser (e.g., Chrome, Firefox).

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/enhancus.git
   cd enhancus
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Install Shadcn/UI Components**:

   Ensure the required components are installed (configured in `components.json`):

   ```bash
   npx shadcn-ui@latest add card button switch input table textarea alert badge dropdown-menu label separator slider
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
   - Click "+ Add Variable".
   - Enter key (e.g., `DATABASE_URL`), value (e.g., `postgres://user:pass@host:5432/db`), description (e.g., "Main DB"), and toggle optional/secret.
3. **Reorder**: Drag rows using the grip icon.
4. **Import**:
   - Paste `.env` content (e.g., `API_KEY=12345`) or upload a `.env` file in the `EnvImportCard`.
5. **Export**:
   - View `.env` content in the preview textarea and copy it using the copy button.
   - Download as `envbuddy.env`, `envbuddy.env.example`, or `envbuddy.json` via the export buttons.
6. **Utilities**:
   - Click "Load Sample Data" to add example variables (`API_KEY`, `DEBUG_MODE`).
   - Click "Reset" to clear all variables and LocalStorage.
   - Enable LocalStorage to persist variables.
7. **Monitor**: Check stats in the sidebar (`InfoCard` and Summary card) for total, optional, secret variables, and errors.

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
2. **Generate**: Click to create a secure key.
3. **Copy**: Copy the key or toggle visibility.
4. **History**: View and reuse past keys via `HistoryCard`.
5. **Strength**: Check key security with `StrengthIndicator`.
6. **Guides**: Follow usage instructions in the UI.

## Project Structure

```
├── app/
│   ├── env-buddy/
│   │   ├── EnvBuddyPage.tsx     # EnvBuddy main component
│   │   └── page.tsx             # EnvBuddy route
│   ├── key-gen/
│   │   └── page.tsx             # Django Secret Key Generator route
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── favicon.ico
│   ├── globals.css              # Global styles
├── components/
│   ├── envbuddy/
│   │   ├── EnvImportCard.tsx    # EnvBuddy import UI
│   │   ├── EnvVariableTable.tsx # EnvBuddy table with drag-and-drop
│   ├── django_key_gen/
│   │   ├── HistoryCard.tsx      # Key history
│   │   ├── StrengthIndicator.tsx # Key strength visualization
│   ├── ui/
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── mode-toggle.tsx
│   │   ├── separator.tsx
│   │   ├── slider.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── textarea.tsx
│   ├── AlertCard.tsx
│   ├── CodeGuideCard.tsx
│   ├── DisplayField.tsx
│   ├── FAQCard.tsx              # Reusable FAQ component
│   ├── HeaderCard.tsx           # Reusable header with breadcrumbs
│   ├── InfoCard.tsx             # Reusable stats card
│   ├── navbar.tsx               # Navigation bar
│   ├── theme-provider.tsx       # Theme management
├── data/
│   ├── djangoFAQ.ts             # Key Generator FAQs
│   ├── envBuddyFAQ.ts           # EnvBuddy FAQs
│   ├── tools.ts                 # List of tools
├── types/
│   ├── django_key_gen.ts        # Key Generator types
│   ├── envbuddy.ts              # EnvBuddy types
├── utils/
│   ├── envUtils.ts              # EnvBuddy parsing/exporting utilities
│   ├── keyUtils.ts              # Key Generator utilities
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   ├── window.svg
│   ├── robots.txt
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
npm install next react typescript tailwindcss @radix-ui/react-* lucide-react @dnd-kit/core @dnd-kit/sortable uuid
npm install -D @types/react @types/node @types/uuid
```

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