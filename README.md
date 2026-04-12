# NoteManager
1. [Quick Start (Everything at once)](#Quick-Start)
2. [Run Frontend Only](#Run-Frontend-Only)
3. [Running E2E Tests](#Running-E2E-Tests-Cypress)
4. [The API Test](#the-api-test)
5. [Project Structure](#Project-Structure)
 
Full-stack notes management application.
 
**Backend:** Java (Spring Boot)  
**Frontend:** React  
**Database:** runs in Docker  
 
---
 
## Quick Start
 
Make sure you have **Docker** installed, then run:
 
```bash
docker-compose up --build
```
 
- Frontend → http://localhost:3000
- Backend API → http://localhost:8081
 
To stop:
 
```bash
docker-compose down
```
 
---
## Running E2E Tests (Cypress)

Make sure both the **backend** and the **frontend dev server** are running, then:

```bash
# Open the directory with the frontend part
cd ./notemanager-app

# Open Cypress interactive runner
npm run cypress:open

# Run headlessly (CI)
npm run cypress:run
```

Tests are located in `cypress/e2e/notes.cy.js` and cover:

- Viewing the notes list
- Switching language
- Creating a note
- Validation (empty title)
- Editing a note
- Deleting a note

---

## Run Frontend Only
 
See [notemanager-app/README.md](./notemanager-app/README.md)

---
## The API Test

**Get all notes:**
```bash
curl http://localhost:8081/notes
```

**Create a note:**
```bash
curl -X POST http://localhost:8081/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "My Note", "content": "Hello world"}'
```

**Update a note:**
```bash
curl -X PUT http://localhost:8081/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title", "content": "Updated content"}'
```

**Delete a note:**
```bash
curl -X DELETE http://localhost:8081/notes/1
```

---
 
## Project Structure
 
```
NoteManager/                ← Java Spring Boot backend
├── notemanager-app/        ← React frontend
├── docker-compose.yml      ← runs everything together
└── README.md
```
 
---

### API Endpoints

| Method | URL | Description |
|---|---|---|
| GET | `/notes` | Get all notes |
| GET | `/notes/{id}` | Get note by ID |
| POST | `/notes` | Create a note |
| PUT | `/notes/{id}` | Update a note |
| DELETE | `/notes/{id}` | Delete a note |

---
 
