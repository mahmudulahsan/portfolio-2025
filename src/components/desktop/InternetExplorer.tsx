"use client";

import { blogs } from "@/data/blogs";
import { ArrowLeft, ArrowRight, ChevronDown, Home, RefreshCw, Search, X } from "lucide-react";
import { useState } from "react";

export function InternetExplorer() {
  const [url, setUrl] = useState("http://www.mahmudulahsan.com/favorites");

  return (
    <div className="flex flex-col h-full bg-[#ECE9D8] font-tahoma text-sm">
      {/* Menu Bar */}
      <div className="flex items-center gap-2 px-1 py-0.5 border-b border-gray-300 bg-[#ECE9D8]">
        <div className="flex gap-2 text-xs">
          <span className="px-1 hover:bg-[#316AC5] hover:text-white cursor-default">File</span>
          <span className="px-1 hover:bg-[#316AC5] hover:text-white cursor-default">Edit</span>
          <span className="px-1 hover:bg-[#316AC5] hover:text-white cursor-default">View</span>
          <span className="px-1 hover:bg-[#316AC5] hover:text-white cursor-default">Favorites</span>
          <span className="px-1 hover:bg-[#316AC5] hover:text-white cursor-default">Tools</span>
          <span className="px-1 hover:bg-[#316AC5] hover:text-white cursor-default">Help</span>
        </div>
        <div className="ml-auto">
          <img src="/windows.png" alt="Windows" className="w-4 h-4 opacity-50" />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-1 py-1 border-b border-gray-300 bg-[#ECE9D8]">
        <div className="flex items-center gap-0.5">
          <button disabled className="flex items-center gap-1 px-1 py-0.5 rounded border border-transparent disabled:opacity-50 disabled:cursor-not-allowed grayscale">
            <div className="bg-[#1F8A28] rounded-full p-0.5">
              <ArrowLeft className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-gray-500">Back</span>
            <ChevronDown className="w-2 h-2 text-gray-500" />
          </button>
          <button disabled className="p-1 rounded border border-transparent disabled:opacity-50 disabled:cursor-not-allowed grayscale">
            <div className="bg-[#1F8A28] rounded-full p-0.5">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
        
        <div className="w-[1px] h-6 bg-gray-300 mx-1" />

        <button disabled className="p-1 border border-transparent disabled:opacity-50 disabled:cursor-not-allowed grayscale">
          <div className="bg-white border border-gray-400 p-0.5 shadow-sm">
            <X className="w-4 h-4 text-red-600" />
          </div>
        </button>
        <button disabled className="p-1 border border-transparent disabled:opacity-50 disabled:cursor-not-allowed grayscale">
          <div className="bg-white border border-gray-400 p-0.5 shadow-sm">
            <RefreshCw className="w-4 h-4 text-green-600" />
          </div>
        </button>
        <button disabled className="p-1 border border-transparent disabled:opacity-50 disabled:cursor-not-allowed grayscale">
          <div className="bg-white border border-gray-400 p-0.5 shadow-sm">
            <Home className="w-4 h-4 text-blue-600" />
          </div>
        </button>

        <div className="w-[1px] h-6 bg-gray-300 mx-1" />

        <button disabled className="flex items-center gap-1 px-1 border border-transparent disabled:opacity-50 disabled:cursor-not-allowed grayscale">
          <Search className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-500">Search</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 px-2 py-1 border-b border-gray-300 bg-[#ECE9D8]">
        <span className="text-xs text-gray-500">Address</span>
        <div className="flex-1 flex items-center bg-white border border-[#7F9DB9] px-1 h-5">
          <img src="/ie.png" alt="IE" className="w-3 h-3 mr-1" />
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 text-xs outline-none font-sans"
            readOnly
          />
          <ChevronDown className="w-3 h-3 text-gray-500" />
        </div>
        <button disabled className="flex items-center gap-1 px-2 py-0.5 bg-[#F4F4F4] border border-gray-400 rounded disabled:opacity-50 disabled:cursor-not-allowed">
          <span className="text-xs text-gray-400 font-bold">Go</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white overflow-auto p-8 font-serif">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[#003399] mb-2 border-b-2 border-[#003399] pb-2">
            Welcome to Internet Explorer 6
          </h1>
          <p className="text-gray-600 mb-8 italic">Your gateway to my technical writings across the web.</p>

          <div className="grid gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="flex gap-4 p-4 border border-[#D0D0BF] bg-[#F5F5F5] hover:bg-[#E8F0FA] hover:border-[#316AC5] transition-colors group">
                <div className="shrink-0">
                   <div className="w-12 h-12 bg-white border border-gray-300 flex items-center justify-center shadow-sm">
                      <span className="font-bold text-xl text-[#003399]">{blog.platform[0]}</span>
                   </div>
                </div>
                <div className="flex-1">
                  <a href={blog.link} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-[#003399] group-hover:underline block mb-1">
                    {blog.title}
                  </a>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="font-bold text-[#003399]">{blog.platform}</span>
                    <span>•</span>
                    <span>{blog.date}</span>
                  </div>
                  <p className="text-sm text-black leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-4 border-t border-gray-200 text-center text-xs text-gray-500 font-sans">
            © 2023 Mahmudul Ahsan. All rights reserved.
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center gap-2 px-2 py-0.5 border-t border-gray-300 bg-[#ECE9D8] text-xs text-gray-600">
        <img src="/ie.png" alt="IE" className="w-3 h-3" />
        <span>Done</span>
      </div>
    </div>
  );
}
