import { useRef, useState } from 'react';
import CustomButton from '../components/CustomButton';
import { DateRangePicker } from 'rsuite';
import api from '../api';
import { getToken } from '../helpers/localStorage';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const AnalyticPage = () => {
	// const [startDate, setStartDate] = useState('');
	// const [endDate, setEndDate] = useState('');
	const tableRef = useRef(null);
	const [rangeDates, setRangeDates] = useState<string[]>([]);
	const [analyticDatas, setAnalyticDatas] = useState<
		{ scope: string; count: number }[][]
	>([]);
	const [scopes, setScopes] = useState<Set<string>>(new Set());

	// console.log(startDate, endDate);

	console.log(analyticDatas);
	console.log(scopes);

	// const onSetDate = (startDate: string, endDate: string) => {};
	const getTotalCount = (scope: string): number => {
		let total = 0;
		analyticDatas.forEach((data) => {
			const count = data.find((el) => el.scope === scope)?.count;
			if (count) total += count;
			return total;
		});
		return total;
	};

	return (
		<div className="w-full min-h-screen flex flex-col p-10 bg-cyan-500">
			<div className="w-full p-4 flex justify-between items-center bg-cyan-300">
				<h1 className="text-3xl font-bold">Analytic Reports</h1>
				<div className="w-max">
					<DownloadTableExcel
						filename="users table"
						sheet="users"
						currentTableRef={tableRef.current}
					>
						<CustomButton value="Export Report" />
					</DownloadTableExcel>
				</div>
			</div>
			<div className="w-full h-20 ps-4 flex items-center bg-cyan-200">
				<div className="flex items-center gap-4">
					<p className="text-lg font-medium">Filter</p>
					<DateRangePicker
						onChange={(e) => {
							if (e?.length) {
								const startDate = e[0];
								const endDate = e[1];
								// setStartDate(startDate);
								// setEndDate(endDate);
								const dates = [];
								while (startDate <= endDate) {
									dates.push(startDate.toISOString().split('T')[0]);
									startDate.setDate(startDate.getDate() + 1);
								}

								setAnalyticDatas([]);
								setRangeDates(dates);
								// const datas: { scope: string; count: number }[][] = [];
								dates.forEach(async (date) => {
									try {
										const { data } = await api.get(
											`/analytic/click?listing_date=${date}`,
											{
												headers: {
													Authorization: `Bearer ${getToken()}`,
												},
											}
										);
										// datas.push(data);
										if (!scopes.size) {
											const scopes: Set<string> = new Set(
												data.map(
													(el: { scope: string; count: number }) => el.scope
												)
											);
											setScopes(scopes);
										}
										setAnalyticDatas((prev) => {
											return [...prev, data];
										});
										// console.log(datas);
										// console.log(data, 'analytic from server');
									} catch (error) {
										console.log(error);
										console.log(error.response.data.detail);
									}
								});
								// console.log(analyticDatas);
							}
						}}
					/>
				</div>
			</div>

			<div className="relative overflow-x-auto">
				<table
					ref={tableRef}
					className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
				>
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Item
							</th>
							<th scope="col" className="px-6 py-3">
								Total
							</th>
							{Boolean(rangeDates.length) &&
								rangeDates.map((data, index) => {
									return (
										<th key={index} scope="col" className="px-6 py-3">
											{new Date(data).getDate()}
										</th>
									);
								})}
						</tr>
					</thead>
					<tbody>
						{Boolean(scopes.size) &&
							Array.from(scopes).map((scope, index) => {
								return (
									<tr
										key={index}
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
									>
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											{scope}
										</th>
										<td>{getTotalCount(scope)}</td>
										{Boolean(analyticDatas.length) &&
											analyticDatas.map((data, index) => {
												return (
													<td key={index} className="px-6 py-4">
														{data.find((el) => el.scope === scope)?.count}
													</td>
												);
											})}
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AnalyticPage;
