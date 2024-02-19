import React from 'react'
import Input from '../uı/Input'
function Account({ınputs,handleFileChange,handleChange,imageSrc}) {

  
  return (
    <div className="xl:w-3/4 w-full h-full p-4  ">
    <span className="font-semibold text-[30px] ">Account Setting</span>
    <div className="sm:flex justify-between ">
      <div className="sm:w-3/4 h-full py-3">
        <form className="w-full flex flex-wrap justify-center gap-5">
          {ınputs.map((item) => (
            <div key={item.id} className="">
              <Input
                prop=" w-[350px] xl:w-[500px]"
                value={item.value}
                {...item}
               onChange={handleChange}
              />
            </div>
          ))}
        </form>
      </div>
      {/* upload ımg */}
      <div className="xl:w-1/4 w-full">
        <label className="flex  gap-2 items-center justify-center">
          <input
            onChange={(e) => handleFileChange(e)}
            type="file"
            className="hidden"
          />
          <button className="btn pointer-events-none mt-3">
            Select Image
          </button>
          {imageSrc && (
            <div>
              {/*eslint-disable-next-line @next/next/no-img-element*/}
              <img
                src={imageSrc}
                alt=""
                className="w-12 h-12 rounded-full"
              />
            </div>
          )}
        </label>
      </div>
    </div>
    <div className="w-full flex xl:justify-start   ">
      <button className="btn mt-5">Onayla</button>
    </div>
  </div>
  )
}

export default Account
