import React, { useState } from "react";
import axios from "axios";
export default function App() {
  const [data, setdata] = useState();
  const [fetch,setfetch]=useState(false);
  return (
    <>
      <div className="grid grid-flow-row">
        <input
          className="border-4 m-3 p-2"
          placeholder=" Enter the 6 digit Pincode"
          onChange={async (event) => {
            try {
              setfetch(true)
              const response = await axios.get(
                `https://api.postalpincode.in/pincode/${event.target.value}`
              );
              setdata(response?.data[0]?.PostOffice);
              console.log(response?.data[0]?.PostOffice);
            } catch (error) {
              console.log(error);
            }finally{
              setfetch(false)
            }
          }}
          maxLength={6}
          required
        />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 m-3">
        {fetch && <h3>Fetching the data.....</h3>}
        {!fetch && data?.map((item) => (
          <div className="flex flex-col gap-3 bg-slate-400 p-3 border rounded-xl">
            <div className="flex flex-row gap-3">
              <h1>Name:</h1>
              <h1 className="font-bold">{item?.Name}</h1>
            </div>
            <div className="flex flex-row gap-3">
              <h1>District</h1>
              <h1 className="font-bold">{item?.Block}</h1>
            </div>
            <div className="flex flex-row gap-3">
              <h1>Region</h1>
              <h1 className="font-bold">{item?.Region}</h1>
            </div>
            <div className="flex flex-row gap-3">
              <h1>State</h1>
              <h1 className="font-bold">{item?.State}</h1>
            </div>
            <div className="flex flex-row gap-3">
              <h1>Country</h1>
              <h1 className="font-bold">{item?.Country}</h1>
            </div>
          </div>
        ))}
        {!data && !fetch && (
          <h3 className="col-span-2 text-center">No Results</h3>
        )}
      </div>
    </>
  );
}
