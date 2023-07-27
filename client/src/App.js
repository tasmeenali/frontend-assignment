import React, { useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts';
import './styles.css';

const App = () => {
	const [symbol, setSymbol] = useState('');
	const [date, setDate] = useState('');
	const [stockData, setStockData] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post('http://localhost:5000/api/fetchStockData', null, {
				params: {
					symbol,
					date
				}
			});
			setStockData(response.data);
			setLoading(false);

		} catch (error) {
			console.log('Error fetching stock data:', error);
			setLoading(false);
		}
	};

	return (
		<div class="form-container">
			<h1>Stock Data Fetcher</h1>
			<form onSubmit={handleSubmit}>
				<div class="input-group">
					<label>
						Stock Symbol:
						<input
							id="symbol"
							type="text"
							value={symbol}
							onChange={(e) => setSymbol(e.target.value)}
							required
						/>
					</label>
					<br />
					<label>
						Date:
						<input
							id='date'
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							required
						/>
					</label>
					<br />
				</div>
				<button type="submit">Fetch Stock Data</button>
			</form>

			{loading && <p>Loading...</p>}

			{stockData && (
				<>
					<div class="result-container">

						<div>
							<BarChart
								xAxis={[
									{
										id: 'barCategories',
										data: ['Open', 'High', 'Low', 'Close'],
										scaleType: 'band',
									},
								]}
								series={[
									{
										data: [stockData?.open, stockData?.high, stockData?.low, stockData?.close],
									},
								]}
								width={500}
								height={500} />

						</div>
						<div class="stock-details">
							<h2>Stock Data</h2>
							<br />
							<p>Open: {stockData.open}</p>
							<p>High: {stockData.high}</p>
							<p>Low: {stockData.low}</p>
							<p>Close: {stockData.close}</p>
							<p>Volume: {stockData.volume}</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default App;
