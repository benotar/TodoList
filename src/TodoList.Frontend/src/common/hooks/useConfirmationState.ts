import useConfirmationStore from "@/store/confirmationStore.ts";
import {useShallow} from "zustand/shallow";

export const useConfirmationState = () => {
    const {
        isOpen,
        title,
        description,
        cancelLabel,
        actionLabel,
        onAction,
        onCancel
    } = useConfirmationStore(
        useShallow(
            (state) => ({
                    isOpen: state.isOpen,
                    title: state.title,
                    description: state.description,
                    cancelLabel: state.cancelLabel,
                    actionLabel: state.actionLabel,
                    onAction: state.onAction,
                    onCancel: state.onCancel
                }
            )
        )
    );

    return {
        isOpen,
        title,
        description,
        cancelLabel,
        actionLabel,
        onAction,
        onCancel
    };
}