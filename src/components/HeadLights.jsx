export default function HeadLights(){
    return(
        <>
        <div className="flex justify-end items-center">
                <span className="p-5 border-4 border-green-300 rounded-full bg-blue-500"></span>
                <div className="flex ml-2 space-x-2">
                    <span className="p-3 border-2 border-black rounded-full bg-red-400"></span>
                    <span className="p-3 border-2 border-black rounded-full bg-yellow-800"></span>
                    <span className="p-3 border-2 border-black rounded-full bg-green-800"></span>
                </div>
            </div>
        </>
    )
}