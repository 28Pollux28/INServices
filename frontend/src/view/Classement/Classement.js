import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import User from '../../request/service/User';
import Profil_Picture from "../../profil_picture.svg"
import ClassementService from '../../request/service/Classement';



export default function Classement() {
    const [data, setdata] = useState(null);
    const [myUser, setMyUser] = useState(null);

    const userconnected = User.get();
    useEffect(()=>{
        console.log(userconnected)
        let response;
        {userconnected ? response = ClassementService.privRankings() : ClassementService.pubRankings() }
        response.then((data)=>{
            if(data) {
                if (userconnected){
                    setdata(data.slice(1))
                    setMyUser(data[0])
                }else{
                    setdata(data)
                }
            }
            console.log(data);
        }).catch((error) => {
            console.log("gjhgjh");
            setdata(null)
        });
    }, [])

    if(data==null){
        return <div>loading...</div>
    }

    return (
        <Container>
            <Row>
                <div>
                    <h2>Classement</h2>
                </div>
            </Row>
            <Row>
                <div >
                    {userconnected ? <p>
                        <br />Vous êtes classé : {myUser.rank === 1 ? '1er' : `${data[0].rank}ème`}
                        </p> : <p>Connectez vous pour voir votre classement !</p>}
                </div>
            </Row>
            <Row>
                <div style={{ width: '600px', margin: '0 auto' }}>
                    <Container>
                        <Row>

                            <Col xs={12} md={4} className="d-flex flex-column p-0" style={{ height: '443px' }}>
                                <div className="d-flex flex-column align-items-center font-weight-bold justify-content-end" style={{ flexGrow: 6 }}>
                                    <img src={"http://localhost:3000/assets/users/50/"+data[1].avatar} alt="Logo" className="img-fluid" />
                                    <span className='d-flex'><b>{data[1].name} {data[1].surname[0]}.</b></span>
                                    <span className='d-flex'>{data[1].karmas} Karmas</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-center font-weight-bold text-white" style={{ flexGrow: 4, backgroundColor: '#FCC938' }}>
                                    <span className="display-4">2</span>
                                </div>
                            </Col>

                            <Col xs={12} md={4} className="d-flex flex-column p-0" style={{ height: '443px' }}>
                                <div className="d-flex flex-column align-items-center font-weight-bold justify-content-end" style={{ flexGrow: 3 }}>
                                    <img src={"http://localhost:3000/assets/users/50/"+data[0].avatar} alt="Logo" className="img-fluid" />
                                    <span className='d-flex'><b>{data[0].name} {data[0].surname[0]}.</b></span>
                                    <span className='d-flex'>{data[0].karmas} Karmas</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-center font-weight-bold text-white" style={{ flexGrow: 7, backgroundColor: '#ED3B3B' }}>
                                    <span className="display-4">1</span>
                                </div>
                            </Col>

                            <Col xs={12} md={4} className="d-flex flex-column p-0" >
                                <div className="d-flex flex-column align-items-center font-weight-bold justify-content-end" style={{ flexGrow: 8 }}>
                                    <img src={"http://localhost:3000/assets/users/50/"+data[2].avatar} alt="Logo" className="img-fluid" />
                                    <span className='d-flex'><b>{data[2].name} {data[2].surname[0]}.</b></span>
                                    <span className='d-flex'>{data[2].karmas} Karmas</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-center font-weight-bold text-white" style={{ flexGrow: 2, backgroundColor: '#2EB79C' }}>
                                    <span className="display-4">3</span>
                                </div>
                            </Col>

                        </Row>
                    </Container>
                </div>
            </Row>
            <Row className="table-responsive">
                <div >
                    <h3><br />Tableau des classements</h3>
                </div>
                <Table striped bordered size="sm">
                    <thead>
                        <tr>
                            <th colSpan="3">Titre du tableau</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Position</b></td>
                            <td><b>Utilisateur</b></td>
                            <td><b>Nombre de Karma</b></td>
                        </tr>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.rank}</td>
                                <td>{item.name} {item.surname}</td>
                                <td>{item.karmas}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}
