# TDD Kata: Sweet Shop Management System

A full-featured sweet shop management system built using Django REST Framework and React. 
It allows shop owners to manage sweets, track inventory, and handle user purchases with role-based login and JWT authentication.

---
##  Tech Stack

**Frontend:**
- React
- Bootstrap & Custom CSS

**Backend:**
- Django
- Django REST Framework (DRF)
- JWT (JSON Web Token)
- JAZZMIN (interface for Django)
- SQLite / PostgreSQL

---
## Features

### (1) Admin Features

- **Add, Edit, Delete Sweets**  
  Upload images, set categories (e.g., Milk Based, Dry Fruit, Sugar Based, Bengali, Chocolate), define prices (per piece) and manage stock quantity.

- **Track Inventory**  
  Inventory is updated automatically after every order. If the quantity of a sweet becomes zero, it is marked as **"Out of Stock"** automatically.
  
  **Low Stock Notifications**  
  Admin receives a **"notification alert"** when the quantity of any sweet falls below a set threshold (e.g., less than 5 units), helping to restock in time.
  Also  receives a **"notification alert"** Sweets  **"Out of Stock"** (e.g.,Kaju Katri' is now OUT OF STOCK!).
 
- **Role-Based Admin Access**  
  Only users with admin roles can access sweet management, inventory control, and order data. All sensitive admin routes are protected.

- **Order Management**  
  Admin can view all placed orders, including buyer details, sweet name, quantity, price.

- **Auto Price Calculation**  
  Admin doesn’t need to calculate the total price manually.  
  The system uses:
  Total Price = Sweet Price × Quantity
  It also automatically reduces the sweet’s quantity in inventory after each purchase.

- **JWT Authentication**  
All admin operations are protected using secure JWT-based login. Unauthorized access is blocked.

### (2)User Features

- **Browse Sweets**  
  View all available sweets with images, names, categories, and prices.
  And Also search Sweet name and purchase the sweets.

- **Place Orders**  
  Select quantity, view calculated total price, and place an order.

- **Responsive UI**  
  Fully mobile-friendly and responsive design for smooth browsing and ordering.

- **Login/Register with JWT**  
  Secure user authentication using JWT for login and session management.
  Secure user login and session handling

---

## Test-Driven Development (TDD)
All core logic is written using a TDD approach.
Models, views, and serializers are covered with test cases.
Results in clean, maintainable, and bug-free code.

---

## Prerequisites Make sure the following are installed:


Make sure the following are installed:

- Python 3.x  
- npm (React)  
- SQLite (running and configured)  
  > Ensure the database details in `backend_sweet/settings.py` match your system.

- JAZZMIN (interface for Django)  
  ```bash
  pip install jazzmin

**Frontend Setup**
cd sweet_frontend
npm install
npm start

**Backend Setup**
cd backend_sweet
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver


---
## My AI Usage

In this project, I used AI tools to assist with development and documentation. Below is a detailed summary:

### Tools Used:
- **ChatGPT by OpenAI**  

###  How I Used Them:

- I used **ChatGPT** to:
  - Brainstorm feature ideas and user/admin flows for the Sweet Shop Management System.
  - Generate code for JWT authentication.
  - Draft TDD strategies and suggest test cases for Django views and serializers.
  - Get suggestions for role-based access and stock auto-deduction logic.

### Reflection on AI Impact:

Using ChatGPT greatly enhanced my productivity and workflow efficiency. It:
- Helped reduce writing time, letting me focus on core logic and UI design.
- Improved my code quality by suggesting cleaner, modular structures.
- Served as a quick assistant to clarify doubts on Django REST Framework, React integration, and authentication flows.
- Allowed me to brainstorm and validate design ideas quickly without needing long documentation searches.

AI didn’t replace my understanding or judgment—it **augmented** my thinking and allowed me to build features faster and with more confidence.

---
## Screenshots

**1.User Side (React)**
**Start Page**
<img width="1912" height="935" alt="image" src="https://github.com/user-attachments/assets/dcb0841c-647a-4786-9b33-1bc1a286b7df" />
**Register page**
<img width="1916" height="811" alt="image" src="https://github.com/user-attachments/assets/abd3b528-4472-41e6-ba36-a9580ecedb50" />
**Login Page**
<img width="1392" height="747" alt="image" src="https://github.com/user-attachments/assets/7d8b65f3-fe9b-4323-ad2b-b5427b16f9b3" />
**Home Page**
<img width="1892" height="907" alt="image" src="https://github.com/user-attachments/assets/48b3d55d-03bd-478e-aa38-9ad22b83ca02" />
**Sweet Page**
<img width="1893" height="808" alt="image" src="https://github.com/user-attachments/assets/8f37aecf-a584-4d5f-9827-f45c978cdbf5" />
**Purchase Sweets**
<img width="1875" height="865" alt="image" src="https://github.com/user-attachments/assets/6608976d-da71-4ecd-8ab1-9e47df2132b5" />
**Out Of stock image black And white**
<img width="1862" height="780" alt="image" src="https://github.com/user-attachments/assets/a154b0bb-dcf9-4cf8-a7ce-f7ddbd27cc3c" />


---

**2.Admin Side (Django)**
**Dashboard View**
<img width="1903" height="965" alt="image" src="https://github.com/user-attachments/assets/3aa38f59-91bc-4dc4-9248-bf0385c3f882" />
**Add Sweet Form**
<img width="1900" height="902" alt="image" src="https://github.com/user-attachments/assets/4318bd78-5ed9-4124-93a6-b1fa35290a2b" />
**View Purchase History**
<img width="1918" height="703" alt="image" src="https://github.com/user-attachments/assets/acc6c884-e7c2-4e16-b991-9383ca9952bc" />
**LOW And Out Of Stock Notification**
<img width="1895" height="918" alt="image" src="https://github.com/user-attachments/assets/a07aeec5-22be-4dff-a649-5af06012e78c" />

---
## Author : Tirth Mehta


