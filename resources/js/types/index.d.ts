export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: 'New' | 'Contacted' | 'Converted';
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: {
        success?: string;
        error?: string;
    };
};
