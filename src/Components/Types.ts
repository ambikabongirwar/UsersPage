export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    status?: string;
    role: string;
    lastLogin?: string 
}

export type customQueryResultType = {
    data: IUser[];
    status: number;
    statusText: string;
    headers: any;
    config: string;
}
