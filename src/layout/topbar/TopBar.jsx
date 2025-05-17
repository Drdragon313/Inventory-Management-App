import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
export default function Topbar({ sidebarOpen, setSidebarOpen }) {
	const location = useLocation();
	const getPageTitle = () => {
		const path = location.pathname.split("/").filter(Boolean).pop();
		if (!path) return "Dashboard";

		return path
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	};
	return (
		<header className="flex items-center justify-between bg-white shadow px-4 py-4 sticky top-0 z-10">
			<button
				className="text-gray-700 lg:hidden"
				onClick={() => setSidebarOpen(!sidebarOpen)}
			>
				{sidebarOpen ? <X /> : <Menu />}
			</button>
			<div className="text-xl font-semibold">{getPageTitle()}</div>
		</header>
	);
}
