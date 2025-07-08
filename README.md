# Enhancus

Enhancus is a growing collection of developer tools designed to simplify common tasks. Built with **Next.js 14**, **TypeScript**, **Tailwind CSS v4**, and **Shadcn/UI**, it provides a modern, responsive interface for developers. Each tool has its own documentation under `apps/<tool-name>/README.md`.

## 🔧 Tools Overview

| Tool                    | Description                                              |
|-------------------------|----------------------------------------------------------|
| **TailwindForge**       | Build Tailwind v4 OKLCH palettes                         |
| **EnvBuddy**            | Manage `.env` variables visually                         |
| **Django Secret Key Generator** | Generate secure, copyable Django secret keys       |
| **CronMate**            | Convert natural language to cron with validation/preview  |

## Getting Started

### Prerequisites
- **Node.js**: v18 or higher.
- **npm**: v8 or higher.
- **Git**: For cloning the repository.

### Installation
1. Clone the repository:
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
   npx shadcn-ui@latest add accordion alert badge button card command dialog dropdown-menu input label popover separator slider switch table textarea tabs select
   ```

### Running the Application
1. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000`.
2. Visit tool-specific pages (e.g., `http://localhost:3000/cronmate`).
3. See `apps/<tool-name>/README.md` for detailed usage instructions.

## Contributing
1. Fork the repository.
2. Create a branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "Add your-feature"`.
4. Push: `git push origin feature/your-feature`.
5. Open a Pull Request to the `main` branch.

**Guidelines**: Use TypeScript, Shadcn/UI, Tailwind CSS, and Next.js app router. Update relevant `README.md` files in `apps/<tool-name>/`.

## License
MIT License. See [LICENSE](LICENSE).

## Contact
For issues or feature requests, open an issue on the [GitHub repository](https://github.com/amruthlp12/enhancus/issues).