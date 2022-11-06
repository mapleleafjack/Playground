import axios from "axios";
import { DataThingy } from "types";

export const getThingy = async (
    id: string
): Promise<DataThingy[]> => {
    const response = await axios.get(`/api/jack_api/${id}`);

    return response?.data;
};

export const addThingy = async (
    name: string
): Promise<DataThingy> => {
    const response = await axios.post(`/api/jack_api?name=${name}`);

    return response?.data;
}