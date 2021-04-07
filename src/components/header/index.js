import React,{useState,useEffect} from 'react'
import './index.scss'
import {connect} from 'react-redux'
import {setUser} from '../../redux/actions/user'
import {setInfo,getInfo,setTrans,getTrans} from '../../libs/untils'
import {readEnviroments,transformer} from '../../api/left'
function Header(props){
    const [date, setDate] = useState('2020年04月16日')
    const [time, setTime] = useState('10:58:18')
    const [readEnviroment, setReadEnviroment] = useState({})
    const [transformerList, setTransformerList] = useState([])
    const [voltage, setVoltage] = useState(getTrans().addr)
    let timer
    useEffect(() => {
        countFun()
        readEnviromentFun()
        transformerFun()
        console.log('componentDidMount: 组件加载后')
        return () => {
            console.log('componentWillUnmount: 组件卸载， 做一些清理工作')
            clearInterval(timer);
        }
    }, []);
    // useEffect(() => {
    //     console.log('componentDidUpdate： 更新usernmae')
    // }, [state.username]);
    function integer(value){
        if (value && value !== 0) {
            let num = Math.round(value)
            return num
          } else {
            return value
          }
    }
    function readEnviromentFun(){
        readEnviroments({}).then(data => {
            if (data) {
                setReadEnviroment(data)
            }
          })
    }
    function transformerFun(){
        transformer({buildingId: getInfo().id, flag: 1}).then(data=>{
            if (data && data.length > 0) {
                setTrans(data[0])
                props.setUser({addr:data[0].addr})
                let transformers = []
                data.forEach((item, index) => {
                  if (index < 2) {
                    transformers.push(item)
                  }
                })
                setTransformerList(transformers)
            }
        })
    }
    function handleClickk(num) {
        setVoltage(num.addr)
        props.setUser({addr:num.addr})
        setTrans(num)
      }
    function countFun () {
        timer = setInterval(() => {
            let year = new Date().getFullYear()
            let month = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1
            let date = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
            let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
            let mm = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
            let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
            setDate(year + '年' + month + '月' + date + '日')
            setTime(hh + ':' + mm + ':' + ss)
        }, 1000);
    };
    return(
        <div className="head clearfix">
           <div className="head-left clearfix">
               {transformerList.map((item,index) =>
        <div key={index} className={["head-left-voltage",voltage==item.addr?"active":null].join(' ')} onClick={() => handleClickk(item)}>{item.name}{voltage==item.addr?(<span className="head-left-dot"></span>):null}</div>
        )}
               <div className="head-time clearfix"><span>{date}</span>{time}</div>
           </div>
           <div className="head-con">{getInfo().residentialName}</div>
           <div className="head-right clearfix">
               <div className="head-right-li"><span className="head-right-text">温度</span><span className="head-right-num">{integer(readEnviroment.temp)}℃</span></div>
               <div className="head-right-li"><span className="head-right-text">湿度</span><span className="head-right-num">{integer(readEnviroment.humidity)}%</span></div>
               <div className="head-right-li">
                   <span className="head-right-text">SF6</span>
                   {readEnviroment.sf6==1?<img src={require("../../image/warn.png")} alt=""/>:<img src={require("../../image/nowarn.png")} alt=""/>}
               </div>
               <div className="head-right-li">
                   <span className="head-right-text">水位</span>
                   {readEnviroment.waterLeve==1?<img src={require("../../image/warn.png")} alt=""/>:<img src={require("../../image/nowarn.png")} alt=""/>}
               </div>
               <div className="head-right-li">
                   <span className="head-right-text">烟雾</span>
                   {readEnviroment.smoke==1?<img src={require("../../image/warn.png")} alt=""/>:<img src={require("../../image/nowarn.png")} alt=""/>}
               </div>
           </div>
       </div>
   )
}
const mapStateToProps=state=>{
    return {
        addr:state.user.addr
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        setUser: (userInfo) => dispatch(setUser(userInfo))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header)