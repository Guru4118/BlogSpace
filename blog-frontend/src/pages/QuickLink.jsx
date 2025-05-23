import React from "react";
import { Link } from "react-router-dom";

function QuickLinks() {
  return (<>
    <div className="bg-gray-100 py-10 mt-10 border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold text-pink-600 mb-3">BlogSpace</h2>
          <p className="text-sm text-gray-700">
            BlogSpace is a community-driven platform where writers and readers connect through powerful stories and ideas.
          </p>
        </div>
        <div className=" grid grid-cols-2 ">
        {/* Navigation Links */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/home" className="text-gray-600 hover:text-pink-600">Home</Link></li>
            <li><Link to="/blogs" className="text-gray-600 hover:text-pink-600">Blogs</Link></li>
            <li><Link to="/profile" className="text-gray-600 hover:text-pink-600">My Profile</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div > 
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact</h2>
          <p className="text-sm text-gray-700">📞 8072422183</p>
          <p className="text-sm text-gray-700">📧gprasath103@gmail.com</p>
        </div>
        </div>
        
        
      </div>
      

    </div>
    <div className="p-4 mt-8 rounded-2xl text-xs justify-center text-center bg-gradient-to-br from-pink-300 to-pink-400 ">
            <p>Copyright © <span className="text-white text-2xl">BlogSpace</span>. All Rights Reserved. Designed by <span className="text-white text-2xl"><a href="https://www.linkedin.com/in/guruprasath103/" target="new">Guruprasath</a> </span></p>
        </div>
        </>
  );
}

export default QuickLinks;
