import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../features/productSlice";
import toast from "react-hot-toast";

export default function EditProductModal({ product, onClose, onSave }) {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		price: "",
		quantity: "",
		imageURL: ""
	});

	useEffect(() => {
		if (product) {
			setFormData({
				title: product.title || product.title || "",
				description: product.description || "",
				price: product.price || "",
				quantity: product.quantity ?? product.quantity ?? "",
				imageURL: product.imageURL || product.thumbnail || ""
			});
		}
	}, [product]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const updatedProduct = {
			...product,
			title: formData.title,
			description: formData.description,
			price: parseFloat(formData.price),
			quantity: parseInt(formData.quantity),
			imageURL: formData.imageURL
		};

		dispatch(updateProduct(updatedProduct));
		onSave && onSave(updatedProduct);
		onClose();
		toast.success("Product updated successfully!");
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
			<div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
				<h2 className="text-xl font-semibold mb-4">Edit Product</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium">Name</label>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							className="w-full border p-2 rounded"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium">Description</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							className="w-full border p-2 rounded"
							required
						/>
					</div>
					<div className="flex space-x-4">
						<div className="w-1/2">
							<label className="block text-sm font-medium">Price</label>
							<input
								type="number"
								name="price"
								value={formData.price}
								onChange={handleChange}
								className="w-full border p-2 rounded"
								required
							/>
						</div>
						<div className="w-1/2">
							<label className="block text-sm font-medium">quantity</label>
							<input
								type="number"
								name="quantity"
								value={formData.quantity}
								onChange={handleChange}
								className="w-full border p-2 rounded"
								required
							/>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium">Image URL</label>
						<input
							type="text"
							name="imageURL"
							value={formData.imageURL}
							onChange={handleChange}
							className="w-full border p-2 rounded"
						/>
					</div>
					<div className="flex justify-end space-x-2">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
						>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
