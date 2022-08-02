import { configureStore } from "@reduxjs/toolkit";
import reducers from './slice/index'


export const store = configureStore({
    reducer:reducers
    }
)