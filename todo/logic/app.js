import {createProject} from './project.js';
import { createTodo } from "./todo.js";
let projects=[];
function inApp() {
    projects = [createProject("NEW project")];

}

const addproject = (name) => {
    const newproject=createProject(name);
    projects.push(newproject);
    return newproject;
};
const addTodotoProject= (projectId,title,description,dueDate,priority) => {
    const project = projects.find(proj => proj.id === projectId);
    if (!project) {
        throw new Error("Project not found");
    }
    const todo = createTodo(title,description,dueDate,priority);
    project.todos.push(todo);
    return todo;
}



const getprojects = () => {
    return projects;
};

export { inApp, addproject, getprojects, addTodotoProject };
