
# 🏠 MERN Property Listing App

A full-stack MERN application that allows users to create, view, and manage property listings with image uploads.

## 📸 Screenshot


![alt text](<Screenshot 2025-08-02 234436.png>)
![alt text](<Screenshot 2025-08-02 234346.png>)
![alt text](<Screenshot 2025-08-02 234402.png>)
![alt text](<Screenshot 2025-08-02 234450.png>)

## 📦 Technologies Used

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Image Uploads:** Multer

---

## 🚀 Features

- Add new properties with image upload
- View property listings with modal
- Responsive design
- Description shown beneath image and details
- REST API for all CRUD operations

---

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/rohitadhari1408/ReactTask1.git
cd ReactTask1.git
````

2. Install dependencies:

```bash
# For frontend
cd frontend
npm install

# For backend
cd ../backend
npm install
```

3. Create `.env` file in `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
```

4. Start the project:

```bash
# Start backend
cd backend
node index.js

# Start frontend
cd ../frontend
npm start
```

---

## 🗂 Folder Structure

```
MernAi/
├── backend/
│   ├── uploads/
│   ├── model/
│   ├── controller/
│   └── routes/
├── frontend/
│   └── components/
│       ├── PropertyCard.jsx
│       ├── PropertyModal.jsx
│       └── PropertyForm.jsx
├── README.md
└── screenshots/
    └── property-modal.png
```

---

## 📤 API Endpoints

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| POST   | `/api/properties`     | Create new property      |
| GET    | `/api/properties`     | Get all properties       |
| GET    | `/api/properties/:id` | Get single property info |

