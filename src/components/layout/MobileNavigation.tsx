import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { NavigationItem } from "./Navigation";
import type { UserRole } from "../../types/auth";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavigationItem[];
}

export function MobileNavigation({
  isOpen,
  onClose,
  items,
}: MobileNavigationProps) {
  const { user } = useAuth();

  if (!user || !user.role) return null;

  const userData = user.user_metadata;
  const name = `${userData.firstName} ${userData.lastName}`;
  const avatarUrl = userData.companyName
    ? `/companies/${userData.companyName}/logo.png`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;

  const filteredItems = items.filter(
    (item) => !item.roles || item.roles.includes(user.role as UserRole),
  );

  const roleDisplay = user.role.charAt(0).toUpperCase() + user.role.slice(1);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 md:hidden"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={onClose}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <img className="h-8 w-auto" src="/logo.svg" alt="TalentTrack" />
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {filteredItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      onClick={onClose}
                    >
                      <Icon
                        className="mr-4 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex-shrink-0 group block">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-10 w-10 rounded-full"
                      src={avatarUrl}
                      alt={name}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-700">
                      {name}
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                      {roleDisplay}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
        <div className="flex-shrink-0 w-14">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
}
