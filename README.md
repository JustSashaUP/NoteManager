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
 
## Run Backend Only
 
See [notemanager-app/README.md](./notemanager-app/README.md)
 
## Run Frontend Only
 
See [notes-app/README.md](./notes-app/README.md)
 
