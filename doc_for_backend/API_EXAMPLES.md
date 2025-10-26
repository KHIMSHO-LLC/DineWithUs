# DineWithUs API - Quick Examples

## Authentication Flow

### 1. Register New User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "chef@example.com",
  "password": "SecurePass123!",
  "name": "Chef Maria",
  "role": "host"
}
```

### 2. Google OAuth Flow
```
1. User clicks "Sign in with Google"
2. Redirects to Google OAuth
3. After success, redirects to /api/auth/callback/google
4. If new user, redirects to /auth/role-selection
5. User selects role (guest or host)
6. POST /api/auth/update-role with selected role
```

### 3. Get Current User Session
```bash
GET /api/auth/current-user
Authorization: Bearer {token}
```

---

## Complete User Journey Examples

### Guest User Journey

#### 1. Search for Dinners
```bash
GET /api/search/dinners?location=Brooklyn&date=2024-11-15&guests=4&cuisine=Italian
```

#### 2. View Dinner Details
```bash
GET /api/dinners/dinner_001
```

#### 3. Create Booking
```bash
POST /api/bookings
Content-Type: application/json
Authorization: Bearer {token}

{
  "dinnerId": "dinner_001",
  "guests": 4,
  "message": "Excited for this dinner! Any vegetarian options?",
  "contactInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }
}
```

#### 4. View My Bookings
```bash
GET /api/bookings/user/user_123?status=CONFIRMED
```

#### 5. Leave Review (after dinner)
```bash
POST /api/reviews
Content-Type: application/json
Authorization: Bearer {token}

{
  "dinnerId": "dinner_001",
  "rating": 5,
  "comment": "Amazing experience! The pasta was incredible and Maria was a wonderful host."
}
```

---

### Host User Journey

#### 1. Create New Dinner
```bash
POST /api/dinners
Content-Type: application/json
Authorization: Bearer {token}

{
  "title": "Authentic Italian Family Feast",
  "description": "Join us for an authentic Italian dinner featuring recipes passed down through generations. We'll start with a welcome aperitivo, followed by homemade pasta, and finish with traditional tiramisu.",
  "price": 75.00,
  "currency": "USD",
  "date": "2024-11-15T19:00:00.000Z",
  "time": "19:00",
  "duration": 180,
  "capacity": 8,
  "images": [
    "https://images.unsplash.com/photo-pasta-1.jpg",
    "https://images.unsplash.com/photo-dining-2.jpg"
  ],
  "cuisine": "Italian",
  "dietary": ["Vegetarian options available", "Gluten-free pasta available"],
  "instantBook": true,
  "menu": [
    "Antipasto platter with cured meats and cheeses",
    "Homemade tagliatelle with ragù",
    "Osso buco with risotto alla milanese",
    "Traditional tiramisu"
  ],
  "included": [
    "Welcome aperitivo (Aperol Spritz or Prosecco)",
    "4-course meal",
    "Wine pairing with each course",
    "Limoncello digestif"
  ],
  "houseRules": [
    "Please arrive on time (19:00)",
    "No smoking indoors",
    "Respect our home and neighbors",
    "Let us know about dietary restrictions 24h in advance"
  ],
  "location": {
    "address": "123 Main Street, Apt 4B",
    "city": "Brooklyn",
    "state": "NY",
    "neighborhood": "Park Slope",
    "coordinates": {
      "lat": 40.6782,
      "lng": -73.9442
    }
  }
}
```

#### 2. View My Dinners
```bash
GET /api/host/host_001/dinners?status=active&page=1&limit=10
```

#### 3. View Bookings for My Dinners
```bash
GET /api/bookings/host/host_001?status=PENDING
```

#### 4. Confirm a Booking
```bash
PATCH /api/bookings/booking_001/status
Content-Type: application/json
Authorization: Bearer {token}

{
  "status": "CONFIRMED"
}
```

#### 5. Update Dinner Details
```bash
PATCH /api/dinners/dinner_001
Content-Type: application/json
Authorization: Bearer {token}

