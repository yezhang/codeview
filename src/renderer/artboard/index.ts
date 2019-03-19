import "./index.css";
import * as d3 from "d3";


function Artboard_OnDblClick() {
    var artboard = d3.select(this);
    var pos = MousePosition(this);
    artboard.append('circle').attr('cx', pos.x).attr('cy', pos.y).attr('r', 10).style('fill', 'red');
    
    var label = artboard.append('text')
        .attr('dominant-baseline', 'middle')
        .attr("contentEditable", true)
        .attr('x', pos.x).attr('y', pos.y)
        .on("keyup", function(d) { d.text = d3.select(this).text(); });

    var tmpInput = artboard
        .append('foreignObject').attr('x', pos.x).attr('y', pos.y - 10).attr('width', 140).attr('height', 30);
    
    tmpInput.append('xhtml:div').attr('xmlns', 'http://www.w3.org/1999/xhtml')
        .append('input')
            .attr('type', 'text')
            .style('font-size', '12px')
            .style('line-height', '12px').attr('value', '')
        .on('mouseout', function(){
            var value = d3.select(this).node().value;
            label.text(value);
            tmpInput.remove();

        });
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

    svg.on(
        "mouseover", function(d) {
            console.log('mouseover');
          d3.select(this).style("cursor", "text"); 
        });
    //     ,
    //     "mouseout": function(d) {
    //       d3.select(this).style("cursor", "default"); 
    //     }
    //   });
}


InitArtboard();