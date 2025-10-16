# ToDoList API — Dokumentasi

RESTful API sederhana untuk mengelola todo list. Dibangun dengan Node.js, Express, dan MongoDB.

## Ringkasan
- Entry: `index.js` (atau `src/server.js`)
- App: `src/app.js`
- DB connector: `src/config/db.js`
- Models: `src/models/userModel.js`, `src/models/todoModel.js`
- Controllers: `src/controllers/userController.js`, `src/controllers/todoController.js`
- Middleware auth: `src/middleware/authMiddleware.js`
- Routes: `src/routes/userRoutes.js`, `src/routes/todoRoutes.js`

## Prasyarat
- Node.js >= 16
- MongoDB (URI di `.env`)
- npm

## Setup & Menjalankan
1. Salin `.env.example` menjadi `.env` dan isi:
   - MONGO_URI
   - JWT_SECRET
   - PORT (opsional, default 5000)
2. Install dependensi:
   ```bash
   npm install
   ```
3. Jalankan:
   - Production:
     ```bash
     npm start
     ```
   - Development (nodemon):
     ```bash
     npm run dev
     ```

## Autentikasi
- Menggunakan JWT.
- Sertakan header: `Authorization: Bearer <token>`
- Token dihasilkan saat register/login.

## Endpoints

Base URL: `http://localhost:5000/api`

1) Register
- Method: POST
- URL: `/users/register`
- Body (JSON):
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
- Response (201):
  {
    "message": "User registered successfully",
    "token": "jwt-token"
  }
- Contoh cURL:
  ```bash
  curl -X POST http://localhost:5000/api/users/register \
    -H "Content-Type: application/json" \
    -d '{"name":"nama","email":"a@b.com","password":"123456"}'
  ```

2) Login
- Method: POST
- URL: `/users/login`
- Body:
  {
    "email": "string",
    "password": "string"
  }
- Response (200):
  {
    "message": "Login success",
    "token": "jwt-token"
  }
- Contoh cURL:
  ```bash
  curl -X POST http://localhost:5000/api/users/login \
    -H "Content-Type: application/json" \
    -d '{"email":"a@b.com","password":"123456"}'
  ```

3) Create Todo
- Method: POST
- URL: `/todos`
- Auth: Required
- Body:
  {
    "title": "string",
    "description": "string (optional)",
    "status": "pending|in progress|done (optional)"
  }
- Response (201): objek todo dibuat
- cURL:
  ```bash
  curl -X POST http://localhost:5000/api/todos \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <token>" \
    -d '{"title":"Beli buku","description":"Judul X","status":"pending"}'
  ```

4) Get all Todos
- Method: GET
- URL: `/todos`
- Auth: Required
- Response (200): array todos milik user
- cURL:
  ```bash
  curl http://localhost:5000/api/todos -H "Authorization: Bearer <token>"
  ```

5) Get Todo by ID
- Method: GET
- URL: `/todos/:id`
- Auth: Required
- Response (200): objek todo atau 404
- cURL:
  ```bash
  curl http://localhost:5000/api/todos/<id> -H "Authorization: Bearer <token>"
  ```

6) Update Todo
- Method: PUT
- URL: `/todos/:id`
- Auth: Required
- Body: fields yang ingin diubah (title, description, status)
- Response (200): todo yang terupdate
- cURL:
  ```bash
  curl -X PUT http://localhost:5000/api/todos/<id> \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <token>" \
    -d '{"status":"done"}'
  ```

7) Delete Todo
- Method: DELETE
- URL: `/todos/:id`
- Auth: Required
- Response (200): { "message": "Todo deleted successfully" }
- cURL:
  ```bash
  curl -X DELETE http://localhost:5000/api/todos/<id> -H "Authorization: Bearer <token>"
  ```

8) Delete All Todos
- Method: DELETE
- URL: `/todos`
- Auth: Required
- Response (200): { "message": "All todos deleted successfully" }
- cURL:
  ```bash
  curl -X DELETE http://localhost:5000/api/todos -H "Authorization: Bearer <token>"
  ```

## Model ringkas
- User: name, email, password (di-hash)
- Todo: title, description, status, user (reference ke User), timestamps

## Catatan penting
- Pastikan JWT_SECRET dan MONGO_URI terisi di `.env`.
- Middleware `protect` memastikan route todo hanya diakses pemilik token.
- Untuk contoh request bisa gunakan file `auth.rest` (jika tersedia).
