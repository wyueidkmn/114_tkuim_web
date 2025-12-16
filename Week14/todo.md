# Week 14: Web Application Development Plan

This document outlines the tasks and implementation details for building our modern Todo List Application.

## 🎯 Project Goal
Create a responsive, aesthetically pleasing Todo List app using vanilla HTML, CSS, and JavaScript.

## 🛠 Tech Stack
-   **HTML5**: Semantic structure.
-   **CSS3**: Modern styling with Flexbox/Grid, variables, and animations.
-   **JavaScript (ES6+)**: DOM manipulation and application logic.

## 📋 Task List

### Phase 1: Preparation & Structure <!-- id: phase-1 -->
- [ ] **Create Project Folder**: Setup `Week14` directory.
- [ ] **HTML Structure (`index.html`)**:
    - [ ] Create wrapper container.
    - [ ] Add Header (Title, Date).
    - [ ] Add Input area (Text field + Button).
    - [ ] Add Todo List container (`<ul>`).
    - [ ] Add Footer stats (Items left, Clear completed).

### Phase 2: Styling (UI/UX) <!-- id: phase-2 -->
- [ ] **CSS Setup (`style.css`)**:
    - [ ] Define color variables (palette).
    - [ ] Reset default browser styles.
- [ ] **Component Styling**:
    - [ ] Card layout (shadows, rounded corners).
    - [ ] Input fields and Buttons (hover effects).
    - [ ] Todo Items (checkbox custom styling).
    - [ ] Responsive design adjustments.

### Phase 3: Functionality (Logic) <!-- id: phase-3 -->
- [ ] **JavaScript Logic (`script.js`)**:
    - [ ] **Add Task**: Listen for button click or Enter key.
    - [ ] **Render List**: Display tasks dynamically from array.
    - [ ] **Toggle Complete**: Switch state when clicked.
    - [ ] **Delete Task**: Remove item from array and update UI.
    - [ ] **Status Update**: Update "items left" counter.
    - [ ] **Clear Completed**: Filter out finished tasks.
    - [ ] **Initial Data**: (Optional) Populate with dummy data for testing.

---

## 📂 Implementation Details

### HTML Template

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <title>Week 14 Todo App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <!-- App Content Here -->
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### CSS Guidelines
- Use `:root` for variables.
- Use `flex` for layout alignment.
- Ensure accessible contrast ratios.

### JS Structure
```javascript
const state = {
    todos: []
};

function render() {
    // Update DOM based on state
}

function addTodo(text) {
    // Update state, then render
}
```
