# 🍳 Nel's Kitchen

*A recipe-sharing platform made with love, dedicated to my mother.*

Built using **Python Pyramid** (backend) and **React** (frontend).

## 💖 Inspiration

**Nel's Kitchen** was created for my beloved mother, to help her collect, share, and manage her favorite recipes in one beautiful, easy-to-use web application.

## 🧑‍🏫 Developed Under Supervision of

**Muhammad Habib Algifari, S.Kom., M.T.I.**  
Lecturer at Institut Teknologi Sumatera  
**Course**: *Pemrograman Web (Web Programming)*

## 👨‍💻 Author

**Dito Rifki Irawan**  
GitHub: [@Caseinn](https://github.com/Caseinn)  
**NIM**: 122140153

## 🛠️ Installation & Setup

### 🔧 Backend (Python Pyramid)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Caseinn/nels-kitchen.git
   cd nels-kitchen/backend
   ```

2. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -e .
   ```

4. **Set up the database**  
   Make sure you have PostgreSQL installed . Update the `development.ini` with your database URL if needed:
   ```ini
   sqlalchemy.url = postgresql://.../nelskitchen_db
   ```

5. **Initialize the database**
   ```bash
   alembic -c development.ini revision --autogenerate -m "init"
   alembic -c development.ini upgrade head
   initialize_backend_db development.ini
   ```

6. **Run the backend server**
   ```bash
   pserve development.ini --reload
   ```

   The backend will be available at `http://localhost:6543`.

### 💻 Frontend (React)

1. **Navigate to the frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`.

## 📁 Project Structure Overview

* `backend/` – Python Pyramid application
  * `development.ini` – Configuration file
  * `backend/models/` – SQLAlchemy models
  * `backend/schemas/` – Marshmallow schemas
  * `backend/views/` – API views
  * `backend/services/` – Business logic
  * `scripts/initialize_db.py` – Script to initialize the database
* `frontend/` – React application
  * `src/pages/` – Page components
  * `src/components/` – Reusable UI components
  * `src/hooks/` – Custom hooks (e.g., authentication, data fetching)
  * `src/lib/utils.js` – Utility functions
  * `public/` – Static assets like mascot, images

## 🧪 Testing

### Backend Tests
From the `backend/` directory:
```bash
pytest
```

## ❤️ Dedicated to My Mother

This app is not just a class project — it's a tribute to the person who taught me to cook and inspired my love for food and sharing.
