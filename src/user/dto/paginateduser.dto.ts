import { User } from "../entities/user.entity";

export class PaginatedUsersDto {
    data: User[];
    meta: {
      total: number;
      page: number;
      limit: number;
      last_page: number;
    };
  }