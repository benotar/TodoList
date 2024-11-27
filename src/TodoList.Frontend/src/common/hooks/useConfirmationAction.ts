import useConfirmationStore from "@/store/confirmationStore.ts";
import {useShallow} from "zustand/shallow";

export const useConfirmationAction = () => {
    const {
        openConfirmation,
        closeConfirmation
    } = useConfirmationStore(
        useShallow(
            (state) => ({
                    openConfirmation: state.openConfirmation,
                    closeConfirmation: state.closeConfirmation
                }
            )
        )
    );

    return {
        openConfirmation,
        closeConfirmation
    };
}