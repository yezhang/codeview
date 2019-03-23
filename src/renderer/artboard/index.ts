import "./index.css";
import * as d3 from "d3";

function Artboard_OnDblClick() {
    var artboard = d3.select(this);
    var pos = MousePosition(this);
    // artboard.append('circle').attr('cx', pos.x).attr('cy', pos.y).attr('r', 10).style('fill', 'red');

    function started() {
        var label = d3.select(this).classed("dragging", true);

        d3.event.on("drag", dragged).on("end", ended);

        function dragged(d) {
            var x = Number(label.attr('x'));
            var y = Number(label.attr('y'));

            label.attr("x", x + d3.event.dx).attr("y", y + d3.event.dy);
        }

        function ended() {
            label.classed("dragging", false);
        }
    }

    var label = artboard.append('text')
        .attr('dominant-baseline', 'middle')
        .attr("contentEditable", true)
        .attr('x', pos.x).attr('y', pos.y)
        .style('font-size', '18px');

    label.call(d3.drag().on("start", started));

    label.on('click', function () {
        var text = d3.select(this).text();
        showEditInput(text);
    });

    label.on('mouseover', function () {
        d3.select(this).style("cursor", "text");
    });

    function showEditInput(initValue) {
        var labelX = label.attr('x');
        var labelY = label.attr('y');

        var tmpInputContainer = artboard
            .append('foreignObject').attr('x', labelX - 2).attr('y', labelY - 14); //精确调整输入框与标签的位置关系，使其完全重合。

        // var body = d3.select("body");
        // var tmpInputContainer = body.append('div').style('position', 'fixed').style('left', label).style('top', labelY - 15)
        var inputField = tmpInputContainer
            .append('xhtml:div').attr('xmlns', 'http://www.w3.org/1999/xhtml')
            .append('input')
            .attr('type', 'text')
            .style('font-family', 'Times New Roman')
            .style('font-size', '18px')
            .style('padding', '0')
            .style('transition', 'width 0.25s')
            .style('height', '20px')
            .style('line-height', '20px'); // 注意：line-height 数值要大于 font-size 的数值。如果相等，那么先输入英文，再输入中文时会导致英文向下移动

        if (initValue) {

            inputField.attr('value', initValue);
            inputField.style('width', (label.node().getBBox().width + 20) + 'px'); //size
        }

        var inputDom = inputField.node();
        inputDom.focus();
        inputDom.selectionStart = inputDom.selectionEnd = inputDom.value.length;


        /**
         * 生成真正的文本节点，
         * @param inputField 
         */
        function commitChange(inputField) {
            var inputNode = d3.select(inputField).node();

            var value = inputNode.value;

            if(value){
                // 如果字符串不是空
                label.text(value);
            }else {
                // 如果准备添加文本，但是没有添加任何文本，则直接删除标签节点
                label.remove();
            }
            
            tmpInputContainer.remove();
        }

        inputField.on('keypress', function () {
            console.log(d3.event.keyCode);

            if (d3.event.keyCode === 13) {
                console.log("您按下了回车!")
                commitChange(this);
            }
        });

        // 自动调整宽度
        // 输入内容修改时触发
        inputField.on('input', function () {
            console.log(this.value);
            inputField.style('width', (this.value.length + 1) * 7 + 'px');
        });
    }

    showEditInput('');
}

function MousePosition(svg) {
    var x = d3.event.pageX - svg.getBoundingClientRect().x
    var y = d3.event.pageY - svg.getBoundingClientRect().y

    return {
        x,
        y
    }
}

function InitArtboard() {
    var body = d3.select("body");

    var svg = body.append("svg").attr('class', 'artboard');


    svg.on("dblclick", Artboard_OnDblClick);

    // svg.on(
    //     "mouseover", function (d) {
    //         console.log('mouseover');
    //         d3.select(this).style("cursor", "text");
    //     });
    //     ,
    //     "mouseout": function(d) {
    //       d3.select(this).style("cursor", "default"); 
    //     }
    //   });
}


InitArtboard();