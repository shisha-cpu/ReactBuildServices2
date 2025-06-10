import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem('user')) || {};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: storedUser 
    },

    reducers: {
        fetchUser(state, action) {
            state.userInfo = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Сохраняем в localStorage
        },
        clearUser(state) {
            state.userInfo = {};
            localStorage.removeItem('user'); // Удаляем из localStorage
        },
        changeUserBalance(state, action) {
            state.userInfo = {
                ...state.userInfo,
                balance: { ...state.userInfo.balance, balance: action.payload }
            };
            localStorage.setItem('user', JSON.stringify(state.userInfo)); // Обновляем localStorage
        }
    }
});

export const { fetchUser, clearUser, changeUserBalance } = userSlice.actions;
export default userSlice.reducer;
