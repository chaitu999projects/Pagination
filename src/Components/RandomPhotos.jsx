import { Component } from "react";

class RandomPhotos extends Component {
  constructor() {
    super();

    this.state = {
      allData: [],
      page: 1,
      client_id: "EniuT9moTUI7FjO7cD1MNK-fwGsXWIEWrNsKEb-TBew",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  handlePage = (num) => {
    this.setState({ page: num }, this.fetchData);
  };

  fetchData = async () => {
    try {
      const data = await fetch(
        `https://api.unsplash.com/search/photos?page=${this.state.page}&query=nature&client_id=${this.state.client_id}&per_page=6`
      );
      const res = await data.json();
      this.setState({ allData: res.results });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  render() {
    const count = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Office Photo Gallery
        </h1>

        {this.state.allData.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {this.state.allData.map((photos) => (
                <div
                  key={photos.id}
                  className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <a href={photos.links.html}
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
                      {photos.alt_description || "Nature photo"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center space-x-2">
              {count.map((num) => (
                <button
                  onClick={() => this.handlePage(num)}
                  key={num}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors duration-200 ${
                    this.state.page === num
                      ? "bg-amber-500 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-amber-100 shadow-sm"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default RandomPhotos;
