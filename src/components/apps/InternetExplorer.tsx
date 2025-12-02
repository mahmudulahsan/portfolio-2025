"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { blogs } from "@/data/blogs";
import { ArrowLeft, ArrowRight, ChevronDown, Home, RefreshCw, Search, X } from "lucide-react";
import { useState } from "react";

export function InternetExplorer() {
  const [url, setUrl] = useState("https://ahsan-xp.vercel.app");

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
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 text-xs outline-none font-sans border-none h-auto p-0 shadow-none focus-visible:ring-0 rounded-none bg-transparent"
            readOnly
          />
          <ChevronDown className="w-3 h-3 text-gray-500" />
        </div>
        <Button
          disabled
          variant="outline"
          size="sm"
          className="flex items-center gap-1 px-2 py-0.5 bg-[#F4F4F4] border border-gray-400 rounded disabled:opacity-50 disabled:cursor-not-allowed h-auto text-xs text-gray-400 font-bold hover:bg-[#F4F4F4] shadow-none"
        >
          Go
        </Button>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white overflow-hidden font-tahoma relative">
        <ScrollArea className="h-full w-full">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[#003399] mb-1">
                My Tech Blog
              </h1>
              <p className="text-xs text-gray-600">Technical writings and articles</p>
            </div>

            {/* Tab-like Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {blogs.map((blog) => (
                <a
                  key={blog.id}
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative bg-gradient-to-b from-[#FFFFFF] to-[#ECE9D8] border-2 border-[#0054E3] rounded-t-lg overflow-hidden shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    {/* Tab Top */}
                    <div className="bg-gradient-to-r from-[#0054E3] to-[#0099FF] px-3 py-1.5 flex items-center gap-2">
                      <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center shadow-sm">
                        <span className="text-[10px] font-bold text-[#0054E3]">{blog.platform[0]}</span>
                      </div>
                      <span className="text-white text-xs font-bold truncate flex-1">{blog.platform}</span>
                    </div>

                    {/* Card Content */}
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-[#003399] mb-2 line-clamp-2 group-hover:underline min-h-[2.5rem]">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-gray-700 mb-2 line-clamp-2 leading-relaxed">
                        {blog.description}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-gray-500">
                        <span>{blog.date}</span>
                        <span className="text-[#0054E3] group-hover:underline font-bold">Read →</span>
                      </div>
                    </div>

                    {/* Classic Windows Border Effect */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                      <div className="absolute top-0 left-0 w-1 h-1 bg-white"></div>
                      <div className="absolute top-0 right-0 w-1 h-1 bg-[#808080]"></div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Empty State */}
            {blogs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#ECE9D8] border-2 border-[#0054E3] rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <p className="text-sm text-gray-600">No blog posts available yet.</p>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
              © 2025 Mahmudul Ahsan. All rights reserved.
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Status Bar */}
      <div className="flex items-center gap-2 px-2 py-0.5 border-t border-gray-300 bg-[#ECE9D8] text-xs text-gray-600">
        <img src="/ie.png" alt="IE" className="w-3 h-3" />
        <span>Done</span>
      </div>
    </div>
  );
}
