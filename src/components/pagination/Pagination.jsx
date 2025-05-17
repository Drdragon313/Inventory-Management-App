export default function Pagination({ currentPage, totalPages, onPageChange }) {
	const goToPage = (page) => {
		if (page < 1 || page > totalPages) return;
		onPageChange(page);
	};

	const renderPageButtons = () => {
		if (totalPages <= 5) {
			return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
				<button
					key={page}
					onClick={() => goToPage(page)}
					className={`min-w-[2rem] px-2 py-1 border rounded text-sm sm:text-base ${
						currentPage === page
							? "bg-blue-500 text-white"
							: "hover:bg-gray-100"
					}`}
				>
					{page}
				</button>
			));
		}

		const buttons = [];

		buttons.push(
			<button
				key={1}
				onClick={() => goToPage(1)}
				className={`min-w-[2rem] px-2 py-1 border rounded text-sm sm:text-base ${
					currentPage === 1 ? "bg-blue-500 text-white" : "hover:bg-gray-100"
				}`}
			>
				1
			</button>
		);

		if (currentPage > 3) {
			buttons.push(
				<span key="start-ellipsis" className="px-1 sm:px-2">
					...
				</span>
			);
		}

		const startPage = Math.max(2, currentPage - 1);
		const endPage = Math.min(totalPages - 1, currentPage + 1);

		for (let page = startPage; page <= endPage; page++) {
			buttons.push(
				<button
					key={page}
					onClick={() => goToPage(page)}
					className={`min-w-[2rem] px-2 py-1 border rounded text-sm sm:text-base ${
						currentPage === page
							? "bg-blue-500 text-white"
							: "hover:bg-gray-100"
					}`}
				>
					{page}
				</button>
			);
		}

		if (currentPage < totalPages - 2) {
			buttons.push(
				<span key="end-ellipsis" className="px-1 sm:px-2">
					...
				</span>
			);
		}

		buttons.push(
			<button
				key={totalPages}
				onClick={() => goToPage(totalPages)}
				className={`min-w-[2rem] px-2 py-1 border rounded text-sm sm:text-base ${
					currentPage === totalPages
						? "bg-blue-500 text-white"
						: "hover:bg-gray-100"
				}`}
			>
				{totalPages}
			</button>
		);

		return buttons;
	};

	return (
		<div className="flex items-center justify-center flex-wrap gap-2">
			<button
				onClick={() => goToPage(currentPage - 1)}
				className="px-3 py-1 border rounded text-sm sm:text-base disabled:opacity-50 hover:bg-gray-100"
				disabled={currentPage === 1}
			>
				Prev
			</button>

			<div className="flex items-center gap-1 sm:gap-2">
				{renderPageButtons()}
			</div>

			<button
				onClick={() => goToPage(currentPage + 1)}
				className="px-3 py-1 border rounded text-sm sm:text-base disabled:opacity-50 hover:bg-gray-100"
				disabled={currentPage === totalPages}
			>
				Next
			</button>
		</div>
	);
}
