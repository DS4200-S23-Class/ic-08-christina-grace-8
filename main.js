
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 100, right: 50, top: 50, bottom: 50};

// for scaling data
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// BAR GRAPH
// sets frame up
const FRAME = d3.select("#bar") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");


// builds bar graph
function build_bar_graph() {
    // reads in data from file
    d3.csv("data/data.csv").then((data) => {
        // sets domains
        const X_SCALE = d3.scaleBand()
                            .domain(data.map(function (d) { return d.Category; }))
                            .range([0, VIS_WIDTH]).padding(0.5);
        const Y_SCALE = d3.scaleLinear()
                            .domain([0, d3.max(data, function (d) { return d.Value; })])
                            .range([VIS_HEIGHT, 0]);

        // add bars
        FRAME.selectAll("bar") 
            .data(data)
            .enter()  
            .append("rect")
                .attr("x", (d) => { return (X_SCALE(d.Category) + MARGINS.left)})
                .attr("y", (d) => { return (Y_SCALE(d.Value) + MARGINS.top)})
                .attr("width", X_SCALE.bandwidth())
                .attr("height", (d) => { return (VIS_HEIGHT - Y_SCALE(d.Value)); })
                .attr("fill", 'pink')
                .attr("class", "bar");

        // Add an X axis to the vis  
        FRAME.append("g") 
            .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
            .call(d3.axisBottom(X_SCALE).ticks(10)) 
                .attr("font-size", '20px'); 

        // Add a Y axis to the vis  
        FRAME.append("g") 
                .attr("transform", "translate(" + MARGINS.left + 
                    "," + (MARGINS.top) + ")") 
                .call(d3.axisLeft(Y_SCALE).ticks(10)) 
                    .attr("font-size", '20px');
        
        
    });
};
build_bar_graph();
