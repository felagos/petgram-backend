export interface Pagination<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;
}