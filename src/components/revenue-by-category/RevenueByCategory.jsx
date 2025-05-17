import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer
} from "recharts";

const RevenueByCategory = ({ data }) => {
	if (!data || data.length === 0) return null;

	return (
		<div className="bg-white p-12 rounded-xl shadow h-96">
			<h2 className="text-lg font-semibold mb-4">Revenue by Category</h2>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data} layout="vertical" margin={{ left: 50 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis type="number" />
					<YAxis type="category" dataKey="category" />
					<Tooltip />
					<Bar dataKey="revenue" fill="#6366f1" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default RevenueByCategory;
