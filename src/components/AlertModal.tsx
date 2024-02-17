import { Alert, AlertProps } from "@blueprintjs/core";
import React from "react";

interface AlertModalProps {
  isOpen?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  icon?: AlertProps["icon"];
  intent?: AlertProps["intent"];
  confirmButtonText?: string;
  cancelButtonText?: string;
  children?: React.ReactNode;
  actions?: {
    onCancel?: AlertProps["onCancel"];
    onConfirm?: AlertProps["onConfirm"];
  };
}

const AlertModal = (props: AlertModalProps) => {
  return (
    <Alert
      cancelButtonText={props.cancelButtonText}
      confirmButtonText={props.confirmButtonText}
      icon={props.icon}
      intent={props.intent}
      isOpen={props.isOpen}
      loading={props.isLoading}
      onCancel={props.actions?.onCancel}
      onConfirm={props.actions?.onConfirm}
    >
      {props.children}
    </Alert>
  );
};

export default AlertModal;
