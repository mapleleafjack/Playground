import axios from "axios";

export const getThingy = async (
    id: string
): Promise<Record<string, unknown>> => {
    const response = await axios.get(`/api/jack_api/${id}`);

    return response?.data;
};

export const addThingy = async (
    name: string
): Promise<Record<string, unknown>> => {
    const response = await axios.post(`/api/jack_api?name=${name}`);

    return response?.data;
}