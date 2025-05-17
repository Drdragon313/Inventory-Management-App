import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend
} from "recharts";

const OrdersSalesChart = ({ data }) => {
	if (!data || data.length === 0) return null;

	return (
		<div className="bg-white p-4 rounded-xl shadow h-96">
			<h2 className="text-lg font-semibold mb-4">Orders & Sales Over Time</h2>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="orders" stroke="#3b82f6" />
					<Line type="monotone" dataKey="sales" stroke="#10b981" />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default OrdersSalesChart;
