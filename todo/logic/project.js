export const createProject = (name) => {
    return {
        id: Date.now().toString(),
        name: name,
        todos: [],
        createdAt: new Date().toISOString(),
    };
};