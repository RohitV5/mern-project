import React from "react";
import {Table, Pagination} from  'react-bootstrap';
import Moment from "react-moment";
import Loader from "../../../utils/loader";

const PaginationComponent = ({arts}) => {
     return (
        <>
            {
                arts && arts.docs ?
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Created</th>
                                <th>Title</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arts.docs.map((item)=>(
                                <tr key={item.id}>
                                    <td><Moment to={item.date  }></Moment></td>
                                    <td>{item.title}</td>
                                    <td>{item.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        {arts.hasPrevPage ? 
                        
                            <>
                                <Pagination.Prev onClick={()=>{}}>

                                </Pagination.Prev> 
                                <Pagination.Item onClick={()=>{}}>
                                    {arts.prevPage}
                                </Pagination.Item>
                            </>

                            :

                            null                    
                        } 
                        <Pagination.Item active>
                            {arts.page}
                        </Pagination.Item>
                        {arts.hasNextPage ? 
                        
                            <>

                                <Pagination.Item onClick={()=>{}}>
                                    {arts.nextPage}
                                </Pagination.Item>
                                <Pagination.Next onClick={()=>{}}>

                                </Pagination.Next> 
                            </>

                            :

                            null                    
                        }




                        
                    </Pagination>
                </>

                :
                <Loader></Loader>
            }
        </>
    )
}


export default PaginationComponent;