# API Documentation - Yamaya Trade

## Authentication & User Management API

### Overview

This API implements role-based access control with two user roles:

- **Admin**: Can create/edit/delete managers and create products
- **Manager**: Can only create products

---

## API Endpoints

### 1. Authentication

#### POST `/api/auth/login`

Login with username and password.

**Request Body:**

```json
{
  "username": "admin",
  "password": "yamaya2025"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "user": {
    "id": "1",
    "username": "admin",
    "role": "admin",
    "name": "Admin User",
    "email": "admin@yamaya.mn",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Response (Error - 401):**

```json
{
  "error": "Нэвтрэх нэр эсвэл нууц үг буруу байна"
}
```

---

### 2. User Management (Admin Only)

All user management endpoints require the `Authorization` header with the logged-in user's data.

**Authorization Header:**

```
Authorization: {"id":"1","username":"admin","role":"admin",...}
```

---

#### GET `/api/users`

List all users (Admin only).

**Headers:**

```
Authorization: <user_json>
```

**Response (Success - 200):**

```json
{
  "success": true,
  "users": [
    {
      "id": "1",
      "username": "admin",
      "role": "admin",
      "name": "Admin User",
      "email": "admin@yamaya.mn",
      "createdAt": "2025-01-01T00:00:00.000Z"
    },
    {
      "id": "2",
      "username": "manager1",
      "role": "manager",
      "name": "Manager User",
      "email": "manager@yamaya.mn",
      "createdAt": "2025-01-15T00:00:00.000Z"
    }
  ]
}
```

**Response (Error - 403):**

```json
{
  "error": "Зөвхөн админ хэрэглэгч хандах боломжтой"
}
```

---

#### POST `/api/users`

Create a new manager user (Admin only).

**Headers:**

```
Authorization: <user_json>
```

**Request Body:**

```json
{
  "username": "manager2",
  "password": "manager456",
  "name": "New Manager",
  "email": "manager2@yamaya.mn"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "user": {
    "id": "3",
    "username": "manager2",
    "role": "manager",
    "name": "New Manager",
    "email": "manager2@yamaya.mn",
    "createdAt": "2025-10-21T12:00:00.000Z"
  },
  "message": "Менежер амжилттай үүсгэгдлээ"
}
```

**Response (Error - 400):**

```json
{
  "error": "Энэ нэвтрэх нэр аль хэдийн бүртгэлтэй байна"
}
```

---

#### GET `/api/users/[id]`

Get a specific user by ID (Admin only).

**Headers:**

```
Authorization: <user_json>
```

**Response (Success - 200):**

```json
{
  "success": true,
  "user": {
    "id": "2",
    "username": "manager1",
    "role": "manager",
    "name": "Manager User",
    "email": "manager@yamaya.mn",
    "createdAt": "2025-01-15T00:00:00.000Z"
  }
}
```

**Response (Error - 404):**

```json
{
  "error": "Хэрэглэгч олдсонгүй"
}
```

---

#### PUT `/api/users/[id]`

Update a user (Admin only, cannot modify other admins).

**Headers:**

```
Authorization: <user_json>
```

**Request Body:**

```json
{
  "name": "Updated Manager Name",
  "email": "updated@yamaya.mn",
  "password": "newpassword123"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "user": {
    "id": "2",
    "username": "manager1",
    "role": "manager",
    "name": "Updated Manager Name",
    "email": "updated@yamaya.mn",
    "createdAt": "2025-01-15T00:00:00.000Z"
  },
  "message": "Мэдээлэл амжилттай шинэчлэгдлээ"
}
```

**Response (Error - 403):**

```json
{
  "error": "Админ хэрэглэгчийг засах боломжгүй"
}
```

---

#### DELETE `/api/users/[id]`

Delete a user (Admin only, cannot delete self or other admins).

**Headers:**

```
Authorization: <user_json>
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Хэрэглэгч амжилттай устгагдлаа"
}
```

**Response (Error - 400):**

```json
{
  "error": "Өөрийгөө устгах боломжгүй"
}
```

**Response (Error - 403):**

```json
{
  "error": "Админ хэрэглэгчийг устгах боломжгүй"
}
```

---

## Role Permissions

### Admin Role

- ✅ Create products
- ✅ Create managers
- ✅ View all users
- ✅ Edit managers
- ✅ Delete managers
- ❌ Cannot delete self
- ❌ Cannot delete other admins

### Manager Role

- ✅ Create products
- ❌ Cannot manage users
- ❌ Cannot access user management page

---

## Default Users

### Admin Account

- **Username:** `admin`
- **Password:** `yamaya2025`
- **Role:** Admin
- **Permissions:** Full access

### Manager Account

- **Username:** `manager1`
- **Password:** `manager123`
- **Role:** Manager
- **Permissions:** Product creation only

---

## Frontend Integration

### AuthContext Helper Functions

The `AuthContext` provides the following helper functions:

```typescript
const { user, isAdmin, isManager, canCreateProducts, canManageUsers } =
  useAuth();

// Check if current user is admin
isAdmin(); // returns true/false

// Check if current user is manager
isManager(); // returns true/false

// Check if user can create products (admin or manager)
canCreateProducts(); // returns true/false

// Check if user can manage other users (admin only)
canManageUsers(); // returns true/false
```

### Usage Example

```typescript
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, canManageUsers } = useAuth();

  if (canManageUsers()) {
    return <AdminOnlyFeature />;
  }

  return <RegularContent />;
}
```

---

## Security Notes

⚠️ **For Development Only:**

- Passwords are stored in plain text
- Authentication uses simple header-based auth
- User data is stored in memory

🔒 **For Production:**

- Use proper database (PostgreSQL, MongoDB, etc.)
- Hash passwords with bcrypt or argon2
- Implement JWT tokens
- Add rate limiting
- Add input validation
- Use HTTPS only
- Add session management
- Implement password reset flow
- Add 2FA for admin accounts

---

## Pages

### `/admin/login`

Login page for all users (admin and manager).

### `/admin/users`

User management page (Admin only). Features:

- View all users in table format
- Create new manager accounts
- Edit manager details
- Delete manager accounts
- Cannot modify or delete admin accounts

### Protected Admin Pages

All admin pages are protected and require authentication:

- `/admin` - Dashboard
- `/admin/products` - Product list
- `/admin/products/create` - Create product
- `/admin/products/edit/[barcode]` - Edit product
- `/admin/users` - User management (Admin only)

---

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── login/
│   │   │       └── route.ts          # Login endpoint
│   │   └── users/
│   │       ├── route.ts              # List/Create users
│   │       └── [id]/
│   │           └── route.ts          # Get/Update/Delete user
│   └── admin/
│       ├── layout.tsx                # Auth provider wrapper
│       ├── login/
│       │   └── page.tsx              # Login page
│       └── users/
│           └── page.tsx              # User management page
├── components/
│   ├── AdminLayout.tsx               # Admin layout with nav
│   └── ProtectedRoute.tsx            # Route protection HOC
└── contexts/
    └── AuthContext.tsx               # Auth state management
```
