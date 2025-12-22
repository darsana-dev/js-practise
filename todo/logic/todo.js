export const createTodo = (title, description, dueDate, priority) => {
    return {
        id: Date.now().toString(),
        title:title,
        description:description,
        dueDate:dueDate,
        priority:priority,
        completed:false
    };
};