function Input(props){
    return (
        <input
        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md bg-slate-100" 
        {...props} // Isso é um "spread" ele pega todos os parametros dos props e "atribui" eles sozinho
        />
    )
}

export default Input