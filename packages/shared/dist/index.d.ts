/** 博客文章实体——与 backend 数据库模型、web 展示组件对齐 */
export interface BlogPost {
    id: string;
    title: string;
    category: string;
    tags: string[];
    createdAt: string;
}
/** 统一 API 响应包络，前后端一致，避免各自定义 data/code/message */
export interface ApiResponse<T> {
    code: number;
    data: T;
    message?: string;
}
/** 把 ISO 时间格式化为 YYYY-MM-DD
 *  前后端共用同一实现，规避服务器/浏览器时区差异导致的日期错位 */
export declare function formatDate(iso: string): string;
