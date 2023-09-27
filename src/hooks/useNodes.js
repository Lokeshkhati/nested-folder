const useNodes = () => {
    const insertNodes = (tree, id, value, isFolder) => {
        if (tree.id === id) {
            const newNode = {
                id: Math.floor(Math.random() * 1345),
                name: value,
                isFolder,
                items: []
            };
            return { ...tree, items: [...tree.items, newNode] };
        }
        const latestNode = tree?.items?.map((item) => {
            console.log("recursive call inside insert Node");
            return insertNodes(item, id, value, isFolder);
        });
        return { ...tree, items: latestNode };
    };

    const editNode = (tree, id, value) => {
        if (tree.id === id) {
            tree.name = value;
            return tree;
        }
        tree?.items?.map((item) => editNode(item, id, value));
        return { ...tree };
    };

    const deleteNode = (tree, id) => {
        for (let i = 0; i < tree?.items?.length; i++) {
            const item = tree.items[i];
            if (item.id === id) {
                tree.items.splice(i, 1);
                return tree;
            } else {
                deleteNode(item, id);
            }
        }
        return tree;
    };

    return { insertNodes, editNode, deleteNode };
};

export { useNodes };
