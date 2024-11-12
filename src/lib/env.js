
export const OPENAPIHOST = 'https://pazht.ouhai.gov.cn:8000';
// export const OPENAPIHOST = 'http://192.168.1.49:8081';
export const HASCONSOLE = typeof console !== undefined;
export const ISBROWSER = typeof window !== 'undefined' && typeof window === 'object';
export const UA = ISBROWSER && window.navigator.userAgent.toLowerCase();