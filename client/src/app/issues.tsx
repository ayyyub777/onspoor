import { useEffect, useState } from "react";
import { useRefresh } from "../context/refresh";
import { getIssues } from "../actions/issues";
import { DataTable } from "../components/issues-table/data-table";
import { columns } from "../components/issues-table/columns";
import { ApiResponse } from "src/types";
import { useSetupModal } from "src/hooks/use-setup-modal";

export default function Issues() {
    const [response, setResponse] = useState<ApiResponse>();
    const { refresh } = useRefresh();
    const setupModal = useSetupModal();

    useEffect(() => {
        getIssues().then((data) => setResponse(data));
    }, [refresh]);

    useEffect(() => {
        if (response && response.data.length === 0) {
            setupModal.onOpen();
        }
    }, [response]);

    return (
        <main className="h-full flex flex-1 flex-col space-y-8 p-8">
            <div className="bg-white py-5 px-6 rounded-lg border border-border shadow-sm">
                {response?.status === "success" &&
                response.data &&
                Array.isArray(response.data) ? (
                    <DataTable columns={columns} data={response.data} />
                ) : response?.status === "error" ? (
                    <div className="text-center">{response.message}</div>
                ) : (
                    <div className="text-center">Loading...</div>
                )}
            </div>
        </main>
    );
}
