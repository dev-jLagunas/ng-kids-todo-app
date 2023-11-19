/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/app/app.component.html",
    "src/app/todo-home/todo-home.component.html",
    "src/app/todo-home/todo-user-info/todo-user-info.component.html",
    "src/app/todo-home/todo-item-done/todo-item-done.component.html",
    "src/app/todo-home/todo-item/todo-item.component.html",
    "src/app/todo-home/todo-counter/todo-counter.component.html",
    "src/app/start-app/start-app.component.html",
  ],
  theme: {
    extend: {
      width: {
        "90vw": "90vw",
      },
      height: {
        "90vh": "90vh",
      },
    },
  },
  plugins: [],
};
