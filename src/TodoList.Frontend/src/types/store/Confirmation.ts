export type ConfirmationState = {
    isOpen: boolean;
    title: string | null;
    description: string | null;
    cancelLabel: string | null;
    actionLabel: string | null;
    onAction: () => void;
    onCancel: () => void;
}

export type ConfirmationActions = {
    openConfirmation: (data: {
        title: string;
        description: string;
        cancelLabel: string;
        actionLabel: string;
        onAction: () => void;
        onCancel: () => void;
    }) => void;
    closeConfirmation: () => void;
};

export type ConfirmationStore = ConfirmationState & ConfirmationActions;