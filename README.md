# ✍️ Post Management System (Mini CRUD App)

A small, single-page application built with React to demonstrate fundamental CRUD (Create, Read, Update, Delete) operations, client-side routing, state management, and data persistence using `localStorage`.

## Stack

* **Frontend:** React (Vite)
* **Styling:** Bootstrap 5 & React-Bootstrap
* **Routing:** React Router DOM v6
* **State Management:** React Context API + Hooks (`usePostStore`)
* **Persistence:** Browser `localStorage`

## Features Implemented

* ✅ **Full CRUD:** Create, Read (List & Detail), Update, and Delete posts.
* ✅ **Data Persistence:** Posts are saved to and loaded from `localStorage`.
* ✅ **Routing:** Uses `/`, `/posts/new`, `/posts/:id`, and `/posts/:id/edit`.
* ✅ **Form Validation:** Client-side validation for required fields, min length (Content), and inline error messages.
* ✅ **Search/Filter:** Client-side search by title and filter by author on the list page.
* ✅ **Confirmation Dialog:** Uses a Bootstrap modal for delete confirmation.
* ✅ **Seed Data:** 10+ posts are pre-loaded if no data exists in `localStorage`.
* ✅ **Feedback:** Success messages for CRUD actions using `useLocation` state.

## Installation and Run Instructions

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/post-management-system.git](https://github.com/your-username/post-management-system.git)
    cd post-management-system
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will typically open at `http://localhost:5173/`.

## Screenshots (Conceptual)

*(Note: In a real project, you would replace these conceptual tags with actual screenshots of your running app.)*

1.  **Post List View:**
    
2.  **Create Post Form:**
    
3.  **Post Detail View:**
    
4.  **Delete Confirmation:**