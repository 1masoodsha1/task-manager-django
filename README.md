## Welcome 👋

Thanks for taking the time to work through this exercise!

We don’t expect perfection or a “finished product” in the short time you have. The goal is simply to see how you think,
how you structure code, and how you approach a realistic problem. It’s completely okay if you don’t get through everything.

A few things to keep in mind while you work:

- You’re encouraged to make reasonable assumptions if something isn’t fully specified.
- There isn’t one “right” solution — we’re more interested in your reasoning than in a specific pattern or framework.
- Feel free to leave comments or notes in the code if you’d like to explain trade-offs or what you’d do with more time.

Above all, relax and have fun with it. Treat this as a chance to show how you naturally work on a small but real-world backend feature rather than an exam.

---
## 🚀 Setup Instructions

This project contains two separate applications:

- **Backend** —  Django Web API (6.0.3)
- **Frontend** — React + TypeScript + Vite

You must run **both** for the application to work.

---

## 📦 Setup

### **Requirements**
BE
- Python 3.12+
- Port **8000** must be available

FE
- Node.js 18+
- NPM
- Port 5173 must be available 

### **Steps**

BE
1. Navigate to the backend directory:

   ```bash
   cd backend
   ```
2. Start the Django application:
   ```bash
   python -m venv .venv
   ```

   Windows 
   ```bash
   .\.venv\Scripts\Activate.ps1
   python -m pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver 8000
   ```
   Mac/Linux
   ```bash
   source .venv/bin/activate
   python -m pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver 8000
   ```
FE
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```
   npm start 
   ```
---

## Run Tests 

The backend exposes a simple REST API for managing tasks under the base path:

BE
```bash
cd backend
python manage.py test
```
FE
```
cd frontend
npm install
npm test
```



## Current API Overview

The backend exposes a simple REST API for managing tasks under the base path:

```text
GET     /api/tasks/         List all tasks
POST    /api/tasks/         Create a task
GET     /api/tasks/<id>/    Get one task
PUT     /api/tasks/<id>/    Update a task
DELETE  /api/tasks/<id>/    Delete a task
```