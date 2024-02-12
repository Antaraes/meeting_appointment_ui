import { create } from "zustand";

type Modal = {
    isOpen: boolean;
    Modal: any;
};

type State = {
    formModal: Modal;
};

type Actions = {
    setModal: (value: Partial<Modal>) => void;
    setDefault: () => void;
};

export const useModalStatusStore = create<State & Actions>(
    (set) => ({
        formModal: {
            isOpen: false,
            Modal: undefined,
        },
        confirmModal: {
            isOpen: false,
            message: "",
            subFn: undefined
        },
        setModal: (value) =>
            set((state: State) => ({
                ...state,
                formModal: { ...state.formModal, ...value },
            })),
        setDefault: () => {
            set({
                formModal: {
                    isOpen: false,
                    Modal: undefined,
                }
            });
        }
    })
);
