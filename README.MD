# Stock Data Fetcher App

This project consists of two parts: a client-side application built with React and a server-side application built with Node.js and Express. The purpose of this application is to fetch stock data of a particular stock for a specific date using the Polygon API and display the required details on the frontend.

## Server

### API Endpoint

The server exposes a POST route at `/api/fetchStockData`. This API endpoint is responsible for fetching stock data for a particular stock on a specific date from the Polygon API (Ref: https://polygon.io/docs/stocks/get_v1_open-close__stocksticker___date).

#### Request

- Method: POST
- Route: `/api/fetchStockData`
- Body:
  - `symbol`: The stock symbol to fetch stock data for (e.g., AAPL, GOOGL, TSLA).
  - `date`: The date for which stock data are to be fetched (in the format YYYY-MM-DD).

#### Response

The API will return a JSON response with the required stock data fields:

- `Open`: The opening price of the stock for the given date.
- `High`: The highest price of the stock on the given date.
- `Low`: The lowest price of the stock on the given date.
- `Close`: The closing price of the stock for the given date.
- `Volume`: The trading volume of the stock for the given date.

The response will include relevant response codes to handle various edge cases, such as missing parameters or errors fetching the data.

## Client

The client-side application is built with React and allows users to interact with the server API to fetch and display the stock data for a particular stock on a selected date.

### User Interface

The client provides a simple user interface with the following components:

- Stock Symbol Input: Allows users to input the symbol of the stock they want to fetch stock data for.
- Date Picker: Allows users to select a specific date for which they want to view stock data.
- Submit Button: Users can click this button to initiate the request to the server API and display the stock data.

Upon submitting the form, the client sends a request to the server API and waits for the response. Once the data is received, the required stock data (Open, High, Low, Close, Volume) will be displayed on the frontend with a Bar Chart.

## How to Run the Application

1. Go to the `server` folder and run the Node.js server using the following command:
   ```
   npm install
   node app.js
   ```
   This will start the server and expose the API at `http://localhost:5000/api/fetchStockData`.

2. Go to the `client` folder and run the React app using the following command:
   ```
   npm install
   npm start
   ```
   This will start the React app and open it in your default web browser at `http://localhost:3000`. You should see the form screen initially.

3. In the React app, fill in the Stock Symbol and select a Date using the Date Picker.

4. Click the Submit button to fetch the stock data for the specified stock on the selected date.

5. The required details (Open, High, Low, Close, Volume) will be displayed on the frontend once the data is retrieved from the server.

