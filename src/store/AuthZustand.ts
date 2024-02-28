// import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";
// type authProp = {
//   name:string
// }
// type TStoreState = {
//   auth: authProp ;
//   isAuthenticated: boolean;
//   setData: () => void;
// };

// export const useAuthSlice = create<TStoreState>()(
//   devtools(
//     persist(
//       {
//         auth: null,
//         isAuthenticated: false,
//         setData: () => {},
//       },
//       {
//         name: "auth store",
//         partialize: (state) =>
//           Object.fromEntries(
//             Object.entries(state).filter(
//               ([key]) => !["user", "token"].includes(key),
//             ),
//           ),
//       },
//     ),
//   )

// );
