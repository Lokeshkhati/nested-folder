import Folder from './components/Folder'
import { data } from './data/folderData'
const App = () => {
  console.log(data);
  return <Folder key={data?.id} files={data} />
}
export default App
