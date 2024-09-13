import axiosInstance from "../helper/axiosIns";

/**
 * Interagit avec une API JSON
 * @param {string} url
 * @param {string} method
 * @param {object|null} body
 * @param {object} headers
 * @param {string} serverBaseUrl
 * @returns {Promise<any>}
 */


const FetchJSON = async (url, method = 'GET', body = null, sendAsJSON = false, headers = {}) => {
    try {
        const defaultHeaders = {
            Accept: 'application/json',
        };

        let processedBody = body;
        let processedHeaders = { ...defaultHeaders, ...headers };

        if (body && !(body instanceof FormData)) {
            if (sendAsJSON) {
               
                processedBody = JSON.stringify(body);
                processedHeaders['Content-Type'] = 'application/json';
            } else if (typeof body === 'object' && !Array.isArray(body)) {
                const formData = new FormData();
                function appendToFormData(obj, form, parentKey = '') {
                    for (const [key, value] of Object.entries(obj)) {
                        const fullKey = parentKey ? `${parentKey}[${key}]` : key;
                        if (Array.isArray(value)) {
                            value.forEach((item, index) => {
                                if (item instanceof File) {
                                    form.append(`${fullKey}[]`, item);
                                } else if (typeof item === 'object' && item !== null) {
                                    appendToFormData(item, form, `${fullKey}[${index}]`);
                                } else {
                                    form.append(`${fullKey}[]`, item);
                                }
                            });
                        } else if (typeof value === 'object' && value !== null) {
                            appendToFormData(value, form, fullKey);
                        } else {
                            form.append(fullKey, value);
                        }
                    }
                }

                appendToFormData(body, formData);
                processedBody = formData;
                delete processedHeaders['Content-Type'];
            } else {
                
                processedBody = JSON.stringify(body);
                processedHeaders['Content-Type'] = 'application/json';
            }
        }

        const response = await axiosInstance({
            method: method,
            url: url,
            headers: processedHeaders,
            data: processedBody,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export default FetchJSON;


