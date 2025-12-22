
const projectsDiv = document.getElementById("projects");

const formatTime = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch (e) {
    return iso;
  }
};

const renderProjects = (projects, selectedId, onSelect, onEdit, onDelete, onEditTodo, onDeleteTodo, onToggleTodo) => {
  projectsDiv.innerHTML = "";

  projects.forEach(project => {
    const container = document.createElement("div");
    container.classList.add('project-row');

    const left = document.createElement("div");
    left.classList.add('project-left');
    left.dataset.projectId = project.id;

    const nameSpan = document.createElement("span");
    nameSpan.classList.add('project-name');
    nameSpan.textContent = project.name;
    if (project.id === selectedId) {
      nameSpan.classList.add('selected');
    }

    const meta = document.createElement("div");
    meta.classList.add('project-meta');
    meta.textContent = ` (${project.todos.length} todos) • ${formatTime(project.createdAt)}`;

    left.appendChild(nameSpan);
    left.appendChild(meta);
    left.addEventListener('click', () => onSelect(project));

    const actions = document.createElement('div');
    actions.classList.add('project-actions');

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', (e) => { e.stopPropagation(); onEdit(project); });

    const delBtn = document.createElement('button');
    delBtn.classList.add('btn','danger');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', (e) => { e.stopPropagation(); onDelete(project.id); });

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    container.appendChild(left);
    container.appendChild(actions);

    projectsDiv.appendChild(container);
    // if this project is selected, show its todos nested (compact)
    if (project.id === selectedId) {
      const nested = document.createElement('div');
      nested.classList.add('project-todos');
      project.todos.forEach(todo => {
        const tr = document.createElement('div');
        tr.classList.add('project-todo-row');

        const left = document.createElement('div');
        left.classList.add('project-todo-left');

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = !!todo.completed;
        cb.addEventListener('change', (e) => { e.stopPropagation(); onToggleTodo(project.id, todo.id); });

        const tspan = document.createElement('span');
        tspan.classList.add('project-todo-title');
        tspan.textContent = `${todo.title} (${todo.priority})`;
        if (todo.completed) tspan.classList.add('completed');

        left.appendChild(cb);
        left.appendChild(tspan);

        const a = document.createElement('div');
        a.classList.add('project-todo-actions');

        const ebtn = document.createElement('button');
        ebtn.classList.add('btn');
        ebtn.textContent = 'e';
        ebtn.title = 'Edit todo';
        ebtn.addEventListener('click', (ev) => { ev.stopPropagation(); onEditTodo(project.id, todo); });

        const dbtn = document.createElement('button');
        dbtn.classList.add('btn','danger');
        dbtn.textContent = 'x';
        dbtn.title = 'Delete todo';
        dbtn.addEventListener('click', (ev) => { ev.stopPropagation(); onDeleteTodo(project.id, todo.id); });

        a.appendChild(ebtn);
        a.appendChild(dbtn);

        tr.appendChild(left);
        tr.appendChild(a);
        nested.appendChild(tr);
      });

      projectsDiv.appendChild(nested);
    }
  });
};

export { renderProjects };
