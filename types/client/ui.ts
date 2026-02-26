import { TooltipContent } from '@/components/ui/Tooltip/Tooltip';
import { TranslationKeys } from './locale';

/**
 * Direction for label placement in input components.
 * - 'vertical': label is placed above the input.
 * - 'horizontal': label is placed beside the input.
 */
export type LabelDirection = 'vertical' | 'horizontal';

/**
 * Common props for default input components.
 */
export type DefaultInputProps = {
  label?: string; // The label text for the input
  labelDirection?: LabelDirection; // Direction of the label (vertical/horizontal)
  name?: string; // Name attribute for the input
  description?: string; // Optional description or helper text
  required?: boolean; // Whether the input is required
  fullWidth?: boolean; // Whether the input should take the full width of the container
};

/**
 * Represents an action item in the sidebar menu.
 */
export type SidebarMenuActionItem = {
  title: SidebarTitle; // Title of the action, should match SidebarTitle enum
  url?: string; // Optional URL for navigation
  icon?: React.ReactNode; // Optional icon component
  tooltip?: string | React.ComponentProps<typeof TooltipContent>; // Tooltip text or TooltipContent props
};

/**
 * Represents a submenu item in the sidebar.
 */
export type SidebarSubMenuItem = {
  title: SidebarTitle; // Title of the submenu, should match SidebarTitle enum
  url?: string; // Optional URL for navigation
  icon?: React.ReactNode; // Optional icon component
  tooltip?: string | React.ComponentProps<typeof TooltipContent>; // Tooltip text or TooltipContent props
  action?: SidebarMenuActionItem[]; // Optional list of action items for this submenu
};

/**
 * Represents a main menu item in the sidebar.
 */
export type SidebarMenuItem = {
  title: SidebarTitle; // Title of the menu item, should match SidebarTitle enum
  url?: string; // Optional URL for navigation
  icon?: React.ReactNode; // Optional icon component
  isActive?: boolean; // Indicates if the menu item is currently active
  tooltip?: string | React.ComponentProps<typeof TooltipContent>; // Tooltip text or TooltipContent props
  subMenu?: SidebarSubMenuItem[]; // Optional list of submenu items
  action?: SidebarMenuActionItem[]; // Optional list of action items for this menu
};

/**
 * Represents an optional menu item in the sidebar (without submenu or actions).
 */
export type SidebarOptionalMenuItem = {
  title: SidebarTitle; // Title of the menu item, should match SidebarTitle enum
  url?: string; // Optional URL for navigation
  icon?: React.ReactNode; // Optional icon component
  isActive?: boolean; // Indicates if the menu item is currently active
  tooltip?: string | React.ComponentProps<typeof TooltipContent>; // Tooltip text or TooltipContent props
};

/**
 * Group of sidebar menu items, optionally with a group title.
 */
export type SidebarMenuGroup = {
  title?: SidebarTitle; // Optional group title
  menu: SidebarMenuItem[]; // List of menu items in this group
};

/**
 * Sidebar menu structure, consisting of groups of menu items.
 */
export type SidebarMenu = SidebarMenuGroup[];

/**
 * Enum for all possible sidebar menu titles.
 */
export enum SidebarTitle {
  DASHBOARD = 'dashboard',
  SETTINGS = 'settings',
  PROFILE = 'profile',
  LOGOUT = 'logout',
  HELP = 'help',
  ABOUT = 'about',
  CONTACT = 'contact',
  TERMS = 'terms',
  PRIVACY = 'privacy',
  THEME = 'theme',
}

/**
 * Translation keys for menu items, must start with 'menu.'.
 */
export type MenuTranslationKeys = Extract<TranslationKeys, `menu.${string}`>;

/**
 * Represents a breadcrumb link item for navigation.
 */
export type BreadcrumbLinkItem = {
  title: MenuTranslationKeys; // Translation key for the breadcrumb title
  url?: string; // Optional URL for the breadcrumb link
};
