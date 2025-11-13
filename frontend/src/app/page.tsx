"use client";

import { useState, useEffect } from "react";
import { EventSelectorButton } from "@/components/EventSelectorButton";
import { TEvent } from "@/models/event";
import { EventTicket } from "@/components/EventTicket";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_EVENTS } from "@/graphql/queries";
import { CREATE_TICKET } from "@/graphql/mutations";
import { useStore } from "@/store/useStore";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { web3TicketAddress, web3TicketAbi } from "@/lib/contract";
import { parseEventLogs } from "viem";

const eventsData: TEvent[] = [
	{
		id: "1",
		name: "Expo Emprende Argentina",
		code: "202B",
		logoUrl: "/logos/event-expo-emprende-argentina.png",
	},
	{
		id: "2",
		name: "ElectroFest Cordoba",
		code: "325W",
		logoUrl: "/logos/event-electrofest-cordoba.png",
	},
	{
		id: "3",
		name: "Academia de Arte",
		code: "806H",
		logoUrl: "/logos/event-academia-de-arte.png",
	},
];

export default function HomePage() {
	const { userAddress } = useStore();
	const [isMinting, setIsMinting] = useState(false);
	const [mintError, setMintError] = useState<string | null>(null);

	// const { data, loading, error } = useQuery<{ events: TEvent[] }>(GET_EVENTS);
	// const eventsData = data?.events;

	const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
	const [isExiting, setIsExiting] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// Hooks de Wagmi para el contrato
	const {
		data: hash,
		writeContract,
		isPending: isWritePending,
		error: writeError,
	} = useWriteContract();

	// Hook de Apollo para la mutación
	const [createTicket, { loading: isApolloLoading, error: apolloError }] =
		useMutation(CREATE_TICKET, {
			// Refrescar las queries de "Mis Tickets" después de crear uno nuevo
			refetchQueries: ["GetTicketsByUser"],
		});

	// Hook de Wagmi para esperar la transacción
	const {
		isLoading: isConfirming,
		isSuccess: isConfirmed,
		data: receipt,
		error: receiptError,
	} = useWaitForTransactionReceipt({ hash });

	useEffect(() => {
		if (eventsData && eventsData.length > 0 && selectedEventId === null) {
			setSelectedEventId(eventsData[0].id);
		}
	}, [eventsData, selectedEventId]);

	const selectedEvent = eventsData?.find((e) => e.id === selectedEventId);

	const handleEventSelect = (newEventId: TEvent["id"]) => {
		if (isAnimating || newEventId === selectedEventId) return;
		setIsAnimating(true);
		setIsExiting(true);
		setMintError(null); // Limpiar errores al cambiar de ticket
		setTimeout(() => {
			setSelectedEventId(newEventId);
			setIsExiting(false);
			setTimeout(() => {
				setIsAnimating(false);
			}, 500);
		}, 500);
	};

	const handleAcquireTicket = async (eventId: string): Promise<void> => {
		if (!userAddress) {
			alert("Please connect your wallet first.");
			return;
		}
		if (!eventId) return;

		setMintError(null);
		setIsMinting(true);

		try {
			// 1. Llamar al Smart Contract (Wagmi)
			writeContract({
				address: web3TicketAddress as `0x${string}`,
				abi: web3TicketAbi,
				functionName: "safeMint",
				args: [userAddress], // La dirección 'to'
			});
		} catch (err) {
			console.error("Error writing contract:", err);
			setMintError((err as Error).message);
			setIsMinting(false);
		}
	};

	// Efecto para manejar el resultado de la transacción (Paso 2 y 3)
	useEffect(() => {
		// 2. Esperar a que la transacción se confirme
		if (isConfirmed && receipt) {
			console.log("Transaction confirmed:", receipt);

			// 3. Parsear el 'tokenId' desde los logs del evento 'Transfer'
			let tokenId: string | null = null;
			try {
				const logs = parseEventLogs({
					abi: web3TicketAbi,
					logs: receipt.logs,
					eventName: "Transfer",
				});
				// El tokenId es el 3er argumento (index 2) en el evento Transfer
				if (logs.length > 0 && logs[0].args.tokenId) {
					tokenId = logs[0].args.tokenId.toString();
				}
			} catch (err) {
				console.error("Error parsing logs:", err);
				setMintError("Error parsing transaction logs.");
				setIsMinting(false);
				return;
			}

			if (!tokenId) {
				console.error("Could not find tokenId in logs.");
				setMintError("Could not determine tokenId from transaction.");
				setIsMinting(false);
				return;
			}

			console.log("Minted tokenId:", tokenId);

			// 4. Llamar a la mutación de Apollo para guardar en DB
			createTicket({
				variables: {
					user: userAddress,
					event: selectedEventId,
					tokenId: tokenId,
				},
			})
				.then((result) => {
					console.log("Ticket created in DB:", result);
					alert(
						`Successfully acquired Ticket #${tokenId} for ${selectedEvent?.name}!`
					);
				})
				.catch((err) => {
					console.error("Error creating ticket in DB:", err);
					setMintError(`Minting succeeded, but DB save failed: ${err.message}`);
				})
				.finally(() => {
					setIsMinting(false);
				});
		}
		// Manejo de errores
		if (writeError) {
			setMintError(`Transaction failed: ${writeError.message}`);
			setIsMinting(false);
		}
		if (receiptError) {
			setMintError(`Confirmation failed: ${receiptError.message}`);
			setIsMinting(false);
		}
	}, [
		isConfirmed,
		receipt,
		writeError,
		receiptError,
		createTicket,
		userAddress,
		selectedEventId,
		selectedEvent?.name,
	]);

	const isProcessing =
		isMinting || isWritePending || isConfirming || isApolloLoading;

	// if (loading) {
	// 	return (
	// 		<div className="w-full h-screen flex justify-center items-center text-xl text-blue-300">
	// 			Loading events...
	// 		</div>
	// 	);
	// }

	// if (error) {
	// 	return (
	// 		<div className="w-full h-screen flex justify-center items-center text-xl text-red-400">
	// 			<p>
	// 				Error loading events. <br />
	// 				Make sure the backend is running on port 4000.
	// 				<br />
	// 				<code className="text-sm text-red-600">{error.message}</code>
	// 			</p>
	// 		</div>
	// 	);
	// }

	if (!eventsData || eventsData.length === 0) {
		return (
			<div className="w-full h-screen flex justify-center items-center text-xl text-gray-400">
				No events found.
			</div>
		);
	}

	return (
		<div className="w-full bg-slate-950 text-gray-200 font-sans p-6 flex justify-center overflow-hidden">
			<main className="flex flex-col items-center w-full max-w-4xl mx-auto pt-2 md:pt-2">
				<h1 className="text-4xl md:text-6xl font-extrabold text-center mb-12 tracking-tight">
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400">
						Design and Development
					</span>
					<br />
					<span className="text-3xl md:text-5xl text-slate-300">
						Unique Digital Experiences
					</span>
				</h1>

				<div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4 mb-4">
					{eventsData.map((event) => (
						<EventSelectorButton
							key={event.id}
							event={event}
							isSelected={selectedEventId === event.id}
							onClick={() => handleEventSelect(event.id)}
							disabled={isProcessing}
						/>
					))}
				</div>

				<div className="w-full h-[550px] flex items-center justify-center [perspective:1000px]">
					{selectedEvent && (
						<EventTicket
							event={selectedEvent}
							isExiting={isExiting}
							onAcquireClick={handleAcquireTicket}
							// Pasamos el estado de 'minting' al componente
							// (Deberás añadir 'isMinting' a las props de EventTicket)
							// isMinting={isProcessing}
						/>
					)}
				</div>

				{/* Zona de estado de minting */}
				<div className="h-10 mt-4 text-center">
					{isProcessing && (
						<p className="text-blue-300">
							{isWritePending && "Waiting for signature..."}
							{isConfirming && "Confirming transaction on-chain..."}
							{isApolloLoading && "Saving ticket to database..."}
						</p>
					)}
					{isConfirmed && !isMinting && (
						<p className="text-green-400">Minting successful!</p>
					)}
					{mintError && (
						<p className="text-red-400 text-sm max-w-md">{mintError}</p>
					)}
				</div>
			</main>
		</div>
	);
}
