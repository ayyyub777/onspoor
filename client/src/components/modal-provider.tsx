"use client";

import { useMounted } from "src/hooks/use-mounted";
import { IssueForm } from "./modals/issue-form";
import { DeleteIssue } from "./modals/delete-issue";
import { ResolverForm } from "./modals/resolver-form";
import { DeleteResolver } from "./modals/delete-resolver";
import { Setup } from "./modals/setup";

export const ModalProvider = () => {
    const mounted = useMounted();

    if (!mounted) {
        return null;
    }

    return (
        <>
            <IssueForm />
            <DeleteIssue />
            <ResolverForm />
            <DeleteResolver />
            <Setup />
        </>
    );
};
