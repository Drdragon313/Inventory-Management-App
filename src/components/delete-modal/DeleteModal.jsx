import { useDispatch } from "react-redux";
import { deleteProduct } from "../../features/productSlice";
import toast from "react-hot-toast";

export default function DeleteProductModal({ product, onClose }) {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteProduct(product.id));
		onClose();
		toast.success("Product deleted successfully!");
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
			<div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
				<h2 className="text-lg font-semibold mb-4">Delete Product</h2>
				<p className="mb-6">
					Are you sure you want to delete{" "}
					<strong>{product.title || product.name}</strong>?
				</p>
				<div className="flex justify-end space-x-2">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
					>
						Cancel
					</button>
					<button
						onClick={handleDelete}
						className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
