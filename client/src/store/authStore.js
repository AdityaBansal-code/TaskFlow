import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: (token, userData) => {
                set({
                    token,
                    user: userData,
                    isAuthenticated: true
                });
            },

            logout: () => {
                set({
                    token: null,
                    user: null,
                    isAuthenticated: false
                });
            }
        }),
        {
            name: 'auth-storage',
        }
    )
);

export default useAuthStore;
