export const getFolderExtenion = (fileName) => {
    let arr = fileName.split(".");
    return arr[arr.length - 1].toLowerCase();
};
