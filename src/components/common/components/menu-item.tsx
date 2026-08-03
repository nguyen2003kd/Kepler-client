"use client";
import type { MenuItem } from "@/types/menu";
import { buttonVariants } from "@components/ui/button";
import { slugify } from "@lib/slugify";
import { cn } from "@lib/utils";
import { cva } from "class-variance-authority";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

export function MenuItem(props: {
  variant?: "main" | "secondary";
  menu: MenuItem;
  active?: boolean;
  level?: number;
  parentLink?: string;
}) {
  const { menu, variant = "main", active, level = 0, parentLink } = props;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const useCategoryQuery =
    (menu as MenuItem & { useCategoryQuery?: boolean }).useCategoryQuery ===
    true;

  const childItems =
    (menu as MenuItem & { categories?: MenuItem[] }).children ||
    (menu as MenuItem & { categories?: MenuItem[] }).categories ||
    [];
  const hasChildren = childItems.length > 0;

  const menuLink = (() => {
    if (useCategoryQuery && level > 0 && parentLink) {
      const categoryId =
        (menu as MenuItem & { id?: string }).id || slugify(menu.name);
      return `${parentLink}?category=${categoryId}`;
    }

    if (menu.link) {
      return menu.link.startsWith("/") ? menu.link : `/${menu.link}`;
    }

    const menuWithCode = menu as MenuItem & { code?: string };
    if (menuWithCode.code) {
      const code = menuWithCode.code;
      return code.startsWith("/") ? code : `/${code}`;
    }

    return `/${slugify(menu.name)}`;
  })();

  const updateDropdownPos = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 4, left: rect.left });
    }
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (level === 0) {
      updateDropdownPos();
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveSubmenu(null);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        "relative",
        level === 0 && "group",
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        ref={triggerRef}
        aria-selected={active || pathname === menuLink}
        target={menuLink.startsWith("/") ? "_self" : "_blank"}
        href={menuLink}
        className={cn(menuItemTriggerVariant({ variant }))}
      >
        <span className="inline-flex items-center gap-1.5">
          <span>{menu.name}</span>
          {hasChildren && (
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 transition-transform duration-200",
                isOpen && level === 0 && "rotate-180",
              )}
            />
          )}
        </span>
      </Link>

      {/* Dropdown Content */}
      {hasChildren && isOpen && (
        level === 0 ? (
          createPortal(
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={cn(
                menuItemHoverBoxVariant({ variant }),
                "fixed",
              )}
              style={{ top: dropdownPos.top, left: dropdownPos.left }}
            >
              {childItems.map((subMenu: MenuItem & { categories?: MenuItem[]; children?: MenuItem[] }) => {
            const subMenuChildren =
              subMenu.children ||
              (subMenu as MenuItem & { categories?: MenuItem[] }).categories ||
              [];
            const subMenuHasChildren = subMenuChildren.length > 0;

            const subMenuWithId = subMenu as MenuItem & { id?: string };
            const subMenuUseCategoryQuery =
              (subMenuWithId as MenuItem & { useCategoryQuery?: boolean })
                .useCategoryQuery === true;
            const subMenuLink = subMenuWithId.id
              ? `${menu.link}?category=${subMenuWithId.id}`
              : `${menu.link}?category=${slugify(subMenu.name)}`;

            const finalLink = subMenuUseCategoryQuery
              ? subMenuLink
              : subMenu.link
                ? subMenu.link.startsWith("/")
                  ? subMenu.link
                  : `/${subMenu.link}`
                : `/${slugify(subMenu.name)}`;

            if (subMenuHasChildren) {
              return (
                <div
                  key={subMenu.id}
                  className="relative"
                  onMouseEnter={() => setActiveSubmenu(subMenu.id)}
                  onMouseLeave={() => setActiveSubmenu((prev) => (prev === subMenu.id ? null : prev))}
                >
                  <Link
                    href={finalLink}
                    className={cn(menuItemChildVariant({ variant }), "flex items-center justify-between w-full")}
                  >
                    <span>{subMenu.name}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  {/* Submenu (level 2+) */}
                  {activeSubmenu === subMenu.id && (
                    <div
                      className={cn(
                        menuItemHoverBoxVariant({ variant }),
                        "absolute top-0 left-full ml-1",
                      )}
                    >
                      {subMenuChildren.map((subSubMenu: MenuItem) => (
                        <Link
                          key={subSubMenu.id}
                          href={subSubMenu.link ? (subSubMenu.link.startsWith("/") ? subSubMenu.link : `/${subSubMenu.link}`) : `/${slugify(subSubMenu.name)}`}
                          className={menuItemChildVariant({ variant })}
                        >
                          {subSubMenu.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={subMenu.id}
                href={finalLink}
                className={menuItemChildVariant({ variant })}
              >
                {subMenu.name}
              </Link>
            );
          })}
            </div>,
            document.body,
          )
        ) : (
          <div
            className={cn(
              menuItemHoverBoxVariant({ variant }),
              "absolute top-0 left-full ml-2 w-max",
            )}
          >
            {childItems.map((subMenu: MenuItem & { categories?: MenuItem[]; children?: MenuItem[] }) => {
              const subMenuChildren =
                subMenu.children ||
                (subMenu as MenuItem & { categories?: MenuItem[] }).categories ||
                [];
              const subMenuHasChildren = subMenuChildren.length > 0;

              const subMenuWithId = subMenu as MenuItem & { id?: string };
              const subMenuUseCategoryQuery =
                (subMenuWithId as MenuItem & { useCategoryQuery?: boolean })
                  .useCategoryQuery === true;
              const subMenuLink = subMenuWithId.id
                ? `${menu.link}?category=${subMenuWithId.id}`
                : `${menu.link}?category=${slugify(subMenu.name)}`;

              const finalLink = subMenuUseCategoryQuery
                ? subMenuLink
                : subMenu.link
                  ? subMenu.link.startsWith("/")
                    ? subMenu.link
                    : `/${subMenu.link}`
                  : `/${slugify(subMenu.name)}`;

              if (subMenuHasChildren) {
                return (
                  <div
                    key={subMenu.id}
                    className="relative"
                    onMouseEnter={() => setActiveSubmenu(subMenu.id)}
                    onMouseLeave={() => setActiveSubmenu((prev) => (prev === subMenu.id ? null : prev))}
                  >
                    <Link
                      href={finalLink}
                      className={cn(menuItemChildVariant({ variant }), "flex items-center justify-between w-full")}
                    >
                      <span>{subMenu.name}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    {activeSubmenu === subMenu.id && (
                      <div
                        className={cn(
                          menuItemHoverBoxVariant({ variant }),
                          "absolute top-0 left-full ml-1",
                        )}
                      >
                        {subMenuChildren.map((subSubMenu: MenuItem) => (
                          <Link
                            key={subSubMenu.id}
                            href={subSubMenu.link ? (subSubMenu.link.startsWith("/") ? subSubMenu.link : `/${subSubMenu.link}`) : `/${slugify(subSubMenu.name)}`}
                            className={menuItemChildVariant({ variant })}
                          >
                            {subSubMenu.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={subMenu.id}
                  href={finalLink}
                  className={menuItemChildVariant({ variant })}
                >
                  {subMenu.name}
                </Link>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}

const menuItemTriggerVariant = cva(
  cn(
    buttonVariants({ variant: "ghost" }),
    "focus-visible:ring-0 focus-visible:ring-offset-0"
  ),
  {
    variants: {
      variant: {
        main: "text-gray-700 text-base font-semibold hover:text-[#DC2626] hover:bg-transparent px-3 py-2 rounded-md transition-colors duration-200",
        secondary: "text-primary border-t-2 border-t-transparent rounded-none hover:text-primary/90 aria-selected:border-t-secondary aria-selected:bg-accent",
      },
    },
    defaultVariants: {
      variant: "main",
    },
  }
);

const menuItemHoverBoxVariant = cva(
  "flex flex-col gap-1 p-2 min-w-[220px]",
  {
    variants: {
      variant: {
        main: "bg-white border border-gray-200 shadow-xl rounded-lg z-50",
        secondary: "bg-muted",
      },
    },
    defaultVariants: {
      variant: "main",
    },
  }
);

const menuItemChildVariant = cva(
  cn(
    buttonVariants({ variant: "ghost" }),
    "justify-start text-sm font-normal py-2 px-3 rounded-md transition-colors duration-150"
  ),
  {
    variants: {
      variant: {
        main: "text-gray-600 hover:text-[#DC2626] hover:bg-red-50",
        secondary: "text-accent-foreground hover:text-primary/90",
      },
    },
    defaultVariants: {
      variant: "main",
    },
  }
);
