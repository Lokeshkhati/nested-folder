import { useState } from "react";
import { getFolderExtenion } from "../utils";
import Icon from "./Icon";
export default function Folder({
    files,
    handleInsertNode,
    handleEditNode,
    handleDeleteNode
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [isFolder, setIsFolder] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [renameValue, setRenameValue] = useState(files.name);
    const [value, setValue] = useState("");

    const hanldeFile = (event) => {
        event.stopPropagation();
        setIsFolder(false);
        setShowInput(true);
        setIsExpanded(true);
    };

    const hanldeFolder = (event) => {
        event.stopPropagation();
        setIsFolder(true);
        setShowInput(true);
        setIsExpanded(true);
    };

    const handleBlur = () => {
        setShowInput(false);
        setValue("");
    };
    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleAddNewFile = (event, id) => {
        // event.stopPropagation();
        if (event.keyCode === 13 && value) {
            handleInsertNode(id, value, isFolder);
            setShowInput(false);
            setValue("");
        }
    };

    const handleRemoveNode = (event, id) => {
        event.stopPropagation();
        handleDeleteNode(id);
    };
    const handleRename = (event, id) => {
        if (event.keyCode === 13 && renameValue) {
            handleEditNode(id, renameValue);
            setIsEditing(false);
        }
    };

    return (
        <div>
            {files?.isFolder ? (
                <div className="container">
                    <div
                        className="folder"
                        onClick={() => setIsExpanded(!isExpanded)}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <div
                            style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
                        >
                            <span role="img" aria-label="folder-img">
                                📁
                            </span>
                            {isEditing && files.id !== 1 ? (
                                <input
                                    value={renameValue}
                                    onKeyDown={(event) => handleRename(event, files.id)}
                                    onChange={(event) => setRenameValue(event.target.value)}
                                    onBlur={() => {
                                        setIsEditing(false);
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <span>{files.name}</span>
                            )}
                        </div>

                        {isHovering && !isEditing && (
                            <div>
                                {files.id !== 1 && (
                                    <button onClick={handleEdit}>
                                        <span role="img" aria-label="pen-img">
                                            ✏️
                                        </span>
                                    </button>
                                )}

                                <button onClick={hanldeFile}>
                                    <span role="img" aria-label="file-img">
                                        📄
                                    </span>
                                </button>
                                <button onClick={hanldeFolder}>
                                    <span role="img" aria-label="folder-img">
                                        📁
                                    </span>
                                </button>
                                {files.id !== 1 && (
                                    <button
                                        onClick={(event) => handleRemoveNode(event, files.id)}
                                    >
                                        <span role="img" aria-label="folder-img">
                                            ✖️
                                        </span>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <div
                        style={{
                            display: isExpanded ? "block" : "none",
                            paddingLeft: "1rem"
                        }}
                    >
                        {showInput && (
                            <div>
                                <span>{isFolder ? "📁" : "📄"} </span>
                                <input
                                    value={value}
                                    onKeyDown={(event) => handleAddNewFile(event, files.id)}
                                    onChange={(event) => setValue(event.target.value)}
                                    autoFocus
                                    onBlur={handleBlur}
                                />
                            </div>
                        )}
                        {files?.items?.map((file) => (
                            <Folder
                                key={file?.id}
                                files={file}
                                handleInsertNode={handleInsertNode}
                                handleEditNode={handleEditNode}
                                handleDeleteNode={handleDeleteNode}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div
                    className="folder"
                    style={{ display: "flex" }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: ".5rem",
                            paddingLeft: "4px",
                            alignItems: "center"
                        }}
                    >
                        <Icon extension={getFolderExtenion(files?.name)} />
                        {isEditing && files.id !== 1 ? (
                            <input
                                value={renameValue}
                                onKeyDown={(event) => handleRename(event, files.id)}
                                onChange={(event) => setRenameValue(event.target.value)}
                                onBlur={() => {
                                    setIsEditing(false);
                                }}
                                autoFocus
                            />
                        ) : (
                            <span>{files.name}</span>
                        )}
                    </div>
                    {isHovering && (
                        <>
                            <button onClick={handleEdit}>
                                <span role="img" aria-label="pen-img">
                                    ✏️
                                </span>
                            </button>
                            <button onClick={(event) => handleRemoveNode(event, files.id)}>
                                <span role="img" aria-label="folder-img">
                                    ✖️
                                </span>
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

// TODO : on creating file or folder place that item in array alphabetically
