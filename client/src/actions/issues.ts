import axios from "axios";
import { ApiResponse } from "src/types";

export interface Values {
    title: string;
    status: string;
    priority: string;
    assignee: string;
}

export const getIssues = async () => {
    const response: ApiResponse = await axios
        .get("/api/issues")
        .then((res) => res.data);

    if (response.data && Array.isArray(response.data)) {
        response.data.sort((a, b) => {
            return new Date(b.id).getTime() - new Date(a.id).getTime();
        });
    }

    return response;
};

export const getIssue = async (id: string) => {
    const response: ApiResponse = await axios
        .get("/api/issues/" + id)
        .then((res) => res.data);

    return response;
};

export const postIssue = async (values: Values) => {
    const response: ApiResponse = await axios({
        method: "POST",
        url: "/api/issues",
        data: values,
    }).then((res) => res.data);

    return response;
};

export const putIssue = async ({
    id,
    values,
}: {
    id: string;
    values: Values;
}) => {
    const response = await axios({
        method: "PUT",
        url: "/api/issues/" + id,
        data: values,
    }).then((res) => res.data);

    return response;
};

export const deleteIssue = async (id: string) => {
    const response = await axios({
        method: "DELETE",
        url: "/api/issues/" + id,
    }).then((res) => res.data);

    return response;
};

export const getIssuesByDate = async () => {
    const response: ApiResponse = await axios
        .get("/api/issues-by-date")
        .then((res) => res.data);

    return response;
};
