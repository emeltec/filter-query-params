export interface IProvider {
    name: string;
    serviceProviderId: string;
}

export interface IProviderResponse {
    companies: IProvider[];
    totalPages: number;
}