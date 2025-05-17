import { NavLink } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
	return (
		<>
			<aside
				className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transition-transform transform lg:translate-x-0 ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				} lg:static lg:inset-auto lg:transform-none`}
			>
				<div className="p-4 font-bold text-xl border-b border-gray-700">
					Inventory Management
				</div>
				<nav className="p-4 space-y-2">
					<NavLink
						to="/dashboard"
						className={({ isActive }) =>
							`block p-2 hover:bg-gray-700 rounded ${
								isActive ? "bg-gray-700 font-medium" : ""
							}`
						}
						end
					>
						Dashboard
					</NavLink>
					<NavLink
						to="/inventory"
						className={({ isActive }) =>
							`block p-2 hover:bg-gray-700 rounded ${
								isActive ? "bg-gray-700 font-medium" : ""
							}`
						}
					>
						Inventory
					</NavLink>
					<NavLink
						to="/product-registration"
						className={({ isActive }) =>
							`block p-2 hover:bg-gray-700 rounded ${
								isActive ? "bg-gray-700 font-medium" : ""
							}`
						}
					>
						Product Registration
					</NavLink>
				</nav>
			</aside>

			{sidebarOpen && (
				<div
					className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}
		</>
	);
}
