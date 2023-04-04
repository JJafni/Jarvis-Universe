function main() {
    d3.select("body")
      .transition()
      .duration(2000)
      .style("background-color", "#0f095e");
    const svg = d3.select("svg");
  
    const radius = 40;
    const chainLength = 100;
    const circleDistance = chainLength * 2;
  
    const data = [
      { id: 1, x: circleDistance, y: 300 },
      { id: 2, x: circleDistance, y: 300 },
      { id: 3, x: circleDistance, y: 300 },
    ];
  
    const simulation = d3.forceSimulation(data)
      .force("link", d3.forceLink().distance(chainLength))
      .force("charge", d3.forceManyBody().strength(-50))
      .force("center", d3.forceCenter(600, 350))
      .force("move", d3.forceRadial(200)); // add new force for movement
  
    const link = svg.selectAll("line")
      .data([{ source: data[0], target: data[1] }, { source: data[1], target: data[2] }])
      .join("line")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
      .style("stroke", "white");
  
    const circle = svg.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", radius)
      .style("stroke", "#7bb993")
      .style("stroke-width", "3px");
  
    simulation.on("tick", () => {
      circle.transition() // add transition for smoother movement
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .attr("cx", d => d.x + Math.random() * 4 - 2)
        .attr("cy", d => d.y + Math.random() * 4 - 2);
  
      link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
    });
  
    simulation.alpha(1).restart
    }
  