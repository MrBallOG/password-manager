import { PayloadAction } from "@reduxjs/toolkit"

export const refreshTokenReducer = (sent = false, action: PayloadAction<null>) => {
    switch (action.type) {
        case "SENT":
            return true
        default:
            return sent
    }
}   