import React from 'react'
import CurveLine from '../../components/apexCharts/CurveLine'
import Bar from '../../components/apexCharts/Bar'

const Dashboard = () => {
  return (
    <>
    <div className="p-4 sm:ml-64 bg-gray-100 h-screen">
        <div className="p-4 rounded-lg dark:border-gray-700 mt-20">
            <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="relative flex flex-col min-w-0 break-words bg-teal-300 rounded-lg mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 className="text-gray-900 uppercase font-bold text-xs">Revenue</h5>
                            <span className="font-bold text-xl">$350,897</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                        <p className="text-sm text-blueGray-500 mt-4"><span className="text-emerald-500 mr-2"><i className="fas fa-arrow-up"></i> 3.48%</span><span className="whitespace-nowrap">Since last month</span></p>
                    </div>
                </div>

                <div className="relative flex flex-col min-w-0 break-words bg-orange-300 rounded-lg mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 className="text-gray-900 uppercase font-bold text-xs">Sales</h5>
                            <span className="font-bold text-xl">924</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                </svg>
                            </div>
                        </div>
                    </div>
                        <p className="text-sm text-blueGray-500 mt-4"><span className="text-gray-900 mr-2"><i className="fas fa-arrow-down"></i> 1.10%</span><span className="whitespace-nowrap">Since yesterday</span></p>
                    </div>
                </div>

                <div className="relative flex flex-col min-w-0 break-words bg-purple-300 rounded-lg mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 className="text-gray-900 uppercase font-bold text-xs">Performace</h5>
                            <span className="font-bold text-xl">49,65%</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-cyan-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                        <p className="text-sm text-blueGray-500 mt-4"><span className="text-emerald-500 mr-2"><i className="fas fa-arrow-up"></i> 12%</span><span className="whitespace-nowrap">Since last month</span></p>
                    </div>
                </div>

                <div className="relative flex flex-col min-w-0 break-words bg-lime-300 rounded-lg mb-6 xl:mb-0 shadow-lg">
                         <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                               <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 className="text-gray-900 uppercase font-bold text-xs">Stocks</h5>
                                  <span className="font-bold text-xl">2,356</span>
                               </div>
                               <div className="relative w-auto pl-4 flex-initial">
                                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                  </svg>
                                  </div>
                               </div>
                            </div>
                            <p className="text-sm text-blueGray-500 mt-4"><span className="text-red-500 mr-2"><i className="fas fa-arrow-down"></i> 3.48%</span><span className="whitespace-nowrap">Since last week</span></p>
                         </div>
                      </div>
            </div>


            <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg p-4">
                    <CurveLine/>
                </div>
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg p-4">
                    <Bar/>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Dashboard