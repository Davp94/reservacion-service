export class PaginationFilterResponseDto<T> {
    content: T[];
    
    totalItems: number;

    page: number;

    take: number;

    totalPages: number;  
}