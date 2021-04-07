import React from 'react';
import './login.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setUser} from '../redux/actions/user'
import {setInfo,setToken} from '../libs/untils'
import {login,building} from '../api/left'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password:'',
        }
        this.touchNumber = this.touchNumber.bind(this);
        this.deleteNumber = this.deleteNumber.bind(this);
    }
    touchNumber(num){
        this.setState({
            password:this.state.password+=num
        })
        if (this.state.password.length >= 3) {
            login({
                usercode: 'dyxc2020',
                password: this.state.password,
                remember: true,
                syscode: 'atas-manager'
              }).then(res => {
                if (res) {
                  setToken(res.name)
                  building({dept_code: res.dept.code}).then(data => {
                    if (data) {
                      setInfo(data)
                      this.props.setUser({addr:1})
                    this.props.history.push('/')
                    }
                  })
                }
              })
            
        }
    }
    deleteNumber(){
        this.setState({
            password:this.state.password.substring(0, this.state.password.length - 1)
        })
    }
    render() {
        return (
            <div className="login">
                <div className="login-title">
                    <img src={require("../image/loginicon.png")} alt="" />
                    <span>智慧用电低电压台区管理系统</span>
                </div>
                <p className="login-text">
                    24小时在线监控&nbsp;&nbsp;·&nbsp;&nbsp;数据统计分析&nbsp;&nbsp;·&nbsp;&nbsp;隐患报警保护&nbsp;&nbsp;·&nbsp;&nbsp;科学决策和节能管理&nbsp;&nbsp;·&nbsp;&nbsp;能耗类型分析
                </p>
                <div className="login-dot">
                    <div className={["login-dot-li",this.state.password.length>=1?"active":null].join(' ')}></div>
                    <div className={["login-dot-li",this.state.password.length>=2?"active":null].join(' ')}></div>
                    <div className={["login-dot-li",this.state.password.length>=3?"active":null].join(' ')}></div>
                    <div className={["login-dot-li",this.state.password.length>=4?"active":null].join(' ')}></div>
                    <div className={["login-dot-li",this.state.password.length>=5?"active":null].join(' ')}></div>
                    <div className={["login-dot-li",this.state.password.length>=6?"active":null].join(' ')}></div>
                </div>
                <div className="login-number">
                    <div className="login-numli" onClick={()=>this.touchNumber(1)}>1</div>
                    <div className="login-numli" onClick={()=>this.touchNumber(2)}>2</div>
                    <div className="login-numli" onClick={()=>this.touchNumber(3)}>3</div>
                    <div className="login-numli" onClick={()=>this.touchNumber(4)}>4</div>
                    <div className="login-numli" onClick={()=>this.touchNumber(5)}>5</div>
                    <div className="login-numli" onClick={()=>this.touchNumber(6)}>6</div>
                    <div className="login-numli" onClick={()=>this.touchNumber(7)}>7</div>
                    <div className="login-numli" onClick={()=>this.touchNumber(8)}>8</div>
                    <div className="login-numli" onClick={()=>this.touchNumber(9)}>9</div>
                    <div className="login-numli" onClick={()=>this.touchNumber(0)}>0</div>
                    <div className="login-numli" style={{lineHeight: '121px',fontSize: '64px'}} onClick={()=>this.touchNumber('*')}>*</div>
                    <div className="login-numli" onClick={()=>this.deleteNumber()}><img src={require("../image/logindelete.png")} alt="" /></div>
                </div>
            </div>
        )
    }
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
export default connect(mapStateToProps,mapDispatchToProps)(Login)