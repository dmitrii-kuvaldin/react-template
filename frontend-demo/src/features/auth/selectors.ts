import { RootState } from "../../app/store";
import User from "./types/User";
//набор стрелочных функций для выделения чего-то в стейт

export const selectAuthChecked = (state: RootState): boolean => state.auth.authChecked;
export const selectUser = (state: RootState): User | undefined => state.auth.user; //забираем юзера
export const selectLoginFormError = (state: RootState): string | undefined => state.auth.loginFormError;
export const selectRegisterFormError = (state: RootState): string | undefined => state.auth.registerFormError;
