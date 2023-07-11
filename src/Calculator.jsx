import React, { useState, useEffect } from 'react';
export default function Calculator() {
    const [milesPerHour, setMilesPerHour] = useState(0);
    const [milesPerGallon, setMilesPerGallon] = useState(0);
    const [gallonsPerHour, setGallonsPerHour] = useState(0);
    const [basePrice, setBasePrice] = useState(0);
    const [zeroInterceptCostPerGallon, setZeroInterceptCostPerGallon] = useState(0);
    const [zeroInterceptRatio, setZeroInterceptRatio] = useState(0);
    const [hours, setHours] = useState(0);
    const [costPerGallon, setCostPerGallon] = useState(0);
    const [baseRevenue, setBaseRevenue] = useState(0);
    const [adjustmentPerct, setAdjustmentPerct] = useState(0);
    const [adjustment, setAdjustment] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [costChange, setCostChange] = useState(0);
    const [overRecovery, setOverRecovery] = useState(0);
    const [overRecoveryPerct, setOverRecoveryPerct] = useState(0);
    const [showError, setShowError] = useState(0);
    const [showResult, setShowResult] = useState(0);
    const [interceptDollorPerHour, setInterceptDollorPerHour] = useState(0);
    const [impliedOverRec, setImpliedOverRec] = useState(0);
    const [impliedOverRecPerct, setImpliedOverRecPerct ] = useState(0);

    const validateForm = () => {
        if (milesPerHour && milesPerGallon && basePrice && zeroInterceptCostPerGallon && zeroInterceptRatio &&
            hours && costPerGallon) {
            setShowResult(true);
            document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
            setShowError(false);
            return;
        } else {
            setShowError(true);
            setShowResult(false);
            return;
        }
    }

    const fillForm = () => {
        setMilesPerHour(22)
        setMilesPerGallon(5.4)
        setBasePrice(118)
        setZeroInterceptCostPerGallon(3.25)
        setZeroInterceptRatio(19)
        setHours(15000)
        setCostPerGallon(5.10)
    }

    useEffect(() => {
        setGallonsPerHour((milesPerHour / milesPerGallon).toFixed(2) || 0);
        setBaseRevenue(hours * basePrice)
        setAdjustmentPerct(((costPerGallon / zeroInterceptCostPerGallon - 1) *
            (zeroInterceptRatio)).toFixed(4))
        setAdjustment(baseRevenue * (adjustmentPerct / 100))
        setTotalRevenue(adjustment + baseRevenue)
        setCostChange(((hours * gallonsPerHour) *
            (costPerGallon - zeroInterceptCostPerGallon)).toFixed(2))
        setOverRecovery((adjustment - costChange).toFixed(2))
        setOverRecoveryPerct((overRecovery / totalRevenue * 100).toFixed(2))
        setInterceptDollorPerHour(Number(zeroInterceptCostPerGallon * (milesPerHour / milesPerGallon)).toFixed(2))
        setImpliedOverRec((interceptDollorPerHour / basePrice * 100).toFixed(2))
        setImpliedOverRecPerct(((1-(impliedOverRec/100)/(zeroInterceptRatio/100))*100).toFixed(2))
    }, [milesPerHour, milesPerGallon, basePrice, costChange, overRecovery, gallonsPerHour, baseRevenue, zeroInterceptCostPerGallon, zeroInterceptRatio, costPerGallon, hours, adjustmentPerct, adjustment, totalRevenue, impliedOverRec, impliedOverRecPerct, interceptDollorPerHour, overRecoveryPerct]);

    return (<div>
        <h1 className="text-3xl font-bold ">
            Welcome to XBE surcharge rate adjustment calculator
        </h1>
        <form>
            <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12 container mx-auto px-4">
                    <p class="mt-10 text-sm leading-6 text-gray-600">To Estimate the over Recovery cost please provide the details below.</p>

                    <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label for="milesPerHour" class="block text-sm font-medium leading-6 text-gray-900">Miles per hour</label>
                        </div>
                        <div class="sm:col-span-3">
                            <input value={milesPerHour} onChange={e => setMilesPerHour(e.target.value)} type="text" name="milesPerHour" id="milesPerHour" autocomplete="milesPerHour" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6 px-4" />
                        </div>
                    </div>
                    <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label for="milesPerGallon" class="block text-sm font-medium leading-6 text-gray-900">Miles per Gallon</label>
                        </div>
                        <div class="sm:col-span-3">
                            <input value={milesPerGallon} onChange={e => setMilesPerGallon(e.target.value)} type="text" name="milesPerGallon" id="milesPerGallon" autocomplete="milesPerGallon" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6 px-4" />
                        </div>
                    </div>

                    <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label for="Base Price" class="block text-sm font-medium leading-6 text-gray-900">
                                Base Price
                            </label>
                        </div>
                        <div class="sm:col-span-3">
                            <input value={basePrice} onChange={e => setBasePrice(e.target.value)} type="text" name="basePrice" id="basePrice" autocomplete="basePrice" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6 px-4" />
                        </div>
                    </div>

                    <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label for="zeroInterceptCostPerGallon" class="block text-sm font-medium leading-6 text-gray-900">
                                Zero-Intercept Cost Per Gallon</label>
                        </div>
                        <div class="sm:col-span-3">
                            <input value={zeroInterceptCostPerGallon} onChange={e => setZeroInterceptCostPerGallon(e.target.value)}
                                type="text" name="zeroInterceptCostPerGallon" id="zeroInterceptCostPerGallon" autocomplete="zeroInterceptCostPerGallon" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6 px-4" />
                        </div>
                    </div>

                    <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label for="zeroInterceptRatio" class="block text-sm font-medium leading-6 text-gray-900">Zero-Intercept Ratio ( in percentage )</label>
                        </div>
                        <div class="sm:col-span-3">
                            <input value={zeroInterceptRatio} onChange={e => setZeroInterceptRatio(e.target.value)} type="text" name="zeroInterceptRatio" id="zeroInterceptRatio" autocomplete="zeroInterceptRatio" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6 px-4" />
                        </div>
                    </div>
                    <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label for="hours" class="block text-sm font-medium leading-6 text-gray-900">Hours</label>
                        </div>
                        <div class="sm:col-span-3">
                            <input value={hours} onChange={e => setHours(e.target.value)} type="text" name="hours" id="hours" autocomplete="hours" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6 px-4" />
                        </div>
                    </div>

                    <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label for="costPerGallon" class="block text-sm font-medium leading-6 text-gray-900">
                                Cost Per Gallon (actual cost)</label>
                        </div>
                        <div class="sm:col-span-3">
                            <input value={costPerGallon} onChange={e => setCostPerGallon(e.target.value)} type="text" name="costPerGallon" id="costPerGallon" autocomplete="costPerGallon" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6 px-4" />
                        </div>
                    </div>
                    <div className={'mt-3 p-2 bg-red-400 ' + (showError ? 'visible' : 'hidden')}>
                        please provide with all the data so that we can calculate the over recovery cost efficiently or please run with sample data.
                    </div>
                    <div class="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" onClick={() => { fillForm() }} class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Populate Sample Data</button>
                        <button type="button" onClick={() => { validateForm() }} class=" block rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Calculate the Recovery Cost Difference</button>
                    </div>
                </div>
            </div>
        </form>
        <div id="result" className={'mt-5 ' + (showResult ? 'visible' : 'invisible')}>
            <p className="mt-5 text-md leading-6 font-bold text-blue-600"> Here is the calculated revenue details and over recovery cost details</p>
            <div class="mt-6 flex items-center justify-center gap-x-6">
                <span>Zero-Intercept Dollars Per Hour</span>
                <span className="font-bold"> {interceptDollorPerHour} </span>
            </div>
            <div class="mt-6 flex items-center justify-center gap-x-6">
                <span>Base Revenue</span> <span className="font-bold">{baseRevenue}</span>
            </div>
            <div class="mt-6 flex items-center justify-center gap-x-6">
                <span>Adjustment Percentage</span><span className="font-bold"> {Number(adjustmentPerct).toFixed(2)}</span>
            </div>
            <div class="mt-6 flex items-center justify-center gap-x-6">
                <span>Adjustment </span><span className="font-bold"> {adjustment}</span>
            </div>
            <div class="mt-6 flex items-center justify-center gap-x-6">
                <span>Total Revenue </span><span className="font-bold">  {totalRevenue}</span>
            </div>
            <div class="mt-6 flex items-center justify-center gap-x-6">
                <span> Cost Change </span><span className="font-bold">{costChange}</span>
            </div>
            <div class="mt-6 flex items-center justify-center gap-x-6">
                <span>Over-Recovery</span><span className="font-bold">{overRecovery}</span>
            </div>
            <div class="my-6 flex items-center justify-center gap-x-6">
                <span>Over-Recovery Percentage of Revenue </span><span className="font-bold"> {Number(overRecoveryPerct).toFixed()} %</span>
            </div>
            <div class="mt-6">
                <span className="block">Over-recovered amount is approximately <span className="font-bold text-blue-900">${overRecovery} </span> which is (nearly <span className="font-bold text-red-700">{Number(overRecoveryPerct).toFixed()} % </span> of their revenue)</span>
                <span className="block">Implied Intercept ratio <span className="font-bold text-blue-900"> {impliedOverRec} </span>and Over-Recovery % of Adjustment is <span className="font-bold text-red-700">{impliedOverRecPerct} %</span></span>
            </div>
        </div>
    </div>);
}