import { User } from "@/types";
import { Link } from "react-router-dom";
import { UserNav } from "../user-nav";

export default function Navbar({ user }: { user: User | null }) {
    return (
        <nav>
            <div className="flex justify-between items-center px-8 pt-4 pb-3 bg-background">
                <h1 className="text-[21px] font-semibold text-primary">
                    On<span className="font-extralight">Spoor</span>
                </h1>
                {user && <UserNav user={user} />}
            </div>
            <div className="border-b border-border px-8 bg-background">
                <ul className="flex items-center text-sm">
                    <li className="py-2 px-4 border-b-2 border-primary">
                        <Link
                            to=""
                            className="transition-colors text-primary font-medium"
                        >
                            Issues Table
                        </Link>
                    </li>
                    <li className="p-2 px-4">
                        <Link
                            to=""
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Resolvers
                        </Link>
                    </li>
                    <li className="p-2 px-4 transition-colors hover:text-foreground/80 text-foreground/60">
                        <Link
                            to=""
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Reports
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
