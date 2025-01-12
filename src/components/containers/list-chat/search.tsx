'use client'
import { SearchIcon } from "@/assets/svgs";

export const SearchComponent = () => {
    const searchEvent=()=>{
        console.log("searching")
        return
    }
    return ( 
        <div  className="flex h-11 bg-[#9b4b4b] justify-center items-center p-2 rounded ">
            <button onClick={searchEvent}  className="flex justify-center items-center h-12 w-12 rounded-full ">
                <SearchIcon  className="relative h-6 w-6 stroke-1 hover:cursor-pointer hover:opacity-60 top-1"/>
            </button>
            <input type="text" placeholder="Tìm kiếm" className="w-[200px h-5 border-2 bg- border-gray-300 rounded-md p-2
                outline-none border-none
            " />
        </div>
     );
}
 