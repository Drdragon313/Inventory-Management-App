const SummaryCards = ({ data }) => (
	<div className="flex flex-col md:flex-row gap-4">
		<div className="bg-white p-4 rounded-xl shadow">
			<h3 className="text-gray-500">Total Orders</h3>
			<p className="text-2xl font-bold">{data?.totalOrders ?? 0}</p>
		</div>
		<div className="bg-white p-4 rounded-xl shadow">
			<h3 className="text-gray-500">Total Revenue</h3>
			<p className="text-2xl font-bold">
				${data?.totalRevenue?.toLocaleString() ?? 0}
			</p>
		</div>
	</div>
);

export default SummaryCards;
