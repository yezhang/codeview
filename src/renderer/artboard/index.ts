import "./index.css";
import * as d3 from "d3";
import * as utils from './utils.ts';

let currentFocusedInput = null;

// 提交当前文本
let commitCurrentInput = null;

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
        .attr('class', 'artboart-text')
        .attr('dominant-baseline', 'middle')
        .attr("contentEditable", true)
        .attr('x', pos.x).attr('y', pos.y)
        .style('font-size', '18px');

    label.call(d3.drag().on("start", started));

    label.on('click', function () {
        var text = d3.select(this).text();
        showEditInput(text);
    });

    // label.on('mouseover', function () {
    //     d3.select(this).style("cursor", "text");
    // });

    function showEditInput(initValue) {
        var labelX = label.attr('x');
        var labelY = label.attr('y');

        // var tmpInputContainer = artboard
        //     .append('foreignObject').attr('x', labelX - 2).attr('y', labelY - 14); //精确调整输入框与标签的位置关系，使其完全重合。

        var body = d3.select("body");
        var tmpInputContainer = body.append('div')
            .attr('class', 'nodeinput-container')
            .style('position', 'fixed')
            .style('border', 'solid 1px gray')
            .style('padding', '3px 6px')
            .style('left', `${labelX - 7}px`)
            .style('top', `${labelY - 16}px`)
            .style('font-size', '18px')
            .style('height', '20px');
        var inputField = tmpInputContainer
            .append('span')
            .attr('class', 'nodeinput single-line')
            .style('display', 'inline-block')
            .style('font-family', 'Times New Roman')
            .style('font-size', '18px')
            .style('height', '20px')
            .style('line-height', '20px')
            .attr('contenteditable', 'true');
        // var inputField = tmpInputContainer
        //     .append('xhtml:div').attr('xmlns', 'http://www.w3.org/1999/xhtml')
        //     .append('input')
        //     .attr('type', 'text')
        //     .style('font-family', 'Times New Roman')
        //     .style('font-size', '18px')
        //     .style('padding', '0')
        //     .style('transition', 'width 0.25s')
        //     .style('height', '20px')
        //     .style('line-height', '20px'); // 注意：line-height 数值要大于 font-size 的数值。如果相等，那么先输入英文，再输入中文时会导致英文向下移动

        var inputDom = inputField.node();

        if (initValue) {
            // inputField.attr('value', initValue);
            inputDom.textContent = initValue;
            // inputField.style('width', (label.node().getBBox().width + 20) + 'px'); //size
        }


        inputDom.focus();

        // 正确放置光标到文本的最后
        utils.placeCaretAtEnd(inputDom);
        // inputDom.selectionStart = inputDom.selectionEnd = inputDom.textContent.length;

        // 存储到全局变量中
        currentFocusedInput = inputDom;

        /**
         * 生成真正的文本节点，
         * @param inputField 
         */
        function commitChange(e, inputDOM) {

            var inputNode = inputDOM;

            var value = inputNode.textContent;

            if (value) {
                // 如果字符串不是空
                label.text(value);
            } else {
                // 如果准备添加文本，但是没有添加任何文本，则直接删除标签节点
                label.remove();
            }

            tmpInputContainer.remove();
        }

        commitCurrentInput = commitChange;

        inputField.on('keydown', function () {

            // 回车键/Tab键
            //  
            if ((d3.event.key === 'Enter' && d3.event.metaKey) || d3.event.key === 'Tab') {
                console.log('OK');
                commitChange(d3.event, this);
            }

            if (d3.event.keyCode === 9) {
                console.log(d3.event);
            }
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


}


InitArtboard();