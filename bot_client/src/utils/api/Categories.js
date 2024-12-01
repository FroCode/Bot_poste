import { GET_CATEGORIES_URL } from "../const";


export const getCategories = async () => {
    try {
        const response = await fetch(GET_CATEGORIES_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}