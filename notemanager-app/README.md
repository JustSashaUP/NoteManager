# Notes App — Frontend

A React-based notes management UI with i18n, Zustand state management, and Cypress e2e tests.

## Tech Stack

- **React 18** — UI framework
- **Zustand** — state manager
- **react-i18next** — i18n localization (EN / UK)
- **Axios** — HTTP client
- **Cypress** — e2e testing

---

## Prerequisites

- Node.js ≥ 16
- Backend API running at `http://localhost:8081`

---

## Setup & Run

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start
```

The app proxies `/notes` requests to `http://localhost:8081` (configured in `package.json`).

To use a different backend URL, set the environment variable:

```bash
REACT_APP_API_URL=http://your-backend-host:port npm start
```

---

## Build for Production

```bash
npm run build
```

Output goes to the `build/` folder.

---

## Running E2E Tests (Cypress)

Make sure both the **backend** and the **frontend dev server** are running, then:

```bash
# Open Cypress interactive runner
npm run cypress:open

# Run headlessly (CI)
npm run cypress:run
```

Tests are located in `cypress/e2e/notes.cy.js` and cover:

- Viewing the notes list
- Switching language (EN ↔ UA)
- Creating a note
- Validation (empty title)
- Editing a note
- Deleting a note

---

## Features

| Feature | Details |
|---|---|
| List notes | Grid view with card previews |
| Create note | Form with title + content |
| Edit note | Pre-filled form |
| Delete note | Confirmation modal |
| i18n | English & Ukrainian, persisted in localStorage |
| State | Zustand store with loading/error/toast states |
| E2E test | Cypress — full CRUD flow |

---

## API Endpoints Expected

| Method | Path | Description |
|---|---|---|
| GET | `/notes` | Get all notes |
| GET | `/notes/{id}` | Get note by ID |
| POST | `/notes` | Create note |
| PUT | `/notes/{id}` | Update note |
| DELETE | `/notes/{id}` | Delete note |
