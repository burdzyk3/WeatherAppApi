import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    unit: 'metric',
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleUnit: (state) => {
            if (state.unit === 'metric') state.unit = 'imperial';
            else if (state.unit === 'imperial') state.unit = 'kelvin';
            else state.unit = 'metric';
        },
        setUnit: (state, action) => {
            state.unit = action.payload;
        },
    },
});

export const { toggleUnit, setUnit } = settingsSlice.actions;

export default settingsSlice.reducer;
