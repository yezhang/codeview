import ELK from 'elkjs';

// 回调函数定义
type OnGraphUpdatedCB = (info: any) => void;


// 整个图中的全部节点计数
let nodeCount = 1;

// 整个图中全部边界的计数
let edgeCount = 1;

let globalGraphUpdated: OnGraphUpdatedCB;

/**
 * const graph = {
    id: "root",
    properties: { "elk.direction": "DOWN" },
    children: [
        { id: "n1", width: 10, height: 10 },
        { id: "n2", width: 10, height: 10 }
    ],
    edges: [{
        id: "e1", sources: ["n1"], targets: ["n2"]
    }]
};
 */
const graph = {
    id: "root",
    properties: { "elk.direction": "DOWN" },
    children: [],
    edges: [{
        id: "e1", sources: ["n1"], targets: ["n2"]
    }]
};

interface ChildNode {
    id: string,
    width: number,
    height: number
}

function AddChild(content: string, width: number, height: number) : string {
    var node: ChildNode = {
        id: '',
        width: 0,
        height: 0
    }

    node.id = (nodeCount++) + content;
    node.width = width;
    node.height = height;

    graph.children.push(node);

    return node.id
}

function AddEdge(srcNodeId: string, destNodeId: string) {
    var edge = {
        id: '',
        sources: [],
        targets: []
    }
    edge.id = String(edgeCount);
    edge.sources.push(srcNodeId);
    edge.targets.push(destNodeId);

    graph.edges.push(edge);
}


function RegisterCallback(callback) {

}


// with web worker
const elk = new ELK({
    workerUrl: './node_modules/elkjs/lib/elk-worker.min.js'
});

elk.layout(graph)
    .then(console.log);