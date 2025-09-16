// const apiPath = 'https://l7h1p7rb-5000.euw.devtunnels.ms/life-in-jotting';
const apiPath = 'http://localhost:5000/life-in-jotting'


export default {
    loginPath: () => [apiPath, 'auth', 'sign-in'].join('/'),
    registerPath: () => [apiPath, 'auth', 'sign-up'].join('/'),
    logoutPath: () => [apiPath, 'auth', 'sign-out'].join('/'),
    refreshTokenPath: () => [apiPath, 'auth', 'refresh'].join('/'),
    confirmUserPath: (id: string) => [apiPath, 'auth', 'confirm', id].join('/'),
    forgotPasswordPath: () => [apiPath, 'auth', 'forgot-password'].join('/'),
    resetPasswordPath: (token: string) => [apiPath, 'auth', 'reset-password', token].join('/'),
};
