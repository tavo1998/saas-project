import { React, Component } from "react";
import { Link } from "react-router-dom";
import "./Table.css";
import { GetAllFlowers } from "../../services/Api-connection";

const Loader = () => {
  return (
    <div className="flex flex-col flex-1 gap-5 sm:p-2">
      <div className="mt-auto flex gap-3">
        <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full"></div>
      </div>
    </div>
  );
};

export default class Table extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      data: [],
    };
  }

  async componentDidMount() {
    const data = await GetAllFlowers();
    setTimeout(() => {
      this.setState({
        ...this.state,
        data: data.message,
        loading: false,
      });
    }, 500);
  }

  render() {
    return (
      <div className="flex flex-col">
        <Link to="/" className="go-back">
          &#8592; Volver
        </Link>
        <div className="flex flex-col justify-center h-full">
          <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl border border-gray-200 h-fit">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">
                Iris flowers registered
              </h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Largo del sépalo
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Ancho del sépalo
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Largo de pétalo
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Ancho del pétalo
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Nombre</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {this.state.loading ? (
                      <tr>
                        <td className="p-2 whitespace-nowrap">
                          <Loader />
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <Loader />
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <Loader />
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <Loader />
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <Loader />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {this.state.data.map((item) => (
                          <tr key={item.id}>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-md text-center">
                                {item.sepal_length}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-md text-center">
                                {item.sepal_width}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-md text-center">
                                {item.petal_length}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-md text-center">
                                {item.petal_width}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-md text-center text-green-400">
                                {item.species}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
