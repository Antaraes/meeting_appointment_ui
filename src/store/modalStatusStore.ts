import { create } from "zustand";

type FormModal = {
    isOpen: boolean;
    Modal: any;
};

type ConfirmModal = {
    isOpen: boolean;
    message: string;
    subFn: any;
};

type State = {
    formModal: FormModal;
    confirmModal: ConfirmModal;
};

type Actions = {
    setFormModal: (value: Partial<FormModal>) => void;
    setConfirmModalOpen: (value: ConfirmModal) => void;
    setDefault: () => void;
};

export const useModalStatusStore = create<State & Actions>(
    (set) => ({
        formModal: {
            isOpen: false,
            header: "",
            Modal: undefined,
            subFn: undefined
        },
        confirmModal: {
            isOpen: false,
            message: "",
            subFn: undefined
        },
        setFormModal: (value) =>
            set((state: State) => ({
                ...state,
                formModal: { ...state.formModal, ...value },
            })),
        setConfirmModalOpen: (value) =>
            set((state: State) => ({
                ...state,
                confirmModal: { ...state.confirmModal, ...value },
            })),
        setDefault: () => {
            set({
                formModal: {
                    isOpen: false,
                    Modal: undefined,
                },
                confirmModal: {
                    isOpen: false,
                    message: "",
                    subFn: undefined
                },
            });
        }
    })
);
