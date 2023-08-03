import { configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";



const Store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
})

export default Store