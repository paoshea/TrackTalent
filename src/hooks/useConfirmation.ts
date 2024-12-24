import { useState, useCallback } from "react";

export function useConfirmation() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const confirm = useCallback((action: () => void) => {
    setPendingAction(() => action);
    setIsConfirmationOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    if (pendingAction) {
      pendingAction();
    }
    setIsConfirmationOpen(false);
    setPendingAction(null);
  }, [pendingAction]);

  const handleCancel = useCallback(() => {
    setIsConfirmationOpen(false);
    setPendingAction(null);
  }, []);

  return {
    isConfirmationOpen,
    confirm,
    handleConfirm,
    handleCancel,
  };
}
