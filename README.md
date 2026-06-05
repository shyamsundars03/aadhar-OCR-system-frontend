# Aadhaar OCR System - Frontend

A modern, responsive React single-page application built with Vite. It serves as the client interface for the Aadhaar OCR System, allowing users to upload front and back images of an Aadhaar card, trigger data extraction, and view the structured results.

---

## Features

- **Double-Sided Image Upload**: Dedicated upload cards for the front and back images of the Aadhaar card.
- **Strict Validation**: Enforces image file formats (JPEG/PNG) and size limits (max 2MB per file) on the client side before any network request is made.
- **Dynamic Image Previews**: Generates secure object URL previews with the option to remove or change selected files.
- **Disabled Input Locking**: Input cards and action buttons automatically lock when processing, or upon successful extraction, preventing accidental double submissions.
- **Custom Toast Notification System**: Animated, auto-dismissing toast alerts for feedback (success, warnings, and errors) with a strict 3-second display duration.
- **Raw JSON Debug Viewer**: Displays the complete parsed OCR result in a formatted JSON view for transparency.
- **No Hindi Text**: Fully localized in English across all user-facing descriptions, buttons, labels, and error messages.
- **Mobile-Friendly Design**: Uses a custom responsive layout with HSL-tailored colors, custom gradients, and micro-animations to guarantee a premium experience across desktops, tablets, and smartphones.

---

## Tech Stack

- **Core**: React 19 (Hooks, Context, useMemo)
- **Bundler/Build Tool**: Vite
- **Styling**: Vanilla CSS (no CSS frameworks, fully custom variables and responsive design)
- **Linter**: ESLint (v10 Flat Configuration with React Hooks & Refresh plugins)

---

## Project Structure

```text
Frontend/
├── public/                  # Static assets
├── src/
│   ├── api/                 # API service functions (using native fetch)
│   │   └── ocrApi.js
│   ├── components/
│   │   ├── Feedback/        # Loader and status indicators
│   │   │   ├── Loader.jsx
│   │   │   └── ErrorAlert.jsx
│   │   ├── Layout/          # Main wrappers and page structures
│   │   │   └── PageLayout.jsx
│   │   ├── Result/          # Structured output card and raw viewer
│   │   │   ├── AadhaarResultCard.jsx
│   │   │   └── RawJsonViewer.jsx
│   │   └── Upload/          # Upload inputs and preview handlers
│   │   │   ├── AadhaarUploadForm.jsx
│   │   │   └── ImagePreview.jsx
│   ├── context/             # Global states (Toast Context)
│   │   ├── ToastContext.jsx
│   │   └── toastContext.js
│   ├── hooks/               # Custom lifecycle and utility hooks
│   │   ├── useAadhaarOcr.jsx
│   │   └── useToast.js
│   ├── index.css            # Global styling system (design tokens, layouts)
│   ├── main.jsx             # Entry point
│   └── App.jsx              # Main Application Coordinator
├── .env                     # Environment variables configuration
├── eslint.config.js         # ESLint 10 rules setup
├── index.html               # Main HTML document
├── package.json             # NPM dependencies and scripts
└── README.md                # Documentation guide
```

---

## Setup & Running Locally

### Prerequisites

Ensure you have **Node.js (v18 or higher)** and **npm** installed on your system.

### 1. Clone the Repository & Install Dependencies

```bash
cd Frontend
npm install
```

### 2. Configure Environment Variables

Create a file named `.env` in the root of the `Frontend/` directory and configure the base URL of your backend API:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Start Development Server

Run the local Vite development server:

```bash
npm run dev
```

The app will start and typically be accessible at `http://localhost:5173`.

### 4. Code Quality & Linting

Ensure there are no style violations or lint warnings (ESLint Flat Config is verified and clean):

```bash
npm run lint
```

### 5. Build for Production

Compile and bundle the React project for production distribution:

```bash
npm run build
```

This generates optimized static files inside the `dist/` directory.

---

## User Manual & Operating Guide

1. **Upload Front Image**: Click on the **Aadhaar Front Side** card. Choose a clear JPEG or PNG image of your Aadhaar card's front side. The interface will render a preview of the image.
2. **Upload Back Image**: Click on the **Aadhaar Back Side** card. Choose a clear image of your Aadhaar card's back side containing the address details.
3. **Change or Remove**: If you chose the wrong image or want to modify your selection, click **Remove** inside the preview window, or click **Change** to select a different image.
4. **Trigger OCR**: Once both cards show active previews, the **Process OCR & Extract Data** button will become enabled. Click it to submit the request.
5. **Process Loader**: The UI will display a pulse-themed loading scanner indicator. Upload cards and actions are disabled during this process.
6. **View Result**: On success, the application displays:
   - **Extracted Aadhaar Details**: An organized profile card showing *Aadhaar Number*, *Name*, *Date of Birth*, *Gender*, and *Address*.
   - **Raw JSON Debugger**: A dropdown toggle displaying the structured raw response payload from the API server.
7. **Reset**: Click **Scan Another Card** or **Try Again** to return the interface to its clean slate state.
