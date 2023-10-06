import { createSlice } from "@reduxjs/toolkit";


export const AuthSlice = createSlice({
        name:'auth',
        initialState:{
            token:null,
            login:false,
            SaveVideo:[],
        },
        reducers:{
            logout: state =>{
                state.login = !state.login
                state.token = null
            },
            login: (state,action) => {
            state.login = true
            state.token = action.payload
            },
            SaveVideo: (state,action) => {
                state.SaveVideo = [...state.SaveVideo,action.payload ]

            },
            RemoveVideo:(state) =>{
                state.SaveVideo = []
            },
            RemoveAddVideo:(state,action) => {
                state.SaveVideo = action.payload
            },
            removeOneData:(state, action)=>{
                state.SaveVideo = state.SaveVideo.splice(state.SaveVideo.findIndex(a => a.id === action.payload.id) , 1)
            }
            
        }
})
export const { logout, login, SaveVideo, RemoveVideo,RemoveAddVideo, removeOneData} = AuthSlice.actions
export default AuthSlice.reducer