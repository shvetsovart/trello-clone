"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useMobileSideber } from "@/hooks/use-mobile-sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
  const pathName = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const onOpen = useMobileSideber((state) => state.onOpen);
  const onClose = useMobileSideber((state) => state.onClose);
  const isOpen = useMobileSideber((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathName, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        className="block md:hidden mr-2"
        onClick={onOpen}
        variant="ghost"
        size="sm"
      >
        <Menu className="h-4 w-4"></Menu>
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};
