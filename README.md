# Users List Dashboard

A simple **Users List Dashboard** built with React.js and Bootstrap, featuring CRUD operations, search functionality, pagination, and a responsive design.

## Features
- **View Users List**: Displays a paginated list of users.
- **Add User**: Allows users to add new entries.
- **Edit User**: Edit existing user details.
- **Delete User**: Remove a user from the list.
- **Search User**: Search by exact user ID.
- **Pagination**: Displays 5 users per page.
- **Mobile Responsive**: Optimized for both desktop and mobile.
- **Session Storage**: Saves users' data for persistence.

## Tech Stack
- **Frontend:** React.js, Bootstrap
- **State Management:** Component State & Session Storage
- **API:** Fetching users from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users)
- **Styling:** Bootstrap

## Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/KiranThangella/userslist-dashboard.git
   cd userslist-dashboard
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm start
   ```
   Runs the app on `http://localhost:3000`.

## Folder Structure
```
userslist-dashboard/
│── src/
│   │── components/
│   │   ├── Navbar.js
│   │   ├── UserList.js
│   │   ├── UserForm.js
│   │   ├── ErrorBoundary.js
│   │── App.js
│   │── App.css
│   │── index.js
│── public/
│── package.json
│── README.md
```

## Usage
1. Click **Users List** to view all users.
2. Click **Add User** to add a new user.
3. Click **Edit** next to a user to update their details.
4. Click **Delete** to remove a user.
5. Use the **Search Bar** to find users by ID.
6. Navigate between pages using **Previous** and **Next** buttons.

## Issues & Contributions
- If you encounter any bugs, feel free to create an issue.
- Contributions are welcome! Fork the repository and submit a pull request.



