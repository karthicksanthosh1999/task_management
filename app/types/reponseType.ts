export interface IResponseType<T = unknown> {
    success: boolean;
    message: string;
    statusCode: number;
    data?: T;
    error?: string | null;
}
