var BLANK = 0;
var WALL = 1;
var SNAKE = 2;
var VISITED = 3;

function Node(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
}

function BreathFirstSearch(walls, cols, rows) {
    var open = new Queue();

    var nodes = [];
    // convert the integer array (walls) to node array
    for (var i = 0; i < cols; i++) {
        nodes[i] = [];
        for (var j = 0; j < rows; j++) {
            nodes[i][j] = new Node(i, j, walls[i][j]);
        }
    }

    this.findPath = function (snakeData, start, goal) {
        var node;
        if (open) {
            open.clear();
            // reset all visited nodes
            for (var i = 0; i < cols; i++)
                for (var j = 0; j < rows; j++) {
                    node = nodes[i][j];
                    if (node.value === VISITED || node.value === SNAKE) {
                        node.previous = undefined;
                        node.value = BLANK;
                    }
                }
        }
        else {
            open = new Queue();
        }
        // consider the snake body as wall
        for (var i = 0; i < snakeData.length; i++) {
            var x = snakeData[i].x, y = snakeData[i].y;
            nodes[x][y].value = SNAKE;
        }

        // add the start node to queue
        open.enqueue(start);
        // the main loop

        while (!open.isEmpty()) {
            node = open.dequeue();
            if (node) {
                if (node.x === goal.x && node.y === goal.y) {
                    return getSolution(node);
                }
                genMove(node);
            }
            else
                break;
        }
        return null;
    }

    // generate next states by adding neighbour nodes
    function genMove(node) {
        if (node.x < cols - 1)
            addTOpen(node.x + 1, node.y, node);
        if (node.y < rows - 1)
            addToOpen(node.x, node.y + 1, node);
        if (node.x > 0)
            addToOpen(node.x - 1, node.y, node);
        if (node.y > 0)
            addToOpen(node.x, node.y - 1, node);
    }

    function addToOpen(x, y, previous) {
        var node = nodes[x][y];

        if (node.value === BLANK) {
            // mark this node as visited to avoid adding it multiple times
            node.value = VISITED;
            // store the previous node
            // so that we can backtrack to find the optimum path
            // (by using the getSolution() method)
            node.previous = previous;
            open.enqueue(node);
        }
    }

    function getSolution(p) {
        var nodes = [];
        nodes.push(p);
        while (p.previous) {
            nodes.push(p.previous);
            p = p.previous;
        }
        return nodes;
    }

}

