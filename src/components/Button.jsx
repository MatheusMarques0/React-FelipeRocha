function Button(props){
    return <button  {...props} className="bg-slate-400 p-2 rounded-md text-white cursor-pointer">
        {props.children} 
    </button>
}
//props children - > o que você pasa para dentro do button
export default Button