const Modal = ({show, onClose, title, children, confirmButton}) => {
    console.log(show);
    return (
        <>
            {
                show &&
                <div className="fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-60 flex items-center justify-center" onClick={onClose}>
                    <div className="w-[300px] md:w-[600px] bg-white rounded-lg shadow-lg py-6 px-8" onClick={e => e.stopPropagation()}>
                        <div className="py-2">
                            <h3 className="font-title text-xl md:text-4xl">{title}</h3>
                        </div>
                        <div className="border-y border-primary">
                            {children}
                        </div>
                        <div className="pt-4 flex gap-2 justify-end items-center">
                            {confirmButton}
                            <button className="text-xl font-text px-4 py-2 border border-primary rounded-xl hover:underline decoration-primary-interact underline-offset-4 transition-all ease-in-out" onClick={onClose}>Cancelar</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Modal