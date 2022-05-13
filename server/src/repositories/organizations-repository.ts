export interface OrganizationCreateData {
  email: string;
}

export interface OrganizationsRepository {
  create: (data: OrganizationCreateData) => Promise<string>;
}
