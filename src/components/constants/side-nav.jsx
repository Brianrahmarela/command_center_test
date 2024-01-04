import { LayoutDashboard, ListTodo, Users } from "lucide-react";

export const NavItems = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        title: "Users",
        icon: Users,
        href: "/dashboard/users",
        color: "text-green-500",
        
    },
    {
        title: "TodoList",
        icon: ListTodo,
        href: "/dashboard/todolist",
        color: "text-orange-500",
        isChidren: true,
        children: [
            {
                title: "children1",
                icon: ListTodo,
                color: "text-pink-500",
                href: "/dashboard/todolist/children1",
            },
            {
                title: "children2",
                icon: ListTodo,
                color: "text-pink-500",
                href: "/dashboard/todolist/children2",
            },
            {
                title: "children3",
                icon: ListTodo,
                color: "text-pink-500",
                href: "/dashboard/todolist/children3",
            },
        ],
    },
    {
        title: "Settings",
        icon: ListTodo,
        href: "/dashboard/settings",
        color: "text-orange-500",
        isChidren: true,
        children: [
            {
                title: "children1",
                icon: ListTodo,
                color: "text-pink-500",
                href: "/dashboard/settings/children1",
            },
            {
                title: "children2",
                icon: ListTodo,
                color: "text-pink-500",
                href: "/dashboard/settings/children2",
            },
            {
                title: "children3",
                icon: ListTodo,
                color: "text-pink-500",
                href: "/dashboard/settings/children3",
            },
        ],
    },
];