import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { type ReactNode } from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </RadixDialog.Root>
  );
}

interface DialogContentProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function DialogContent({
  title,
  subtitle,
  children,
  className = "",
}: DialogContentProps) {
  return (
    <RadixDialog.Portal>
      {/* Overlay */}
      <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

      {/* Content */}
      <RadixDialog.Content
        className={`fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ${className}`}
      >
        {children}

        {/* Footer hint */}
        {subtitle && (
          <div className="px-6 pb-5 text-center">
            <p className="text-gray-400 text-xs">{subtitle}</p>
          </div>
        )}

        {/* Close button */}
        <RadixDialog.Close className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors">
          <X size={15} />
        </RadixDialog.Close>

        {/* Hidden title for accessibility */}
        {title && (
          <RadixDialog.Title className="sr-only">{title}</RadixDialog.Title>
        )}
        <RadixDialog.Description className="sr-only">
          {title} details
        </RadixDialog.Description>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}
