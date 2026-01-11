import { configureStore } from "@reduxjs/toolkit";
import rootreducer from "./redux/reducers/main";

const store = configureStore({
    reducer: rootreducer
}
)

export default store;