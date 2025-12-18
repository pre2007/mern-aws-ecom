import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { API } from "../utils/api"; 

export default function Products({setCart,cart}) {
  const [products,setProducts] = useState([])
  
  useEffect(() => {
    fetch(`${API}/api/getproduct`)
    .then(res => res.json())
    .then(data => setProducts(data))
  }, [])
  
  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    
    const res = await fetch(`http://localhost:5000/api/deleteProduct/${id}`, {
      method: "DELETE",
    });
    
    if (res.status === 204) {
      alert("Product deleted successfully");
      setProducts(products.filter(p => p._id !== id)); 
    } else {
      alert("Error deleting product");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Products</h2>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <div 
              key={p._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  {p.name}
                </h3>
                <p className="text-2xl font-bold text-black mb-4">₹{p.price}</p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <Link 
                    to={`/product/${p._id}`}
                    className="flex-1 min-w-[120px] bg-gray-900 hover:bg-gray-600 text-black font-medium py-2 px-4 rounded-md text-center transition-colors duration-200"
                  >
                    View Details
                  </Link>
                  
                  <button 
                    onClick={() => addToCart(p)}
                    className="flex-1 min-w-[120px] bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                  
                  <button 
                    onClick={() => deleteProduct(p._id)}
                    className="flex-1 min-w-[120px] bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}