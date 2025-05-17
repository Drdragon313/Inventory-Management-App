import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/TopBar";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Main content */}
			<div className="flex flex-col flex-1 w-full">
				<Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<main className="flex-1 overflow-y-auto p-4 bg-gray-100">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
