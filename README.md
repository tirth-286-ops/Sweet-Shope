# MithaiMagic - Sweet Shop Management System

A full-featured sweet shop management system built using Django REST Framework and React. 
It allows shop owners to manage sweets, track inventory, and handle user purchases with role-based login and JWT authentication.

---
##  Tech Stack

**Frontend:**
- React.js
- Bootstrap & Custom CSS

**Backend:**
- Django
- Django REST Framework (DRF)
- JWT (JSON Web Token)
- JAZZMIN (interface for Django)
- SQLite / PostgreSQL

---
## Features

### (1)Admin Features

- **Add, Edit, Delete Sweets**  
  Upload images, set categories, define prices, and manage stock quantity.

- **Track Inventory**  
  Automatically marks sweets as "Out of Stock" when the quantity reaches zero.

- **Role-Based Admin Access**  
  Only admin users can manage sweets and inventory operations.

- **Order Management**  
  View and manage all placed orders with complete order details.

- **JWT Authentication**  
  Secure token-based authentication for protected admin routes.
---
### (2)User Features

- **Browse Sweets**  
  View all available sweets with images, names, categories, and prices.

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
## Screenshots

**1.User Side (React)**
**Register page**
<img width="1916" height="811" alt="image" src="https://github.com/user-attachments/assets/abd3b528-4472-41e6-ba36-a9580ecedb50" />
**Login Page**
<img width="1392" height="747" alt="image" src="https://github.com/user-attachments/assets/7d8b65f3-fe9b-4323-ad2b-b5427b16f9b3" />
**Home Page**
<img width="1892" height="907" alt="image" src="https://github.com/user-attachments/assets/48b3d55d-03bd-478e-aa38-9ad22b83ca02" />
**Sweet Page**
<img width="1895" height="786" alt="image" src="https://github.com/user-attachments/assets/e1f554bc-916c-488f-ac5a-028a0c190355" />
**Out Of stock image black And white**
<img width="472" height="803" alt="image" src="https://github.com/user-attachments/assets/ba0ec93c-1a4f-4789-8bf4-cf865e7683d4" />

---

**2.Admin Side (Django)**
**Dashboard View**
<img width="1903" height="965" alt="image" src="https://github.com/user-attachments/assets/3aa38f59-91bc-4dc4-9248-bf0385c3f882" />
**Add Sweet Form**
<img width="1900" height="902" alt="image" src="https://github.com/user-attachments/assets/4318bd78-5ed9-4124-93a6-b1fa35290a2b" />
**View Purchase History**
<img width="1918" height="703" alt="image" src="https://github.com/user-attachments/assets/acc6c884-e7c2-4e16-b991-9383ca9952bc" />
**LOW And Out Of Stock**
<img width="1627" height="390" alt="image" src="https://github.com/user-attachments/assets/5e6a2fc2-5350-4b92-974f-13e3a8e53a55" />


---



