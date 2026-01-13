export interface NewUser {
    username: string;
    email: string;
    password: string;
}

export type FormState ={ message?: string}

export type OrderFormState ={ message?: string, quantity: number, price: number}

export type FormDataType = {
    theme: string, motif: string, scale: string, "background-colour": string, repeat: string
}