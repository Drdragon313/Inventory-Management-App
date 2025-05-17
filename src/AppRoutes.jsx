import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Inventory from "./pages/inventory-management/Inventory";
import ProductRegistration from "./pages/product-registration/ProductRegistration";
import MainLayout from "./layout/MainLayout";

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<MainLayout />}>
			<Route index element={<Dashboard />} />
			<Route path="dashboard" element={<Dashboard />} />
			<Route path="inventory" element={<Inventory />} />
			<Route path="product-registration" element={<ProductRegistration />} />
		</Route>
	</Routes>
);

export default AppRoutes;
