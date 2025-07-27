**TDD-Kata-Sweet-Shop-Management-System** 

--------------------------------------------------------------------------------------------------
Backend Performance (MithaiMagic Shop Management System)
The backend of the MithaiMagic Shop Management System is designed with scalability, efficiency, and robustness in mind. Built using Django and Django REST Framework, it ensures secure, fast, and reliable operations for both admin and users.

---------------------------------------------------------------------------------------------------
**Test-Driven Development (TDD)**
All core logic is written using a TDD approach.
Models, views, and serializers are covered with test cases.
Results in clean, maintainable, and bug-free code.

---------------------------------------------------------------------------------------------------
**Secure APIs**
All sensitive API routes are protected using JWT token-based authentication.
Only Admin can:
    Access the admin panel
    Add or update sweets
    Manage inventory

--------------------------------------------------------------------------------------------------
**Smart Stock Management**
Real-time inventory checks before every purchase to avoid overselling.
Flexible unit logic supports smooth customer experience.

-----------------------------------------------------------------------------------------------
**Admin Stock Notifications**
The admin panel shows real-time alerts:
    Out of Stock items are clearly marked.
    Low Stock items (≤ 5) are highlighted.
    Helps the admin take quick action to restock sweets.

----------------------------------------------------------------------------------------------
**Robust Error Handling**
Errors like stock shortage or invalid purchase quantity are caught early.
Users get clear messages like:
"Not enough stock available."
Prevents confusion and ensures inventory remains accurate.

------------------------------------------------------------------------------------------------
**Efficient Database Queries**
Optimized use of:
    filter() and annotate() for clean queryset operations
    select_related() and prefetch_related() to reduce DB hits
    Ensures fast data access, even with many sweets and purchases.

------------------------------------------------------------------------------------------------
**Admin Dashboard**
<img width="1851" height="795" alt="image" src="https://github.com/user-attachments/assets/684f269f-e6f7-42cc-b10d-9b40265ecc0c" /> 
