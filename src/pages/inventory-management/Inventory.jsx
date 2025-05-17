import { useState } from "react";
import ProductTable from "../../components/product-table/ProductTable";
import { useSelector } from "react-redux";

const Inventory = () => {
	const products = useSelector((state) => state.products.products);
	const [search, setSearch] = useState("");
	const filtered = products.filter((p) =>
		p.title?.toLowerCase()?.includes(search.toLowerCase())
	);

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<input
				type="text"
				placeholder="Search products..."
				className="px-4 py-2 border border-gray-300 rounded mb-4 w-full max-w-md"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			<ProductTable products={filtered} />
		</div>
	);
};

export default Inventory;
