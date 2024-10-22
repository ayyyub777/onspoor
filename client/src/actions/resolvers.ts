import axios from "axios";
import { ApiResponse } from "src/types";

export interface Values {
    name: string;
    email: string;
}

export const getResolvers = async () => {
    const response: ApiResponse = await axios
        .get("/api/resolvers")
        .then((res) => res.data);

    if (response.data && Array.isArray(response.data)) {
        response.data.sort((a, b) => {
            return new Date(b.id).getTime() - new Date(a.id).getTime();
        });
    }

    return response;
};

export const getResolver = async (id: string) => {
    const response: ApiResponse = await axios
        .get("/api/resolvers/" + id)
        .then((res) => res.data);

    return response;
};

export const postResolver = async (values: Values) => {
    const response: ApiResponse = await axios({
        method: "POST",
        url: "/api/resolvers",
        data: values,
    }).then((res) => res.data);

    return response;
};

export const putResolver = async ({
    id,
    values,
}: {
    id: string;
    values: Values;
}) => {
    const response: ApiResponse = await axios({
        method: "PUT",
        url: "/api/resolvers/" + id,
        data: values,
    }).then((res) => res.data);

    return response;
};

export const deleteResolver = async (id: string) => {
    const response: ApiResponse = await axios({
        method: "DELETE",
        url: "/api/resolvers/" + id,
    }).then((res) => res.data);

    return response;
};
