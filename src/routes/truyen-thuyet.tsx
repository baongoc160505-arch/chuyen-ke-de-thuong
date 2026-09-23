import { Outlet, createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/truyen-thuyet")({ component: () => <Outlet /> });
