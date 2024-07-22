import { useEffect, useState } from "react";
import { StatusChart } from "src/components/reports/status-chart";
import { getIssuesByDate } from "src/actions/issues";
import { useRefresh } from "src/context/refresh";
import { ApiResponse } from "src/types";

export default function Reports() {
    const [response, setResponse] = useState<ApiResponse>();
    const { refresh } = useRefresh();

    useEffect(() => {
        getIssuesByDate().then((data) => setResponse(data));
    }, [refresh]);

    return (
        <main className="h-full flex flex-1 flex-col space-y-8 p-8">
            {response?.status === "success" &&
            response.data &&
            Array.isArray(response.data) ? (
                <StatusChart data={response.data} />
            ) : response?.status === "error" ? (
                <div className="text-center">{response.message}</div>
            ) : (
                <div className="text-center">Loading...</div>
            )}
        </main>
    );
}
