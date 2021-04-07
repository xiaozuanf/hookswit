import React,{useState} from 'react';
import Header from '../components/header';
import Left from '../components/left';
function Home(){
    const [style, setStyle] = useState({
        app:{
            backgroundImage:'radial-gradient(50% 58%, #011af1 50%, #00000a 100%)',
            width:'1920px',
            height:'1080px'
        },
        contains:{
            marginTop: '22px',
            display: 'flex'
        },
        left:{
            width: '894px',
            height: '970px',
            margin: '0 20px 0 11px'
        },
        center:{
            width: '580px',
            height: '970px',
            marginRight: '21px',
            float: 'left'
        },
        right:{
            width: '398px',
            height: '970px',
            float: 'left'
        }
    });
    return (
        <div style={style.app}>
            <Header></Header>  
            <div style={style.contains}>
                <Left style={style.left}></Left>  
            </div>
        </div>
    )
}
export default Home