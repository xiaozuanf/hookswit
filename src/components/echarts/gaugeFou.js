import React from 'react';
import './gaugeThr.scss'
export default class Header extends React.Component{
    componentDidMount(){
        let canvas = document.getElementById('canvas')
        let ctx = canvas.getContext('2d')
        // 最外圈
        ctx.beginPath()
        ctx.strokeStyle = '#FE00E8'
        ctx.lineWidth = 1
        ctx.arc(136, 110, 70, 0, Math.PI * 2, false)
        ctx.stroke()
        ctx.closePath()

        // 第三圈
        ctx.beginPath()
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 1
        ctx.arc(136, 110, 54, 0, Math.PI * 2, false)
        ctx.stroke()
        ctx.closePath()
        // 第二圈
        ctx.beginPath()
        ctx.strokeStyle = '#7E7B81'
        ctx.lineWidth = 1
        ctx.arc(136, 110, 37, 0, Math.PI * 2, false)
        ctx.stroke()
        ctx.closePath()
        // 第一圈
        ctx.beginPath()
        ctx.strokeStyle = '#7E7B81'
        ctx.lineWidth = 1
        ctx.arc(136, 110, 20, 0, Math.PI * 2, false)
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.strokeStyle = '#7E7B81'
        ctx.lineWidth = 1
        const rs = 70
        // 13象限
        ctx.moveTo(136 + rs * Math.sin(45 * 2 * Math.PI / 360), 110 + rs * Math.cos(45 * 2 * Math.PI / 360))
        ctx.lineTo(136 + rs * Math.sin(225 * 2 * Math.PI / 360), 110 + rs * Math.cos(225 * 2 * Math.PI / 360))
        // 24象限
        ctx.moveTo(136 + rs * Math.sin(135 * 2 * Math.PI / 360), 110 + rs * Math.cos(135 * 2 * Math.PI / 360))
        ctx.lineTo(136 + rs * Math.sin(315 * 2 * Math.PI / 360), 110 + rs * Math.cos(315 * 2 * Math.PI / 360))
        // x轴
        ctx.moveTo(136 + rs * Math.sin(0 * 2 * Math.PI / 360), 110 + rs * Math.cos(0 * 2 * Math.PI / 360))
        ctx.lineTo(136 + rs * Math.sin(180 * 2 * Math.PI / 360), 110 + rs * Math.cos(180 * 2 * Math.PI / 360))
        ctx.stroke()
        ctx.closePath()
        this.drawArrow(ctx, 136, 110, 206, 110, 20, 6, 2, '#D0321A')
        this.drawArrow(ctx, 136, 110, 66, 110, 20, 6, 2, '#7ED321')
        this.drawArrow(ctx, 136, 110, 136, 40, 20, 6, 2, '#F8E71C')
    }
    drawArrow (ctx, fromX, fromY, toX, toY, theta, headlen, width, color) {
        var theta = theta || 30,
          headlen = headlen || 10,
          width = width || 1,
          color = color || '#000',
          angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
          angle1 = (angle + theta) * Math.PI / 180,
          angle2 = (angle - theta) * Math.PI / 180,
          topX = headlen * Math.cos(angle1),
          topY = headlen * Math.sin(angle1),
          botX = headlen * Math.cos(angle2),
          botY = headlen * Math.sin(angle2)
        ctx.save()
        ctx.beginPath()
        var arrowX, arrowY
        ctx.moveTo(fromX, fromY)
        ctx.lineTo(toX, toY)
        arrowX = toX + topX
        arrowY = toY + topY
        ctx.moveTo(arrowX, arrowY)
        ctx.lineTo(toX, toY)
        arrowX = toX + botX
        arrowY = toY + botY
        ctx.lineTo(arrowX, arrowY)
        ctx.strokeStyle = color
        ctx.lineWidth = width
        ctx.stroke()
        ctx.restore()
      }
    render() {
        return (
                <div>
                    <canvas id="canvas" width="273" height="220" ref="canvas"></canvas>
                    <div className="thenumb">
                        <p>Ia：220A</p>
                        <p>Ib：220A</p>
                        <p>Ic：220A</p>
                    </div>
                </div>
        );
    }
}