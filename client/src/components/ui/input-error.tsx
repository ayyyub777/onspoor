import { HTMLAttributes } from "react";

export function InputError({
    message,
    className = "",
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string | null }) {
    return message ? (
        <p {...props} className={"text-sm text-red-600 " + className}>
            {message}
        </p>
    ) : null;
}
