/**
 * 
 * Anonymous
 * 
 */

export default function (simpleLazyLoadedRoute) {
    return [
        {
            path: '/',
            pageName: 'LoginPage',
            exact: true,
            index: true,
            data: {
                title: 'Home',
                path: '/',
                route: true
            },
            container: 'LoginPage'
        },
        {
            path: 'login',
            pageName: 'LoginPage',
            exact: true,
            data: {
                title: 'Login',
                path: '/login',
                route: true
            },
            container: 'LoginPage'
        },
        {
            path: 'signin',
            pageName: 'LoginPage',
            exact: true,
            data: {
                title: 'Login',
                path: '/signin',
                route: true
            },
            container: 'LoginPage'
        },
        {
            path: 'signup',
            pageName: 'LoginPage',
            exact: true,
            data: {
                title: 'Register',
                path: '/signup',
                route: true
            },
            container: 'LoginPage'
        },
        {
            path: 'forgot',
            pageName: 'LoginPage',
            exact: true,
            data: {
                title: 'Forgot Password',
                path: '/forgot',
                route: true
            },
            container: 'LoginPage'
        },
        {
            path: 'reset-password',
            pageName: 'ResetPasswordPage',
            container: 'ResetPasswordPage'
        },
        {
            path: 'verifyOtp',
            pageName: 'LoginPage',
            exact: true,
            data: {
                title: 'Verification Form',
                path: '/verifyOtp',
                route: true
            },
            container: 'LoginPage'
        },

        {
            path: '/*',
            exact: true,
            pageName: 'NotFound',
            container: 'NotFound'
        }
    ]
}