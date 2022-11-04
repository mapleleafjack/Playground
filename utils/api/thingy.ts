import axios from "axios";

export const getThingy = async (
    id: string
): Promise<Record<string, unknown>> => {
    const response = await axios.get(`/api/jack_api/${id}`);

    return response?.data;
};