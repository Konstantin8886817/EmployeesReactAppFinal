import React from 'react';
import _ from 'lodash';
import {useSelector} from "react-redux";

export default function TitleStatistics(props) {
    const employees = useSelector(state => state.employees)
    const statisticsObj = _.countBy(employees, 'title');
    const statisticsRecords = Object.entries(statisticsObj)
        .map(e => {
            return <tr key={e[0]}>
                <td>
                    {e[0]}
                </td>
                <td>
                    {e[1]}
                </td>
            </tr>
        });

    return <div className="card">
        <header className="card-header">
           <h3>Statistics of the Employee Titles</h3>
        </header>
        <div className="card-body">
            <table>
                <thead>
                <tr>
                    <th>title</th>
                    <th>count</th>
                </tr>
                </thead>
                <tbody>
                {statisticsRecords}
                </tbody>
            </table>
        </div>
        </div>
}
