import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "../hooks/useSidebar";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/layout/subnav-accordion";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export function SideNav({ items, setOpen, className }) {
  const path = usePathname();
  const { isOpen } = useSidebar();
  const [openItem, setOpenItem] = useState("");
  const [lastOpenItem, setLastOpenItem] = useState("");

  useEffect(() => {
    if (isOpen) {
      setOpenItem(lastOpenItem);
    } else {
      setLastOpenItem(openItem);
      setOpenItem("");
    }
  }, [isOpen]);

  return (
    <nav className="space-y-2">
      {items.map((item) =>
        item.isChidren ? (
          <Accordion
            type="single"
            collapsible
            className="space-y-2"
            key={item.title}
            value={openItem}
            onValueChange={setOpenItem}
          >
            <AccordionItem value={item.title} className="border-none">
              <AccordionTrigger
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:font-bold hover:bg-white  hover:no-underline"
                )}

                
              >
                <div>
                  {item.icon && (
                    <item.icon className={cn("h-5 w-5",  path === item.href ?"group-hover:text-white" : item.color)} />
                  )}
                </div>
                <div
                  // className={cn(
                  //   "absolute left-12 text-base group-hover:font-bold duration-200 ${ path === item.href && 'group-hover:text-white ",
                  //   !isOpen && className
                  // )}

                  className={cn(
                    `absolute left-12 text-base group-hover:font-bold duration-200 ${ path === item.href && 'group-hover:text-white '}`,
                    !isOpen && className
                  )}
                  
                >
                  {item.title}
                </div>

                {isOpen && (
                  <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                )}
              </AccordionTrigger>
              <AccordionContent className="ml-4 mt-2 space-y-4 pb-1">
                {item.children?.map((child) => (
                  <Link
                    key={child.title}
                    href={child.href}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "group flex h-12 justify-start gap-x-3 group-hover:text-primary hover:bg-white ",
                      path === child.href && "bg-primary text-white font-bold hover:bg-primary hover:text-white"
                    )}
         
                  >
                    {child.icon && (
                      <child.icon className={cn("h-5 w-5",  path === child.href ?"group-hover:text-white" : child.color)} />
                    )}
                  
                    <div
                      className={cn(
                        `text-base group-hover:font-bold duration-200 ${ path === child.href && 'group-hover:text-white '}`,
                        !isOpen && className
                      )}
                     
                    >
                   
                      {child.title}
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "group relative flex h-12 justify-start group-hover:text-primary hover:bg-white ",
              path === item.href && "bg-primary text-white font-bold hover:bg-primary hover:text-white"
              
            )}
          
          >
            
            {item.icon && <item.icon className={cn("h-5 w-5", path === item.href ?"group-hover:text-white" : item.color)} />}
            <span
              className={cn(
                `absolute left-12 text-base group-hover:font-bold duration-200 ${ path === item.href && 'group-hover:text-white '}`,
                !isOpen && className
              )}
            >
              {item.title}
            </span>
          </Link>
        )
      )}
    </nav>
  );
}
