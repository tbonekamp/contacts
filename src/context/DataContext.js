import React, { useContext, useState, useEffect } from 'react';

const DataContext = React.createContext();
const DataUpdateContext = React.createContext();

export function useData() {
    return useContext(DataContext);
}

export function useDataUpdate() {
    return useContext(DataUpdateContext);
}

export function DataProvider({ children }) {
    const storedData = localStorage.getItem('data') 
                        ? JSON.parse(localStorage.getItem('data')) 
                        : [];

    const [data, setData] = useState(storedData);

    const getData = async () => {
        const response = await fetch("data.json");
        const data = await response.json();

        setData(prevData=>{
            const dataObj = [
                {
                    firstname:data.results[0].name.first,
                    lastname:data.results[0].name.last,
                    status:'private',
                    email:data.results[0].email,
                    phone:data.results[0].phone,
                    street:data.results[0].location.street,
                    postcode:data.results[0].location.postcode,
                    city:data.results[0].location.city
                }
            ];
            localStorage.setItem('data',JSON.stringify(dataObj));
            return dataObj;
        });
      };

    useEffect(() => {
        if(!localStorage.getItem('data')) {
          getData();
        } 
      }, []);

    const sortAlphabetical = (data, key) => {
        return data.sort(function(a, b) {
            var textA = a[key].toUpperCase();
            var textB = b[key].toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          });
    }

    const updateData = (newData) =>  {
        sortAlphabetical(newData,'lastname');
        localStorage.setItem('data',JSON.stringify(newData));
        setData(prevData=>newData);
    }

    const changeData = (method,newValue,id) => {
        switch(method) {
            case 'add':
                const newData = [...data,newValue]; 
                updateData(newData);
            break;
            case 'edit':
                data[id] = newValue;
                updateData(data);
            break;
            case 'delete':
                data.splice(id, 1);
                updateData(data);
            break;
            case 'fetch':
                getData();
            break;
            default:
                // do nothing
            break;
        }
    }

    return(
        <DataContext.Provider value={data}>
            <DataUpdateContext.Provider value={changeData}>
                {children}
            </DataUpdateContext.Provider>
        </DataContext.Provider>
    );
}