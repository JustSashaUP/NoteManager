# NoteManager
 
Full-stack notes management application.
 
**Backend:** Java (Spring Boot)  
**Frontend:** React  
**Database:** runs in Docker  
 
---
 
## Quick Start (Everything at once)
 
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
 
## Project Structure
 
```
NoteManager/
├── notemanager-app/        ← Java Spring Boot backend
├── notes-app/              ← React frontend
├── docker-compose.yml      ← runs everything together
└── README.md
```
 
---
 
## Run Frontend Only
 
See [notes-app/README.md](./notemanager-app/README.md)

---

## Run Backend Only

### Run with Docker (Recommended)

```bash
docker-compose up --build
```

API will be available at **http://localhost:8081**

### Run Locally (Without Docker)

Make sure you have **Java 17+** and **Maven** installed.

```bash
cd notemanager-app
./mvnw spring-boot:run
```

### Example Requests

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

### API Endpoints

| Method | URL | Description |
|---|---|---|
| GET | `/notes` | Get all notes |
| GET | `/notes/{id}` | Get note by ID |
| POST | `/notes` | Create a note |
| PUT | `/notes/{id}` | Update a note |
| DELETE | `/notes/{id}` | Delete a note |

---
 
