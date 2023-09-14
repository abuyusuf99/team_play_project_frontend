import React from "react";
import TopThree from "../../components/TopThree/TopThree";
import Post from "../../components/Posts/Posts";
function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold">Лучшие посты</h1>
        </div>
      </header>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="col-span-2">
            <TopThree />
          </div>
          <div className="col-span-1">
            <h2 className="text-3xl font-semibold text-gray-800">Посты</h2>
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
