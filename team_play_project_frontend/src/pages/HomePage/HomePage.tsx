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
        <TopThree />
      </div>
      <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-wrap"> {/* Добавлен flex-wrap */}
        <div className="container mx-auto py-4"> {/* Добавлены классы ширины */}
        <h2 className="text-3xl font-semibold">Посты</h2>
          <div className="container mx-auto py-8">
            <div className="container mx-auto">
            </div>
            <Post />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default HomePage;
