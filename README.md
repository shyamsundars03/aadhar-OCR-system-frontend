# Aadhaar OCR System - Frontend

A modern, responsive React single-page application built with Vite and TypeScript. It serves as the client interface for the Aadhaar OCR System, allowing users to upload front and back images of an Aadhaar card, trigger automated data extraction, and view structured results with full type safety.

---

## Features

- **TypeScript Architecture**: Fully typed codebase with interface definitions (`IToastContext.interface.ts`, `IAadhaarResult.interface.ts`), typed props, and Zod client validation.
- **Double-Sided Image Upload**: Dedicated upload cards for front and back Aadhaar card images with interactive drag/click triggers.
- **Strict Client-Side Validation**: Enforces image file formats (JPEG/PNG) and size limits (max 2MB per file) via Zod schemas (`ocr.validation.ts`) before any network request is made.
- **Dynamic Image Previews**: Generates secure object URL previews with instant options to remove or replace selected files.
- **Disabled Input Locking**: Upload forms and action buttons automatically lock during OCR scanning or after successful extraction to prevent double submissions.
- **Custom Toast Notification System**: Animated, auto-dismissing toast alerts for status feedback (success, warnings, errors) powered by React Context and custom hooks.
- **Raw JSON Debug Viewer**: Interactive collapsible viewer to inspect the raw structured API response payload.
- **Mobile-Friendly Design**: Responsive layout built with vanilla CSS design tokens, HSL color palettes, custom micro-animations, and dynamic visual states across all screen sizes.

---

## Tech Stack

- **Core**: React 19 (Hooks, Context, useMemo)
- **Language**: TypeScript
- **Bundler/Build Tool**: Vite
- **Input Validation**: Zod (`ocr.validation.ts`)
- **Styling**: Vanilla CSS (CSS variables, custom design system, zero third-party utility frameworks)
- **Linter**: ESLint (v10 Flat Config with TypeScript plugins)

---

## Project Structure

```text
Frontend/
├── public/                  # Static assets
├── src/
│   ├── api/                 # API client functions with native fetch
│   │   └── ocrApi.ts
│   ├── assets/              # Static media assets
│   ├── components/
│   │   ├── Feedback/        # Loader scanner and inline error alerts
│   │   │   ├── ErrorAlert.tsx
│   │   │   └── Loader.tsx
│   │   ├── Layout/          # Main application wrappers & headers
│   │   │   └── PageLayout.tsx
│   │   ├── Result/          # Output result card & JSON debugger
│   │   │   ├── AadhaarResultCard.tsx
│   │   │   └── RawJsonViewer.tsx
│   │   └── Upload/          # Upload inputs & preview components
│   │       ├── AadhaarUploadForm.tsx
│   │       └── ImagePreview.tsx
│   ├── config/              # Application environment & API configurations
│   │   └── api.config.ts
│   ├── constants/           # Error message constants and UI labels
│   │   └── errorMessages.ts
│   ├── context/             # Global Toast Context and provider
│   │   ├── ToastContext.tsx
│   │   └── toastContext.ts
│   ├── hooks/               # Custom hooks for OCR workflow & toast dispatcher
│   │   ├── useAadhaarOcr.ts
│   │   └── useToast.ts
│   ├── interfaces/          # TypeScript interface contracts
│   │   ├── IAadhaarResult.interface.ts
│   │   ├── IApiResponse.interface.ts
│   │   └── IToastContext.interface.ts
│   ├── types/               # Type aliases and union definitions
│   │   └── toast.types.ts
│   ├── utils/               # Custom Error wrapper and helper utilities
│   │   └── AppError.ts
│   ├── validations/         # Zod schemas for file payload validation
│   │   └── ocr.validation.ts
│   ├── App.tsx              # Main application coordinator
│   ├── index.css            # Global CSS design tokens & layout rules
│   ├── main.tsx             # React DOM entry point
│   └── vite-env.d.ts        # Vite env type definitions
├── .env                     # Environment variables configuration
├── eslint.config.js         # ESLint 10 rules setup
├── index.html               # Main HTML document
├── package.json             # Dependencies and build scripts
├── tsconfig.json            # TypeScript compiler options
└── README.md                # Documentation guide
```

---

## Setup & Running Locally

### Prerequisites

Ensure you have **Node.js (v18 or higher)** and **npm** installed on your system.

### 1. Install Dependencies

Navigate to the `Frontend` directory and install the packages:

```bash
cd Frontend
npm install
```

### 2. Configure Environment Variables

Create a file named `.env` in the root of the `Frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Start Development Server

Run the local Vite development server:

```bash
npm run dev
```

The app will start and typically be accessible at `http://localhost:5173`.

### 4. Code Quality & Build Check

Run ESLint and TypeScript compilation checks:

```bash
# Check TypeScript types & compile
npm run build

# Run ESLint check
npm run lint
```

### 5. Build for Production

Compile and bundle the React project for production distribution:

```bash
npm run build
```

Optimized static files will be generated inside the `dist/` directory.

---

## User Manual & Operating Guide

1. **Upload Front Image**: Click on the **Aadhaar Front Side** card. Select a clear JPEG or PNG image of your Aadhaar card's front side. The UI renders an active preview.
2. **Upload Back Image**: Click on the **Aadhaar Back Side** card. Select a clear image of your Aadhaar card's back side containing address details.
3. **Change or Remove**: To modify your selection, click **Remove** inside the preview card or **Change** to select a different image file.
4. **Trigger OCR**: Once both card previews are active, click **Process OCR & Extract Data**.
5. **Process Loader**: A loading scanner animation is displayed while the backend processes OCR, validates checksums, and parses text. Upload inputs are locked during this step.
6. **View Result**: On success, the application renders:
   - **Extracted Aadhaar Profile**: Structured card displaying *Aadhaar Number*, *Name*, *Date of Birth*, *Gender*, and *Address*.
   - **Raw JSON Debugger**: A collapsible toggle displaying the exact API response envelope.
7. **Reset**: Click **Scan Another Card** to clear all states and scan another document.
