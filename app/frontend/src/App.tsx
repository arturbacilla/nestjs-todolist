import { IntlProvider } from "react-intl";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TasksProvider from "./context/TasksProvider";
import Login from "./pages/Login";
import Todo from "./pages/Todo";

function App() {
	return (
		<BrowserRouter>
			<IntlProvider locale="pt-BR" defaultLocale="pt-BR">
				<TasksProvider>
					<Routes>
						<Route path="/" element={<Todo />} />
						<Route path="/login" element={<Login />} />
						{/* <Route path="/404" element={<NotFound />} /> */}
						<Route path="*" element={<Navigate replace to="/404" />} />
					</Routes>
				</TasksProvider>
			</IntlProvider>
		</BrowserRouter>
	);
}

export default App;
