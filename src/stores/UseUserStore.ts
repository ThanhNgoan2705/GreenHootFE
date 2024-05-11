interface UserState {
    userId: number;
    userName: string;
    playerName: string;
    gender: string;
    email: string;
    phone: string;

}
export const useUserStore = {
    id: 'useUserStore',
    state: (): UserState => ({
        userId: 0,
        userName: '',
        playerName: '',
        gender: '',
        email: '',
        phone: '',
    }),
    getters: {
        userId: (state: UserState) => state.userId,
        userName: (state: UserState) => state.userName,
        playerName: (state: UserState) => state.playerName,
        gender: (state: UserState) => state.gender,
        email: (state: UserState) => state.email,
        phone: (state: UserState) => state.phone,
    },
}
