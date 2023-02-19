import NewAccountForm from "./NewAccountForm";

//TODO Realizar en otro archivo una lista de las cuentas para poder eliminar las mismas (dropdown quizas e implementar edicion)



const Accounts = () => {
    return (
        <main className="flex py-6 bg-white w-full gap-4 min-h-screen h-auto ml-2 sm:ml-[4.5rem] md:ml-24">
            <div className="flex flex-col gap-8">
                <NewAccountForm />
            </div>
        </main>
    )
}
export default Accounts