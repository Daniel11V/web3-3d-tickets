import { create } from "zustand";

// Definimos el tipo para el estado de la wallet
type TWalletState = {
	isConnected: boolean;
	userAddress: `0x${string}` | null;
	setUserState: (state: {
		isConnected: boolean;
		userAddress: `0x${string}` | null;
	}) => void;
};

// Combinamos con el estado de eventos (si lo sigues usando)
type TGlobalState = TWalletState & {
	// selectedEventId: string | null;
	// setSelectedEventId: (id: string) => void;
};

export const useStore = create<TGlobalState>((set) => ({
	// Estado inicial de la wallet
	isConnected: false,
	userAddress: null,
	setUserState: (state) =>
		set({
			isConnected: state.isConnected,
			userAddress: state.userAddress,
		}),

	// Estado de eventos
	// selectedEventId: null,
	// setSelectedEventId: (id) => set({ selectedEventId: id }),
}));
