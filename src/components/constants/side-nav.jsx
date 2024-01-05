import { KanbanSquare, Settings, Settings2, Anvil, ListMinus } from "lucide-react";

export const NavItems = [
    {
        title: "Dashboard",
        icon: KanbanSquare,
        href: "/dashboard",
        // color: "text-black",
    },
    {
        title: "Master",
        icon: Anvil,
        href: "/dashboard/master",
        // color: "text-black",
        // color: "text-green-500",
        
    },
    // {
    //     title: "TodoList",
    //     icon: ListTodo,
    //     href: "/dashboard/todolist",
    //     color: "text-orange-500",
    //     isChidren: true,
    //     children: [
    //         {
    //             title: "children1",
    //             icon: ListTodo,
    //             color: "text-pink-500",
    //             href: "/dashboard/todolist/children1",
    //         },
    //         {
    //             title: "children2",
    //             icon: ListTodo,
    //             color: "text-pink-500",
    //             href: "/dashboard/todolist/children2",
    //         },
    //         {
    //             title: "children3",
    //             icon: ListTodo,
    //             color: "text-pink-500",
    //             href: "/dashboard/todolist/children3",
    //         },
    //     ],
    // },
    {
        title: "Settings",
        icon: Settings2,
        href: "/dashboard/settings",
        // color: "text-black",
        isChidren: true,
        children: [
            {
                title: "children1",
                icon: ListMinus,
                // color: "text-black",
                href: "/dashboard/settings/children1",
            },
            {
                title: "children2",
                icon: ListMinus,
                // color: "text-black",
                href: "/dashboard/settings/children2",
            },
            {
                title: "children3",
                icon: ListMinus,
                // color: "text-black",
                href: "/dashboard/settings/children3",
            },
        ],
    },
];