# 🎁 Inaanak CRUD Application

A full-stack web application that manages a list of *Inaanak* (godchildren). This project demonstrates how to build and integrate a complete **CRUD (Create, Read, Update, Delete)** system using **Node.js**, **Express**, **Sequelize**, **MySQL**, and a frontend built with **React.js**. It also includes backend pagination and frontend data display with infinite scroll for efficient data handling.

---

## 🧰 Tech Stack

### **Backend**
- **Node.js** — JavaScript runtime for building the API server.
- **Express.js** — Lightweight web framework for creating RESTful APIs.
- **MySQL** — Relational database for storing inaanak data.
- **Nodemon** — Automatically restarts the server on code changes.
- **CORS Middleware** — Enables communication between the frontend and backend.
- **dotenv** — Manages environment variables securely.

### **Frontend**
- **React.js** — Frontend library for building a dynamic and responsive interface.
- **Vite** — Fast and modern build tool for frontend development.
- **React Infinite Scroll Component** — For pagination and smooth infinite scrolling.

---

Project Reference: https://www.facebook.com/ProgrammerLang/posts/pfbid026K5nkavn5ekCvcG1Yg7AmBU4M199HsuZBpFqnTX5V5wPqPF8tTKDcpNvPCpmAdiBl

---

[Part 1]
Create a CRUD API Using any framework that you want and connect it in MySQL.

INAANAK Entities:
- id (int)
- name (text)
- pamasko (float)

API Calls:
- ✅GET - localhost:8000/inaanak
- ✅GET - localhost:8000/inaanak/:id
- ✅POST - localhost:8000/inaanak
- ❌PATCH - GET - localhost:8000/inaanak/:id
- ✅DELETE - localhost:8000/inaanak/:id

[Part 2]
Enhance and Extend the Inaanak Application

Modify the Inaanak API
- Add pagination functionality to the API to support efficient data retrieval for large datasets.
- Ensure the API supports query parameters like page, limit, and optional sorting or filtering as needed.

Create the Inaanak CRUD Frontend
- Develop a frontend interface for Create, Read, Update, and Delete (CRUD) operations using the Inaanak API.
- Implement pagination on the frontend to display data retrieved from the API. (Scrollable)
- Use any framework of your choice

Integration
- Ensure seamless integration between the frontend and the API.
- Verify that all CRUD functionalities work as expected, including pagination.
