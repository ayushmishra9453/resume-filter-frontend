import logo from './logo.svg';
import './App.css';
import UploadForm from './components/UploadForm';
import Search from './components/Search';
import MultipleUpload from './components/MultipleUpload';
function App() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Resume Filter</h1>
        {/* <UploadForm /> */}
        <MultipleUpload />
        <div className="my-6" />
        <Search />
      </div>
    </div>
  );
}

export default App;
