"use client";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

const Backdrop = ({ onClick }: { onClick: () => void }) => (
  <div
    onClick={onClick}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
  />
);

const ModalOverlay = ({ header, children, footer, onSubmit }: any) => {
  const nodeRef = useRef(null);

  const content = (
    <div
      ref={nodeRef}
      className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2"
    >
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl p-6">
        <header className="mb-4">
          <h2 className="text-lg lg:text-xl font-semibold text-foreground">
            {header}
          </h2>
        </header>

        <form
          onSubmit={onSubmit || ((e) => e.preventDefault())}
          className="flex flex-col gap-4"
        >
          <div className="text-sm text-muted-foreground">{children}</div>

          <footer className="flex justify-end gap-3 mt-4">{footer}</footer>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal")!);
};

export const Modal = ({ show, onCancel, ...props }: any) => {
  const nodeRef = useRef(null);

  return (
    <>
      {show && <Backdrop onClick={onCancel} />}

      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="fade"
        nodeRef={nodeRef}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};
