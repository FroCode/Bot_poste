import { CREATE_FAQ_URL , GET_ALL_FAQS_URL , GET_FAQ_URL } from "../const";

export const getFaqs = async () => {
    try {
        const response = await fetch(GET_ALL_FAQS_URL, {
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