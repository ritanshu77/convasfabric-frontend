export default function ChetBotPage() {
  return (
    <>
  {/* Hello world */}
  <div className="bg-gray-100 p-2 h-screen w-screen">
    <div className="flex flex-col w-full  mx-auto bg-white rounded-lg shadow-2xl h-[97vh] overflow-y-auto">
      <div className="flex-1 p-4">
        <div className="flex item-start mb-4">
          <img
            src="/image01.jpg"
            alt="Avtar"
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div className="bg-blue-100 p-3 rounded-md ">
            <p className="text-lg text-gray-800">Hello</p>
          </div>
        </div>
        <div className="flex item-start mb-4 justify-end">
          <div className="bg-green-100 p-3 rounded-md ">
            <p className="text-lg text-gray-800">Hello</p>
          </div>
          <img
            src="/image01.jpg"
            alt="Avtar"
            className="w-10 h-10 rounded-full object-cover ml-3"
          />
        </div>
      </div>
      <div className="bg-white px-3 py-2 sm:px-4 border-t border-gray-300">
        <div className="w-full max-w-md sm:max-w-full md:max-w-screen-lg lg:max-w-screen-xl mx-auto flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</>

  );
}