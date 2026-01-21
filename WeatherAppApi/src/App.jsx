import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchView from "./views/SearchView";
import SavedView from "./views/SavedView";
import SettingsView from "./views/SettingsView";

function App() {


	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<SearchView />} />
				<Route path="/saved" element={<SavedView />} />
				<Route path="/settings" element={<SettingsView />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;
