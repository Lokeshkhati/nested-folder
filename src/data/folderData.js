const data = {
    id: 1,
    name: "root",
    isFolder: true,
    items: [
        {
            id: 2,
            name: "public",
            isFolder: true,
            items: [{ id: 3, name: "index.html", isFolder: false }]
        },
        {
            id: 4,
            name: "src",
            isFolder: true,
            items: [
                {
                    id: 7,
                    name: "componentss",
                    isFolder: true,
                    items: [
                        { id: 8, name: "Home.js", isFolder: false },
                        { id: 9, name: "Login.js", isFolder: false }
                    ]
                },
                { id: 10, name: "App.js", isFolder: false },
                { id: 11, name: "index.js", isFolder: false },
                { id: 12, name: "data.js", isFolder: false }
            ]
        },
        {
            id: 13,
            name: "package.json",
            isFolder: false
        }
    ]
};

export { data };
