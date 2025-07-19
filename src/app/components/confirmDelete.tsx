// components/ConfirmDeleteDialog.tsx

import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../components/ui/alert-dialog";

interface ConfirmDeleteDialogProps {
  title?: string;
  description?: string;
  onConfirm: () => void;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  confirmLabel?: string;
}

const ConfirmDeleteDialog = ({
  title = "Xác nhận xoá",
  description = "Hành động này không thể hoàn tác. Bạn chắc chắn muốn xoá?",
  onConfirm,
  trigger,
  open,
  onOpenChange,
  confirmLabel,
}: ConfirmDeleteDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && React.isValidElement(trigger) && (
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange?.(false)}>
            Huỷ
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              onOpenChange?.(false);
            }}
          >
            {confirmLabel || "Xoá"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteDialog;
