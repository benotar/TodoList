import {ConfirmationState, ConfirmationStore} from "@/types/store/Confirmation.ts";
import {create} from "zustand";

const initState: ConfirmationState = {
    isOpen: false,
    title: null,
    description: null,
    cancelLabel: null,
    actionLabel: null,
    onAction: () => {
    },
    onCancel: () => {
    }
};

const useConfirmationStore = create<ConfirmationStore>(
    (set) => ({
        ...initState,
        openConfirmation: (data) =>
            set({
                isOpen: true,
                title: data.title,
                description: data.description,
                cancelLabel: data.cancelLabel,
                actionLabel: data.actionLabel,
                onAction: data.onAction,
                onCancel: data.onCancel
            }),
        closeConfirmation: () =>
            set({
                ...initState
            })
    })
);

export default useConfirmationStore;