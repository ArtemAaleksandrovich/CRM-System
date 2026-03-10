export class AccessToken {
    private static instance: AccessToken;
    private token: string | null = null;

    private constructor() {}

    static getInstance(): AccessToken {
        if (!this.instance) {
            this.instance = new AccessToken();
        }
        return this.instance;
    }

    getToken() {
        return this.token;
    }
    setToken(token: string | null) {
        this.token = token;
    }
}

export const accessToken = AccessToken.getInstance();