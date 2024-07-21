"use client";

import { useMounted } from "src/hooks/use-mounted";
import { IssueForm } from "./modals/issue-form";
import { DeleteIssue } from "./modals/delete.issue";

export const ModalProvider = () => {
    const mounted = useMounted();

    if (!mounted) {
        return null;
    }

    return (
        <>
            <IssueForm />
            <DeleteIssue />
        </>
    );
};
