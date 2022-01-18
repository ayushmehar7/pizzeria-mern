export const resetPasswordReducer = (state = {}, action)=>{
    switch(action.type){
        case "FORGOT_PASSWORD_REQUEST": return {
            loading: true
        }
        case "FORGOT_PASSWORD_REQUEST_SUCCESS": return {
            loading: false,
            mailSent: true
        }
        case "FORGOT_PASSWORD_REQUEST_FAILED": return{
            loading: false,
            mailSent: undefined
        }
        case "RESET_PASSWORD_REQUEST": return {
            loading: true,
        }
        case "RESET_PASSWORD_REQUEST_SUCCESS": return {
            loading: false,
            redirect: true
        }
        case "RESET_PASSWORD_REQUEST_FAILED": return {
            loading: false,
            mailSent: true
        }
        case "RESET_PASSWORD_REQUEST_COMPLETE": return {
            loading: false,
            mailSent: false,
            redirect: false
        }
        default: return state
    }
}