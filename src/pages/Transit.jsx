import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import styled from "styled-components";

const FETCH_INTERVAL = 5000;

const StyledContainer = styled.div`
	background-color: white;
	padding: 20px;
	font-family: Helvetica, Arial, sans-serif;
	color: black;
`;

const StyledRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${(props) => props.isClose ? '#00579e' : '#f9f9f9'};
	border: 1px solid #e0e0e0;
	margin-bottom: 5px;
	padding: 2px 10px 4px;
	font-size: 36px;
	color: ${(props) => props.isClose ? '#ecf274' : 'inherit'};
`;

const StyledCircle = styled.span`
	display: inline-block;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin-right: 10px;
	vertical-align: middle;
	position: relative;
	overflow: hidden;

	&::before,
	&::after {
		content: '';
		position: absolute;
		top: 0;
		width: 50%;
		height: 100%;
	}

	&::before {
		left: 0;
		background-color: ${(props) => props.colors[0]};
	}

	&::after {
		right: 0;
		background-color: ${(props) => props.colors[1] || props.colors[0]};
	}
`;

const StyledStation = styled.span`
	vertical-align: middle;
`;

const StyledTime = styled.span`
	padding: 2px 6px;
`;

const StyledBottomRow = styled.div`
	background-color: #00579e;
	height: 30px;
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0;
`;

const StyledCurrentTime = styled.span`
	background-color: #66b2ff;
	color: white;
	padding: 4px 10px;
	font-size: 15px;
	font-weight: bold;
	position: relative;
	&::after {
		content: "";
		position: absolute;
		top: 0;
		right: -10px;
		width: 0;
		height: 0;
		border-top: 15px solid transparent;
		border-bottom: 15px solid transparent;
		border-left: 10px solid #66b2ff;
	}
`;

const StyledLastUpdate = styled.span`
	color: white;
	font-size: 14px;
	padding-right: 10px;
`;

const validateAndFormatStation = (stationName) => {
    const validStations = [
        "newark", "harrison", "journal_square", "grove_street",
        "exchange_place", "world_trade_center", "newport", "hoboken",
        "christopher_street", "ninth_street", "fourteenth_street",
        "twenty_third_street", "thirty_third_street"
    ];
    
    if (!validStations.includes(stationName)) {
        return "Exchange Place"; // Default to exchange_place if invalid
    }
    
    if (stationName === "newark") return "Newark";
    if (stationName === "harrison") return "Harrison";
    if (stationName === "journal_square") return "Journal Square";
    if (stationName === "grove_street") return "Grove Street";
    if (stationName === "exchange_place") return "Exchange Place";
    if (stationName === "world_trade_center") return "World Trade Center";
    if (stationName === "newport") return "Newport";
    if (stationName === "hoboken") return "Hoboken";
    if (stationName === "christopher_street") return "Christopher Street";
    if (stationName === "ninth_street") return "9th Street";
    if (stationName === "fourteenth_street") return "14th Street";
    if (stationName === "twenty_third_street") return "23rd Street";
    if (stationName === "thirty_third_street") return "33rd Street";
    
    // This line should never be reached due to the earlier check,
    // but it's included for completeness
    return "Exchange Place";
};

const formatLineColors = (lineColor) => {
	return lineColor.split(",").map(color => `#${color}`);
};

const Transit = () => {
    const { station = "exchange_place" } = useParams();
    const formattedStation = validateAndFormatStation(station);

	const [trains, setTrains] = useState([]);
	const [lastUpdate, setLastUpdate] = useState(new Date());
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://pathapi-7absdapzja-uc.a.run.app');
				const data = await response.json();
				//const data = require('./ridepath.json');

				const stationData = data.results.find(
					(s) => s.consideredStation === getStationCode(station)
				);

				if (stationData) {
					const allTrains = stationData.destinations.flatMap((dest) =>
						dest.messages.map((msg) => ({
							...msg,
							direction: dest.label,
						}))
					);

					const sortedTrains = allTrains.sort(
						(a, b) => parseInt(a.secondsToArrival) - parseInt(b.secondsToArrival)
					);

					setTrains(sortedTrains);

					const minLastUpdate = new Date(
						Math.min(...sortedTrains.map((t) => new Date(t.lastUpdated)))
					);
					setLastUpdate(minLastUpdate);
				}

				return true;
			} catch (error) {
				console.error("Error fetching train data:", error);
				return false;
			}
		};

		const scheduleNextFetch = (delay) => {
			return setTimeout(async () => {
				const _isSuccess = await fetchData();
				scheduleNextFetch(FETCH_INTERVAL);
			}, delay);
		};

		const initialFetchTimeout = scheduleNextFetch(0);

		const timeInterval = setInterval(() => {
			setCurrentTime(new Date());
		}, 100);

		return () => {
			clearTimeout(initialFetchTimeout);
			clearInterval(timeInterval);
		};
	}, [station]);

	const calculateCountdown = (secondsToArrival, lastUpdated) => {
		const now = new Date();
		const lastUpdateTime = new Date(lastUpdated);
		const elapsedSeconds = Math.floor((now - lastUpdateTime) / 1000);
		const remainingSeconds = Math.max(0, parseInt(secondsToArrival) - elapsedSeconds);
		const minutes = Math.floor(remainingSeconds / 60);
		const seconds = remainingSeconds % 60;
		return {
			text: `${minutes} min ${seconds.toString().padStart(2, "0")} sec`,
			isClose: remainingSeconds < 30,
		};
	};

	const getStationCode = (stationName) => {
		const stationCodes = {
			newark: "NWK",
			harrison: "HAR",
			journal_square: "JSQ",
			grove_street: "GRV",
			exchange_place: "EXP",
			world_trade_center: "WTC",
			newport: "NEW",
			hoboken: "HOB",
			christopher_street: "CHR",
			ninth_street: "09S",
			fourteenth_street: "14S",
			twenty_third_street: "23S",
			thirty_third_street: "33S",
		};
		return stationCodes[stationName] || "EXP";
	};

	return (
		<StyledContainer>
			{trains.map((train, index) => (
				<StyledRow
					key={index}
					isClose={calculateCountdown(train.secondsToArrival, train.lastUpdated).isClose}
				>
					<div>
						<StyledCircle colors={formatLineColors(train.lineColor)} />
						<StyledStation>{`${train.headSign}`}</StyledStation>
					</div>
					{(() => {
						const { text } = calculateCountdown(train.secondsToArrival, train.lastUpdated);
						return <StyledTime>{text}</StyledTime>;
					})()}
				</StyledRow>
			))}
			<StyledBottomRow>
				<StyledCurrentTime>
					{currentTime.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
						hour12: true,
					}).toLowerCase()}
				</StyledCurrentTime>
				<StyledLastUpdate>
					Departures from {formattedStation}. Last updated:{" "}
					{lastUpdate.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
					})}
				</StyledLastUpdate>
			</StyledBottomRow>
		</StyledContainer>
	);
};

export default Transit;
