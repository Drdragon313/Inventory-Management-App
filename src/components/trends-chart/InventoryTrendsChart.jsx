import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer
} from "recharts";

const InventoryTrendsChart = ({ data }) => {
	if (!data || data.length === 0) return null;

	return (
		<div className="bg-white p-12 rounded-xl shadow h-96">
			<h2 className="text-lg font-semibold mb-4">Inventory Trends</h2>
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={data}>
					<defs>
						<linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#f97316" stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Area
						type="monotone"
						dataKey="stock"
						stroke="#f97316"
						fillOpacity={1}
						fill="url(#colorStock)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default InventoryTrendsChart;
