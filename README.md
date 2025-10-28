# 🧠 Portfolio Admin

A Node.js + Express web app that connects to **MongoDB Atlas**, provides an **admin dashboard** (EJS) to manage data.

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the App
```bash
npm run dev
```

Expected output:
```bash
Mongo connected
API running on http://localhost:3000
```

### 4. Open the admin dashboard

Visit http://localhost:3000/admin/profile
→ edit and save your profile.

Then visit http://localhost:3000/admin/codeworks
→ add or delete projects.

### 5. Optional: Test JSON API

GET http://localhost:3000/api/profile
GET http://localhost:3000/api/codeworks