const Folder = ({ files }) => {
    console.log(files, 'files');
    return (
        <div>
            <p>{files?.name} </p>
            {
                files?.items?.map(file => <Folder files={file} />)
            }
        </div>
    )
}
export default Folder