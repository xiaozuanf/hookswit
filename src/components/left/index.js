import React,{useState,useEffect} from 'react'
import './index.scss'
import Electricity from '../echarts/electricity';
import {connect} from 'react-redux'
import store from '../../redux/store'
import {setUser} from '../../redux/actions/user'
import Powers from '../echarts/powers';
import GaugeOne from '../echarts/gaugeOne';
import GaugeTwo from '../echarts/gaugeTwo';
import GaugeThr from '../echarts/gaugeThr';
import GaugeFou from '../echarts/gaugeFou';
import GaugeFiv from '../echarts/gaugeFiv';
import GaugeSix from '../echarts/gaugeSix';
import {getTrans} from '../../libs/untils'
import {readLastPowerQuality,readElectricNear,readMultiPowerNear,readMulityData} from '../../api/left'
function Header(props){
    const [powerQua, setPowerQua] = useState({})
    const [eledata, setEledata] = useState({})
    const [powerData, setPowerData] = useState({})
    const [activeGon, setActiveGon] = useState(1)
    const [threeData, setThreeData] = useState([])
    const [powerSave, setPowerSave] = useState({})
    useEffect(() => {
        readLastPowerQualityFun()
        readElectricNearFun()
        readMultiPowerNearFun()
        readMulityDataFun()
        console.log('componentDidUpdate： 更新usernmae')
    },[props]);
    function reserveds(value){
        if (value && value !== 0) {
            let num = value.toFixed(1)
            return num
        } else {
            return value
        }
    }
    function readLastPowerQualityFun(){
        readLastPowerQuality({}).then(data=>{
            if(data){
                setPowerQua(data)
            }
        })
    }
    function readElectricNearFun(){
        readElectricNear({transformerId: getTrans().id}).then(data=>{
            if(data){
                setEledata(data)
            }
        })
    }
    function readMulityDataFun(){
        readMulityData({}).then(data=>{
            if(data){
                setThreeData(data)
            }
        })
    }
    function readMultiPowerNearFun(){
        readMultiPowerNear({}).then(data=>{
            if(data){
                setPowerData({
                    time:data.time,
                    data:data.pt,
                    title:'合相有功'
                })
                setPowerSave(data)
            }
        })
    }
    function changeGon(m){
        let title,datas,time=powerData.time
        if(m==1){
            title='合相有功'
            datas=powerSave.pt
        }
        if(m==2){
            title='合相无功'
            datas=powerSave.qt
        }
        if(m==3){
            title='视在功率'
            datas=powerSave.st
        }
        setActiveGon(m)
        setPowerData({
            data:datas,
            title:title,
            time:time,
        })
    }
    return(
        <div className="leftInside clearfix">
            <div className="left-serise">
                <div className="left-serise-li clearfix">
                    <div className="left-serise-one">相电压（V）Ua</div>
                    <div className="left-serise-num">{reserveds(powerQua.ua)}</div>
                    <div className="left-serise-two">Ub</div>
                    <div className="left-serise-num">{reserveds(powerQua.ub)}</div>
                    <div className="left-serise-two">Uc</div>
                    <div className="left-serise-num">{reserveds(powerQua.uc)}</div>
                    <div className="left-serise-three">含相有功（PT）</div>
                    <div className="left-serise-num left-serise-num2">{reserveds(powerQua.pt)}KW</div>
                </div>
                <div className="left-serise-li clearfix">
                    <div className="left-serise-one">线电压（V）Uab</div>
                    <div className="left-serise-num">{reserveds(powerQua.uab)}</div>
                    <div className="left-serise-two">Ubc</div>
                    <div className="left-serise-num">{reserveds(powerQua.ubc)}</div>
                    <div className="left-serise-two">Uca</div>
                    <div className="left-serise-num">{reserveds(powerQua.uca)}</div>
                    <div className="left-serise-three">含相无功（QT）</div>
                    <div className="left-serise-num left-serise-num2">{reserveds(powerQua.qt)}KW</div>
                </div>
                <div className="left-serise-li clearfix">
                    <div className="left-serise-one">电&nbsp;&nbsp;&nbsp;流（A）Ia</div>
                    <div className="left-serise-num">{reserveds(powerQua.ia)}</div>
                    <div className="left-serise-two">Ib</div>
                    <div className="left-serise-num">{reserveds(powerQua.ib)}</div>
                    <div className="left-serise-two">Ic</div>
                    <div className="left-serise-num">{reserveds(powerQua.ic)}</div>
                    <div className="left-serise-three">频&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;率（HZ）</div>
                    <div className="left-serise-num left-serise-num2">{reserveds(powerQua.frqt)}KW</div>
                </div>
            </div>
            <div className="left-echarts">
                <div className="left-echarts-div1 clearfix">
                    <div className="electricity"><Electricity data={eledata}></Electricity></div>
                    <div className="left-echarts-change clearfix">
                        <div className={[activeGon==1?"active":null].join(' ')} onClick={()=>changeGon(1)}>合相有功</div>
                        <div className={[activeGon==2?"active":null].join(' ')} onClick={()=>changeGon(2)}>合相无功</div>
                        <div className={[activeGon==3?"active":null].join(' ')} onClick={()=>changeGon(3)}>视在功率</div>
                    </div>
                    <div className="powers"><Powers data={powerData}></Powers></div>
                </div>
                <div className="left-echarts-div2 clearfix">
                    <div>
                        <GaugeOne></GaugeOne>
                        <p className="text">台区线损率</p>
                    </div>
                    <div>
                        <GaugeTwo></GaugeTwo>
                        <p className="text">负荷组成类型</p>
                    </div>
                    <div>
                        <GaugeThr data={threeData}></GaugeThr>
                    </div>
                    <div>
                        <GaugeFou></GaugeFou>
                        <p className="text">三相电压不平衡矢量图</p>
                    </div>
                    <div>
                        <GaugeFiv></GaugeFiv>
                        <p className="text">三相电流不平衡矢量图</p>
                    </div>
                    <div>
                        <GaugeSix></GaugeSix>
                        <p className="text">负载率</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps=state=>{//每当store state发生变化时，就被调用。接收整个store state，并且返回一个该组件所需要的数据对象
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