import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/productSlice";
import toast from "react-hot-toast";

export default function ProductRegistration() {
	const dispatch = useDispatch();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		price: "",
		quantity: "",
		image: ""
	});

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: files ? files[0] : value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			if (!formData.title.trim()) {
				throw new Error("Product name is required");
			}
			if (isNaN(formData.price) || formData.price <= 0) {
				throw new Error("Please enter a valid price");
			}
			if (isNaN(formData.quantity) || formData.quantity < 0) {
				throw new Error("Please enter a valid quantity");
			}

			const newProduct = {
				...formData,
				price: parseFloat(formData.price),
				quantity: parseInt(formData.quantity),
				id: Date.now(),
				imageURL: formData.image || ""
			};

			dispatch(addProduct(newProduct));

			setFormData({
				title: "",
				description: "",
				price: "",
				quantity: "",
				image: ""
			});

			toast.success("Product added successfully!");
		} catch (error) {
			toast.error(error.message || "Failed to add product");
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 p-4 border-1 border-gray-200 rounded-lg bg-white shadow-md"
		>
			<h2 className="text-xl font-semibold">Register New Product</h2>

			<div>
				<label className="block text-sm font-medium">Product Name</label>
				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
					className="w-full border border-gray-500 p-2 rounded"
					required
				/>
			</div>

			<div>
				<label className="block text-sm font-medium ">Description</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					className="w-full border p-2 rounded border-gray-500"
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
						className="w-full border p-2 rounded border-gray-500"
						required
					/>
				</div>
				<div className="w-1/2">
					<label className="block text-sm font-medium">Initial quantity</label>
					<input
						type="number"
						name="quantity"
						value={formData.quantity}
						onChange={handleChange}
						className="w-full border p-2 rounded border-gray-500"
						required
					/>
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium">Product Image URL</label>
				<input
					type="url"
					name="image"
					onChange={handleChange}
					className="w-full border p-2 rounded border-gray-500"
					value={formData.image}
				/>
			</div>

			<button
				type="submit"
				className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
			>
				Add Product
			</button>
		</form>
	);
}
