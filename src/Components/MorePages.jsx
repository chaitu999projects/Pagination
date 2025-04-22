import { Component } from "react";

class MorePages extends Component {
  constructor() {
    super();
    this.state = {
      allData: [],
      page: 1,
      client_id: "EniuT9moTUI7FjO7cD1MNK-fwGsXWIEWrNsKEb-TBew",
      isLoading: false, // Added loading state
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  handleNextPage = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1, isLoading: true }),
      () => this.fetchData()
    );
  };

  handlePrevPage = () => {
    if (this.state.page > 1) {
      this.setState(
        (prevState) => ({ page: prevState.page - 1, isLoading: true }),
        () => this.fetchData()
      );
    }
  };

  fetchData = async () => {
    try {
      const data = await fetch(
        `https://api.unsplash.com/search/photos?page=${this.state.page}&query=office&client_id=${this.state.client_id}&per_page=6`
      );
      const res = await data.json();
      this.setState({ allData: res.results, isLoading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { allData, page, isLoading } = this.state;

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Office Photo Gallery
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : allData.length === 0 ? (
          <p className="text-center text-gray-500">No photos found</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {allData.map((photos) => (
                <div
                  key={photos.id}
                  className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <a
                    href={photos.links.html}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={photos.urls.small}
                      alt={photos.alt_description}
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm truncate">
                      {photos.alt_description || "Office photo"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={this.handlePrevPage}
                disabled={page === 1 || isLoading}
                className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
                  page === 1 || isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Previous
              </button>

              <span className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700">
                Page {page}
              </span>

              <button
                onClick={this.handleNextPage}
                disabled={isLoading}
                className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
                  isLoading
                    ? "bg-blue-300 text-white cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
                }`}
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default MorePages;