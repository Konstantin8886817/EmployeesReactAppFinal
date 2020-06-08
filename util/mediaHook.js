import {useState, useEffect} from 'react';
const useColumnsMedia = (columnsMediaObject) => {
    //columnsMediaObject - object with the following structure
    //{query:<columns number>,...,default:<columns number>
    /*******************************************************/
    //getting media query list
    const mediaQueryList = Object.keys(columnsMediaObject).map(q =>
        window.matchMedia(q));
    //function getColumns returning number of columns according to window width
    const getColumns = () => {
        const mediaQuery = mediaQueryList.find(mq => mq.matches);
        return mediaQuery ? columnsMediaObject[mediaQuery.media] :
            columnsMediaObject.default;
    }
    //connection to the React state
    const [columns, setColumns] = useState(getColumns());
    //set up on any component mounting
    useEffect(() => {
        const handler = () => {
            console.log(getColumns())
            setColumns(getColumns());
        }
        mediaQueryList.forEach(mq => mq.addEventListener('change', handler))
    },[])
    return columns;
}
export  default useColumnsMedia;
