import { data } from "./data/foldersData";
import Folder from "./components/Folder";
import { useEffect, useState } from "react";
import { useNodes } from "./hooks/useNodes";

export default function App() {
  const localData = JSON.parse(localStorage.getItem("data"));
  const [folder, setFolder] = useState(localData || data);
  const { insertNodes, deleteNode, editNode } = useNodes();

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(folder));
  }, [folder]);

  const handleInsertNode = (id, value, isFolder) => {
    const finalStructure = insertNodes(folder, id, value, isFolder);
    setFolder(finalStructure);
  };
  const handleEditNode = (id, value) => {
    const finalStructure = editNode(folder, id, value);
    setFolder(finalStructure);
  };
  const handleDeleteNode = (id) => {
    const finalStructure = deleteNode(folder, id);
    const temp = { ...finalStructure };
    setFolder(temp);
  };

  // const getFolderExtension = (fileName) => {
  //   let arr = fileName.split(".");
  //   return arr[arr.length - 1].toLowerCase();
  // };

  return (
    <div className="App">
      <Folder
        key={folder?.id}
        files={folder}
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
      />
    </div>
  );
}
