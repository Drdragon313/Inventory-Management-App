import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SummaryCards from "../../components/summary-cards/SummaryCards";
import OrdersSalesChart from "../../components/order-sales-chart/OrdersSalesChart";
import RevenueByCategory from "../../components/revenue-by-category/RevenueByCategory";
import InventoryTrendsChart from "../../components/trends-chart/InventoryTrendsChart";
import Filters from "../../components/filters/Filters";
import { setProducts } from "../../features/productSlice";

export default function Dashboard() {
	const [filters, setFilters] = useState({ category: "all", range: "monthly" });
	const [data, setData] = useState(null);
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.products);

	useEffect(() => {
		const processData = () => {
			if (!products || products.length === 0) return;

			const filteredProducts =
				filters.category === "all"
					? products
					: products.filter(
							(p) =>
								(p.category || "").toLowerCase() ===
								filters.category.toLowerCase()
					  );

			const summary = {
				totalOrders: filteredProducts.length,
				totalRevenue: filteredProducts.reduce(
					(sum, product) =>
						sum + (product.total || product.price * product.quantity),
					0
				)
			};

			const now = new Date();
			let daysToSubtract = 0;

			switch (filters.range) {
				case "daily":
					daysToSubtract = 1;
					break;
				case "weekly":
					daysToSubtract = 7;
					break;
				case "monthly":
					daysToSubtract = 30;
					break;
				case "annually":
					daysToSubtract = 365;
					break;
				default:
					daysToSubtract = 30;
			}

			const ordersSales = Array.from({ length: daysToSubtract }, (_, i) => {
				const date = new Date(now);
				date.setDate(date.getDate() - i);
				const dateStr = date.toISOString().split("T")[0];

				const dailyProducts = filteredProducts.filter(
					() => Math.random() > 0.7
				);

				return {
					date: dateStr,
					orders: dailyProducts.length,
					sales: dailyProducts.reduce(
						(sum, p) => sum + (p.total || p.price * p.quantity),
						0
					)
				};
			}).reverse();

			const categories = [
				...new Set(filteredProducts.map((p) => p.category || "Uncategorized"))
			];

			const revenueByCategory = categories.map((category) => ({
				category,
				revenue: filteredProducts
					.filter((p) => (p.category || "Uncategorized") === category)
					.reduce((sum, p) => sum + (p.total || p.price * p.quantity), 0)
			}));

			const inventoryTrends = filteredProducts.map((product, index) => ({
				date: new Date(Date.now() - index * 86400000)
					.toISOString()
					.split("T")[0],
				stock: product.quantity
			}));

			setData({
				summary,
				ordersSales,
				revenueByCategory,
				inventoryTrends,
				products: filteredProducts.map((p) => ({
					id: p.id,
					title: p.title,
					price: p.price,
					quantity: p.quantity,
					total: p.total || p.price * p.quantity,
					category: p.category || "Uncategorized",
					...p
				}))
			});
		};

		processData();
	}, [products, filters]);

	useEffect(() => {
		const fetchProducts = async () => {
			if (!products || products.length === 0) {
				try {
					const res = await fetch("https://dummyjson.com/products");
					const result = await res.json();

					const allProducts = result.products.flatMap((p) => p);

					const enrichedProducts = allProducts.map((p) => ({
						...p,
						id: p.id + "-" + Math.random().toString(36).substring(2, 9),
						quantity: p.quantity || Math.floor(Math.random() * 10) + 1,
						total: p.total || p.price * (p.quantity || 1),
						category: p.category || "Uncategorized"
					}));

					dispatch(setProducts(enrichedProducts));
				} catch (error) {
					console.error("Failed to fetch products:", error);
				}
			}
		};

		fetchProducts();
	}, [dispatch, products]);

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-between md:flex-row-reverse gap-4 bg-white p-4 rounded-xl shadow">
				<Filters filters={filters} setFilters={setFilters} />
				<SummaryCards data={data?.summary} />
			</div>

			<OrdersSalesChart data={data?.ordersSales} />
			<RevenueByCategory data={data?.revenueByCategory} />
			<InventoryTrendsChart data={data?.inventoryTrends} />
		</div>
	);
}
