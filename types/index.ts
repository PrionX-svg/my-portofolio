// Defining List data type
export interface List {
    ID: number;
    name: string;
    flag: boolean;
    Create_at: Date;
    Update_at: Date;
}

// Defining Pagination data type
// Because paginitation have a total, page, and limit. So we add them to the Pagination data type
export interface Pagination {
    total: number;
    page: number;
    limit: number;

    
}