// 统一管理API基础URL和媒体资源URL

// API基础URL
export const API_BASE_URL = 'http://127.0.0.1:8001';

// 媒体资源URL
export const MEDIA_URL = 'http://127.0.0.1:8001/media';

// 获取完整的媒体资源URL
export function getMediaUrl(path) {
    if (!path) return '';
    // 如果路径已经包含完整URL，则直接返回
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }
    // 移除路径中可能存在的前导斜杠
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${MEDIA_URL}/${cleanPath}`;
}