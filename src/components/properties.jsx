import {useQql} from "katnip-quickmin/react";
import {useIsoMemo} from "katnip-isoq";
import {useState} from "react";
import {useRpc} from "katnip-rpc";

const PropertyCard = ({property}) => {
  let { title, description, bedrooms, bathrooms, price }=property;
  let [likes,setLikes]=useState(property.likes);
  let rpc=useRpc();

  async function handleLikeClick() {
    let newLikes=await rpc.increaseLikes(property.id);
    setLikes(await newLikes);
  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border">
      <img
        className="w-full h-48 object-cover"
        src="/cottage.jpg"
        alt={title}
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-700">
            <span className="font-semibold">{bedrooms}</span> Beds
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">{bathrooms}</span> Baths
          </div>
          <div className="text-gray-900 font-semibold text-lg">${price}</div>
        </div>
      </div>
      <div className="p-4 bg-gray-100 border-t">
        <button className="w-full py-2 px-4 bg-blue text-white font-semibold rounded hover:bg-blue"
          onClick={handleLikeClick}>
          Likes: {likes}
        </button>
      </div>
    </div>
  );
};

export function PropertyListing() {
  let qql=useQql();
  let properties=useIsoMemo(async ()=>await qql({manyFrom: "properties"}));

  if (!properties)
    return;

  return (<>
  	{properties.map(property=><PropertyCard property={property}/>)}
  </>);
}