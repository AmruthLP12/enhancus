# Django Secret Key Generator

**Django Secret Key Generator** is a tool within the **Enhancus** suite for generating cryptographically secure Django secret keys. It provides a simple interface to generate, copy, and manage keys with history tracking and strength indicators. Built with **Next.js 14**, **TypeScript**, **Tailwind CSS v4**, and **Shadcn/UI**, it offers a responsive, developer-friendly experience.

## Features
- **Key Generation**: Create secure Django secret keys using `utils/keyUtils.ts`.
- **Copy Functionality**: Copy keys to the clipboard with "Copied" confirmation.
- **Visibility Toggle**: Show/hide keys for security.
- **History Tracking**: View previously generated keys (`components/django_key_gen/HistoryCard.tsx`).
- **Strength Indicator**: Assess key strength (`components/django_key_gen/StrengthIndicator.tsx`).
- **Responsive UI**: Built with Shadcn/UI, including `HeaderCard` and `FAQCard` (`data/djangoFAQ.ts`).

## Getting Started

### Prerequisites
- **Node.js**: v18 or higher.
- **npm**: v8 or higher.
- **Git**: For cloning the repository.
- Access to the **Enhancus** project repository.

### Installation
1. Clone the **Enhancus** repository:
   ```bash
   git clone https://github.com/amruthlp12/enhancus.git
   cd enhancus
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Shadcn/UI components:
   ```bash
   npx shadcn-ui@latest add accordion alert badge button card command dialog dropdown-menu input label popover separator slider switch table textarea tabs
   ```

### Running Django Secret Key Generator
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:3000/key-gen` in your browser.

## Usage
1. Navigate to `/key-gen`.
2. Click to generate a new secret key.
3. Copy the key to the clipboard or toggle visibility.
4. View key history in the history card.
5. Check the strength indicator for key quality.
6. Refer to FAQs (`data/djangoFAQ.ts`) for usage guides.

### Example
- **Generated Key**: `abc123xyz789!@#$%^&*()_+-=`
- **Strength**: Strong (based on length and character diversity)
- **History**: Saved in LocalStorage with timestamp.

## Screenshots
- **Django Secret Key Generator**: ![Django Secret Key](../../screenshots/django-key-gen.png)

## Development

### Project Structure
Relevant files for **Django Secret Key Generator**:
- `apps/key-gen/page.tsx`: Main page component.
- `components/django_key_gen/`: Components (`HistoryCard.tsx`, `StrengthIndicator.tsx`).
- `utils/keyUtils.ts`: Key generation utilities.
- `data/djangoFAQ.ts`: FAQ data.
- `public/`: Static assets.

### Dependencies
- `next@14.2.3`: Framework for server-side rendering and static generation.
- `typescript@5`: Type safety.
- `tailwindcss@4`: Utility-first CSS framework.
- `shadcn-ui`: Accessible UI components.
- `uuid`: Generates unique IDs for history items.

Install:
```bash
npm install next@14.2.3 react typescript tailwindcss@4 lucide-react @radix-ui/react-* uuid
npm install -D @types/react @types/node @types/uuid
```

### Running Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Run linting:
   ```bash
   npm run lint
   ```
4. Build for production:
   ```bash
   npm run build
   ```

### Testing
1. Test **Django Secret Key Generator** at `http://localhost:3000/key-gen`:
   - Generate keys and verify cryptographic strength.
   - Test copy, visibility toggle, and history tracking.
   - Confirm strength indicator accuracy.
   - Check FAQs for guidance.
2. Run linting to ensure TypeScript compliance:
   ```bash
   npm run lint
   ```

## Contributing
1. Fork the **Enhancus** repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/keygen-your-feature
   ```
3. Commit changes:
   ```bash
   git commit -m "Add Django Secret Key Generator feature"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/keygen-your-feature
   ```
5. Open a pull request to the `main` branch.

**Guidelines**: Use TypeScript, Shadcn/UI, Tailwind CSS, and Next.js app router. Update `apps/key-gen/README.md` for **Django Secret Key Generator**-specific changes.

## License
MIT License. See [LICENSE](../../LICENSE).

## Contact
For issues or feature requests, open an issue on the [GitHub repository](https://github.com/amruthlp12/enhancus/issues).