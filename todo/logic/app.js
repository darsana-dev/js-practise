import { createProject } from './project.js';
import { createTodo } from './todo.js';

const STORAGE_KEY = 'todo_app_v1';

let projects = [];

const save = () => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
        console.error('Failed to save to localStorage', e);
    }
};

const load = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        console.error('Failed to load from localStorage', e);
        return null;
    }
};

function inApp() {
    const data = load();
    if (data && Array.isArray(data) && data.length > 0) {
        projects = data;
    } else {
        projects = [createProject('Default Project')];
        save();
    }
}

const addproject = (name) => {
    const newproject = createProject(name);
    projects.push(newproject);
    save();
    return newproject;
};

const editProject = (projectId, newName) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) throw new Error('Project not found');
    project.name = newName;
    save();
    return project;
};

const deleteProject = (projectId) => {
    projects = projects.filter(p => p.id !== projectId);
    save();
};

const addTodotoProject = (projectId, title, description, dueDate, priority) => {
    const project = projects.find(proj => proj.id === projectId);
    if (!project) {
        throw new Error('Project not found');
    }
    const todo = createTodo(title, description, dueDate, priority);
    project.todos.push(todo);
    save();
    return todo;
};

const editTodo = (projectId, todoId, fields) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) throw new Error('Project not found');
    const todo = project.todos.find(t => t.id === todoId);
    if (!todo) throw new Error('Todo not found');
    Object.assign(todo, fields);
    save();
    return todo;
};

const deleteTodo = (projectId, todoId) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) throw new Error('Project not found');
    project.todos = project.todos.filter(t => t.id !== todoId);
    save();
};

const toggleTodoComplete = (projectId, todoId) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) throw new Error('Project not found');
    const todo = project.todos.find(t => t.id === todoId);
    if (!todo) throw new Error('Todo not found');
    todo.completed = !todo.completed;
    save();
    return todo;
};

const getprojects = () => {
    return projects;
};

const getProjectById = (projectId) => projects.find(p => p.id === projectId) || null;

export { inApp, addproject, getprojects, addTodotoProject, editProject, deleteProject, editTodo, deleteTodo, toggleTodoComplete, getProjectById };
