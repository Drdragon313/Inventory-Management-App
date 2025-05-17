const Filters = ({ filters, setFilters }) => {
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFilters((prev) => ({ ...prev, [name]: value }));
	};
	console.log(filters);
	return (
		<div className="flex flex-col md:flex-row gap-4">
			<div className="flex-1">
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Category
				</label>
				<select
					name="category"
					value={filters.category}
					onChange={handleChange}
					className="w-full border border-gray-300 rounded-md px-3 py-2"
				>
					<option value="all">All</option>
					<option value="beauty">Beauty</option>
					<option value="fragrances">Fragrances</option>
					<option value="groceries">Groceries</option>
					<option value="furniture">Furniture</option>
					furniture
				</select>
			</div>
			<div className="flex-1">
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Date Range
				</label>
				<select
					name="range"
					value={filters.range}
					onChange={handleChange}
					className="w-full border border-gray-300 rounded-md  px-3 py-2"
				>
					<option value="daily">Daily</option>
					<option value="weekly">Weekly</option>
					<option value="monthly">Monthly</option>
					<option value="annually">Annually</option>
				</select>
			</div>
		</div>
	);
};

export default Filters;
