export const userLoginReducer = (state= {user: null}, action)=>{
    switch(action.type){
        case "USER_LOGIN_REQUEST": return{
            ...state,
            loading: true
        }
        case "USER_LOGIN_SUCCESS": return{
            user: action.payload,
            loading: false
        }
        case "USER_LOGIN_FAILED": return {
            ...state,
            loading: false
        }
        case "USER_LOGOUT": return {
            ...state,
            user: null
        }
        case "USER_SIGNUP_REQUEST": return {
            ...state,
            loading: true
        }
        case "USER_SIGNUP_SUCCESS": return {
            ...state,
            redirect: true,
            loading: false
        }
        case "USER_SIGNUP_FAILED": return {
            ...state,
            loading: false
        }
        case "USER_SIGNUP_COMPLETED": return{
            ...state,
            redirect: false,
            loading: false,
        }
        case "USER_EDIT_REQUEST": return {
            ...state,
            loading: true,
        }
        case "USER_EDIT_REQUEST_SUCCESS": return {
            ...state,
            loading: false,
            user: action.payload
        }
        case "USER_EDIT_REQUEST_FAILED": return {
            ...state,
            user: {...state.user},
            loading: false,
        }
        case "USER_PASSWORD_CHANGE_REQUEST": return {
            ...state,
            loading: true,
        }
        case "USER_PASSWORD_CHANGE_REQUEST_SUCCESS": return {
            ...state,
            loading: false,
        }
        case "USER_PASSWORD_CHANGE_REQUEST_FAILED": return {
            ...state,
            loading: false,
        }
        default: return state
    }
}