{
  "available": 6,
  "price": 80.00,
  "dietary": ["Vegetarian options available", "Gluten-free pasta available", "Vegan option available"]
}
```

#### 6. View My Statistics
```bash
GET /api/host/host_001/stats
```

#### 7. View My Reviews
```bash
GET /api/host/host_001/reviews
```

---

## Advanced Search Examples

### Search with Multiple Filters
```bash
GET /api/search/dinners?query=pasta&location=Brooklyn&date=2024-11-15&guests=4&cuisine=Italian&minPrice=50&maxPrice=100&instantBook=true&dietary=vegetarian&page=1&limit=20
```

### Get Available Cuisines
```bash
GET /api/search/cuisines
```

### Get Popular Locations
```bash
GET /api/search/locations
```

---

## Profile Management

### Update User Profile
```bash
PATCH /api/users/user_123
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "John Doe Updated",
  "bio": "Food enthusiast and home chef passionate about Italian cuisine. Love hosting intimate dinners and sharing family recipes.",
  "image": "https://example.com/new-avatar.jpg"
}
```

### Get User Profile
```bash
GET /api/users/user_123
```

---

## Error Handling Examples

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid request data",
  "code": "BAD_REQUEST",
  "details": {
    "field": "guests",
    "message": "Guests must be a positive number"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Authentication required",
  "code": "UNAUTHORIZED"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "You don't have permission to access this resource",
  "code": "FORBIDDEN",
  "details": {
    "message": "Only hosts can create dinners"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Dinner not found",
  "code": "NOT_FOUND",
  "details": {
    "dinnerId": "dinner_invalid_123"
  }
}
```

### 409 Conflict
```json
{
  "success": false,
  "error": "Email already exists",
  "code": "EMAIL_ALREADY_EXISTS",
  "details": {
    "email": "user@example.com"
  }
}
```

### 422 Unprocessable Entity
```json
{
  "success": false,
  "error": "Booking date must be in the future",
  "code": "PAST_DATE",
  "details": {
    "field": "date",
    "providedDate": "2024-10-20T19:00:00.000Z",
    "currentDate": "2024-10-23T10:00:00.000Z"
  }
}
```

---

## Pagination Example

### Request
```bash
GET /api/dinners?page=2&limit=10
```

### Response
```json
{
  "success": true,
  "data": [
    // ... 10 dinner objects
  ],
  "pagination": {
    "page": 2,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

---

## Rate Limiting

### Headers in Response
```
X-RateLimit-Limit: 200
X-RateLimit-Remaining: 195
X-RateLimit-Reset: 1698067200
```

### Rate Limit Exceeded (429)
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED",
  "details": {
    "limit": 200,
    "resetAt": "2024-10-23T10:15:00.000Z"
  }
}
```

---

## WebSocket Events (Future Implementation)

### Connect to WebSocket
```javascript
const ws = new WebSocket('wss://api.dinewithus.com/ws?token={auth_token}')
```

### Booking Status Update Event
```json
{
  "event": "booking.status_updated",
  "data": {
    "bookingId": "booking_001",
    "status": "CONFIRMED",
    "dinnerId": "dinner_001",
    "updatedAt": "2024-10-23T10:00:00.000Z"
  }
}
```

### New Booking Event (for hosts)
```json
{
  "event": "booking.created",
  "data": {
    "bookingId": "booking_002",
    "dinnerId": "dinner_001",
    "guests": 4,
    "userId": "user_456",
    "createdAt": "2024-10-23T10:00:00.000Z"
  }
}
```

---

## Testing Credentials

### Test Guest User
```
Email: guest@test.com
Password: TestGuest123!
```

### Test Host User
```
Email: host@test.com
Password: TestHost123!
```

---

## Important Notes

1. **All dates must be in ISO 8601 format:** `2024-10-23T10:00:00.000Z`
2. **All prices are in cents/smallest currency unit**
3. **Images should be uploaded first and URLs provided**
4. **Authentication token expires after 30 days**
5. **Booking confirmations trigger email notifications**
6. **Reviews can only be submitted after the dinner date has passed**
7. **Hosts cannot book their own dinners**
8. **Guests cannot create dinners (role-based access)**

