import { ApiResponse } from "src/types";
import axios from "axios";

export const populate = async () => {
    const response: ApiResponse = await axios({
        method: "POST",
        url: "/api/populate",
    }).then((res) => res.data);

    return response;
};
