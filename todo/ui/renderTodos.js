const todosDiv = document.getElementById("todos");

const renderTodos = (project, onEditTodo, onDeleteTodo, onToggle) => {
  todosDiv.innerHTML = "";

  if (!project) return;

  project.todos.forEach(todo => {
    const row = document.createElement('div');
    row.classList.add('todo-row');

    const left = document.createElement('div');
    left.classList.add('todo-left');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener('change', () => onToggle(project.id, todo.id));

    const title = document.createElement('span');
    title.classList.add('todo-title');
    title.textContent = `${todo.title} (${todo.priority})`;
    if (todo.completed) title.classList.add('completed');

    left.appendChild(checkbox);
    left.appendChild(title);

    const actions = document.createElement('div');
    actions.classList.add('todo-actions');
    const editBtn = document.createElement('button');
    editBtn.classList.add('btn');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => onEditTodo(project.id, todo));

    const delBtn = document.createElement('button');
    delBtn.classList.add('btn','danger');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => onDeleteTodo(project.id, todo.id));

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    row.appendChild(left);
    row.appendChild(actions);

    todosDiv.appendChild(row);
  });
};

export { renderTodos };
