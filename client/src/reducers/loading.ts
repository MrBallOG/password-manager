import { PayloadAction } from "@reduxjs/toolkit"

export const loadingReducer = (loading = false, action: PayloadAction<null>) => {
    switch (action.type) {
        case "SET_LOADING":
            return true
        case "UNSET_LOADING":
            return false
        default:
            return loading
    }
} 