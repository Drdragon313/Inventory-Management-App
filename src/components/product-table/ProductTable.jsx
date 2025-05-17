import { useState } from "react";
import EditProductModal from "../edit-product-modal/EditProductModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import DeleteModal from "../delete-modal/DeleteModal";
import Pagination from "../pagination/Pagination";
export default function ProductTable({ products }) {
	const [sortKey, setSortKey] = useState("title");
	const [sortAsc, setSortAsc] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [editingProduct, setEditingProduct] = useState(null);
	const [deletingProduct, setDeletingProduct] = useState(null);

	const itemsPerPage = 6;
	const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);
	const lowInventoryThreshold = 5;
	console.log(products);
	const sorted = [...products].sort((a, b) => {
		if (sortKey === "title") {
			return sortAsc
				? a?.title?.localeCompare(b.title)
				: b?.title?.localeCompare(a.title);
		}
		return sortAsc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
	});

	const paginated = sorted.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const toggleSort = (key) => {
		if (sortKey === key) setSortAsc(!sortAsc);
		else {
			setSortKey(key);
			setSortAsc(true);
		}
	};

	return (
		<div className="overflow-x-auto bg-white shadow-md rounded-lg">
			<table className="min-w-full table-auto text-left">
				<thead className="bg-gray-200">
					<tr>
						<th
							className="p-3 cursor-pointer"
							onClick={() => toggleSort("title")}
						>
							Product
						</th>
						<th
							className="p-3 cursor-pointer"
							onClick={() => toggleSort("price")}
						>
							Price
						</th>
						<th className="p-3">Quantity</th>
						<th className="p-3">Edit</th>
						<th className="p-3">Alerts</th>
						<th className="p-3">Delete</th>
					</tr>
				</thead>
				<tbody>
					{paginated.map((p) => (
						<tr key={p.id} className="border-b hover:bg-gray-50">
							<td className="p-3 flex items-center gap-3">
								<img
									src={p.thumbnail || p.imageURL}
									alt={p.title || p.name}
									className="w-12 h-12 object-cover rounded"
								/>
								{p.title || p.name}
							</td>
							<td className="p-3">${p.price.toFixed(2)}</td>
							<td className="p-3">{p.quantity}</td>
							<td className="p-3">
								<button
									onClick={() => setEditingProduct(p)}
									className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
								>
									Edit
								</button>
							</td>
							<td className="p-3 text-sm text-red-600 font-medium">
								{(p.quantity ?? p.stock) < lowInventoryThreshold &&
									"Low stock!"}
							</td>
							<td className="p-3 ">
								<button
									onClick={() => setDeletingProduct(p)}
									className="text-red-500 hover:text-red-700"
									title="Delete product"
								>
									<TrashIcon className="h-5 w-5" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="flex justify-between items-center px-4 py-3 gap-4">
				<div className="text-sm text-gray-600 text-nowrap">
					Page {currentPage} of {totalPages}
				</div>
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
				/>
			</div>

			{editingProduct && (
				<EditProductModal
					product={editingProduct}
					onClose={() => setEditingProduct(null)}
				/>
			)}
			{deletingProduct && (
				<DeleteModal
					product={deletingProduct}
					onClose={() => setDeletingProduct(null)}
					isOpen={deletingProduct}
				/>
			)}
		</div>
	);
}
