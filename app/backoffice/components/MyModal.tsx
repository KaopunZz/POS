import { ReactNode } from "react";

interface ModalProps {
    id: string;
    title: string;
    children: ReactNode;
}
const Modal: React.FC<ModalProps> = ({ id, title, children }) => {
    return (
        <>
            <div
                className="modal fade"
                id={id}
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                {title}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                id={id + "_btnClose"}
                            ></button>
                        </div>
                        <div className="modal-body">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Modal;