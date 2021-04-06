import { environment } from '../../environments/environment';

export const localStorageKeys = {
    user: 'user',
    users: 'users'
};

export const apiUrls = {
    user: {
        login: `${environment.apiUrl}/users/authenticate`,
        register: `${environment.apiUrl}/users/register`,
        users: `${environment.apiUrl}/users`
    }
};

export const applicationUrls = {
    account: {
        login: ['/account/login']
    },
    users: '/users',
    root: '/'
}