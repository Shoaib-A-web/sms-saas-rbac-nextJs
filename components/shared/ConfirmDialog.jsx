"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Confirm action",
  description = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  danger = false,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            variant={danger ? "danger" : "primary"}
            loading={loading}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="text-sm text-[var(--color-foreground-muted)]">
        This action may affect existing
        information.
      </p>
    </Modal>
  );
}