
import { renderProjects } from "./ui/renderProjects.js";
import { renderTodos } from "./ui/renderTodos.js";
import {
  inApp,
  addproject,
  getprojects,
  addTodotoProject,
  editProject,
  deleteProject,
  editTodo,
  deleteTodo,
  toggleTodoComplete,
  getProjectById,
} from "./logic/app.js";

inApp();

let selectedProjectId = null;

const projects = getprojects();

const updateProjectStats = () => {
  const stats = document.getElementById('project-stats');
  const count = projects.length;
  const lastCreated = projects.reduce((acc, p) => (p.createdAt > acc ? p.createdAt : acc), '');
  stats.textContent = `Projects: ${count}` + (lastCreated ? ` — last created: ${new Date(lastCreated).toLocaleString()}` : '');
};

const selectProject = (project) => {
  selectedProjectId = project.id;
  renderProjects(projects, selectedProjectId, selectProject, onEditProject, onDeleteProject);
  renderTodos(project, onEditTodo, onDeleteTodo, onToggleTodo);
};

const onEditProject = (project) => {
  const name = prompt('Rename project', project.name);
  if (!name) return;
  editProject(project.id, name.trim());
  renderProjects(projects, selectedProjectId, selectProject, onEditProject, onDeleteProject);
  updateProjectStats();
};

const onDeleteProject = (projectId) => {
  if (!confirm('Delete this project?')) return;
  deleteProject(projectId);
  if (selectedProjectId === projectId) selectedProjectId = null;
  renderProjects(projects, selectedProjectId, selectProject, onEditProject, onDeleteProject);
  renderTodos(null, onEditTodo, onDeleteTodo, onToggleTodo);
  updateProjectStats();
};

const onEditTodo = (projectId, todo) => {
  const newTitle = prompt('Edit todo title', todo.title);
  if (!newTitle) return;
  const newPriority = prompt('Edit priority (Low, Medium, High)', todo.priority) || todo.priority;
  editTodo(projectId, todo.id, { title: newTitle.trim(), priority: newPriority });
  const p = getProjectById(projectId);
  renderTodos(p, onEditTodo, onDeleteTodo, onToggleTodo);
};

const onDeleteTodo = (projectId, todoId) => {
  if (!confirm('Delete this todo?')) return;
  deleteTodo(projectId, todoId);
  const p = getProjectById(projectId);
  renderTodos(p, onEditTodo, onDeleteTodo, onToggleTodo);
};

const onToggleTodo = (projectId, todoId) => {
  toggleTodoComplete(projectId, todoId);
  const p = getProjectById(projectId);
  renderTodos(p, onEditTodo, onDeleteTodo, onToggleTodo);
};

// initial render
renderProjects(projects, selectedProjectId, selectProject, onEditProject, onDeleteProject, onEditTodo, onDeleteTodo, onToggleTodo);
updateProjectStats();

document.getElementById("add-project").addEventListener("click", () => {
  const input = document.getElementById("project-name");
  const name = input.value.trim();
  if (!name) return;

  const newProject = addproject(name);
  input.value = "";
  selectedProjectId = newProject.id;
  renderProjects(projects, selectedProjectId, selectProject, onEditProject, onDeleteProject, onEditTodo, onDeleteTodo, onToggleTodo);
  selectProject(newProject);
  updateProjectStats();
});

document.getElementById("add-todo").addEventListener("click", () => {
  const titleInput = document.getElementById("todo-title");
  const priorityInput = document.getElementById("todo-priority");
  const title = titleInput.value.trim();
  const priority = priorityInput.value;
  if (!title) return;
  if (!selectedProjectId) {
    alert("Please select a project first.");
    return;
  }

  addTodotoProject(selectedProjectId, title, "", "", priority);
  const project = projects.find(p => p.id === selectedProjectId);
  renderTodos(project, onEditTodo, onDeleteTodo, onToggleTodo);
  titleInput.value = "";
  renderProjects(projects, selectedProjectId, selectProject, onEditProject, onDeleteProject, onEditTodo, onDeleteTodo, onToggleTodo);
});
