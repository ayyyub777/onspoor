import { User } from "@/types";
import { NavLink } from "react-router-dom";
import { UserNav } from "./user-nav";

export default function Navbar({ user }: { user: User | null }) {
    return (
        <nav>
            <div className="flex justify-between items-center px-8 pt-4 pb-3 bg-background">
                <h1 className="text-[21px] font-semibold text-primary">
                    On<span className="font-light">Spoor</span>
                </h1>
                {user && <UserNav user={user} />}
            </div>
            <div className="border-b border-border px-8 bg-background">
                <ul className="flex items-center text-sm">
                    <li className="py-2 px-4">
                        <NavLink
                            to="issues"
                            className={({ isActive }) =>
                                isActive
                                    ? "transition-colors text-primary font-medium border-b-2 border-primary pb-2"
                                    : "transition-colors hover:text-foreground/80 text-foreground/60"
                            }
                        >
                            Issues Table
                        </NavLink>
                    </li>
                    <li className="py-2 px-4">
                        <NavLink
                            to="resolvers"
                            className={({ isActive }) =>
                                isActive
                                    ? "transition-colors text-primary font-medium border-b-2 border-primary pb-2"
                                    : "transition-colors hover:text-foreground/80 text-foreground/60"
                            }
                        >
                            Resolvers
                        </NavLink>
                    </li>
                    <li className="py-2 px-4">
                        <NavLink
                            to="reports"
                            className={({ isActive }) =>
                                isActive
                                    ? "transition-colors text-primary font-medium border-b-2 border-primary pb-2"
                                    : "transition-colors hover:text-foreground/80 text-foreground/60"
                            }
                        >
                            Reports
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
