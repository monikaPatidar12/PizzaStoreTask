import React  from 'react'

const SummaryTable=({tableData,cancelNow})=>{
    return(<>
    <table style={{marginTop:'10px',margin:'auto'}}>
        <thead>
            <tr>
                <td>OrderId</td>
                <td>Stage</td>
                <td>Total Time sepnd</td>
                <td>Action</td>
            </tr>
        </thead>
        <tbody>
            {tableData?.map((data,i)=>{
                return(
                <tr key={i}>
                    <td>{data?.id}</td>
                    <td>{data?.place ? 'Placed' :data?.making ? 'Making' : data?.ready ? 'Ready' : 'Completed'}</td>
                    <td>{data?.orderTime}</td>
                    <td>{!data?.making && !data?.ready && !data?.isCompleted && <button onClick={()=>cancelNow(data?.id)}>Cancel order</button>}</td>
                </tr>
                )
            })}
            <tr>
                <td>Total Orders</td>
                <td colSpan={3}>{tableData?.length}</td>
            </tr>
        </tbody>
    </table>
    </>)
}

export default SummaryTable

