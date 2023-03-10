const Modal = ({show, onClose, title, children, confirmButton}) => {
    return (
        <>
            {
                show &&
                <div className="fixed left-0 top-0 right-0 bottom-0 bg-blacker bg-opacity-80 flex items-center justify-center" onClick={onClose}>
                    <div className="w-[300px] md:w-[600px] bg-white dark:bg-blacker rounded-lg shadow-lg py-6 px-8" onClick={e => e.stopPropagation()}>
                        <div className="py-2">
                            <h3 className="font-title text-xl md:text-4xl dark:text-white">{title}</h3>
                        </div>
                        <div className="border-y border-primary">
                            {children}
                        </div>
                        <div className="pt-4 flex gap-2 justify-end items-center">
                            {confirmButton}
                            <button className="text-xl dark:text-white font-text px-4 py-2 border border-primary rounded-xl hover:underline decoration-primary-interact underline-offset-4 transition-all ease-in-out" onClick={onClose}>Cancelar</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Modal