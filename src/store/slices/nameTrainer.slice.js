import { createSlice } from "@reduxjs/toolkit";

const nameTrainerSlice = createSlice({
    name: "nameTrainer",
    initialState: "",
    reducers: {
        setNameTrainer: (state, action) => {
            localStorage.setItem("nameTrainer", action.payload)
            return action.payload
        }
    }
})

export const { setNameTrainer } = nameTrainerSlice.actions

export default nameTrainerSlice.reducer;