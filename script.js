function main() {
    d3.select("body")
        .transition()
        .duration(1000)
        .style("background-color", "#0f095e");
        
        const svg = d3.select("svg");

        const radius = 20;
        const chainLength = 200;
        const circleDistance = chainLength / 2;
  
        const data = [
          { id: 1, x: circleDistance, y: 150 },
          { id: 2, x: circleDistance * 3, y: 150 },
        ];
  
        const simulation = d3.forceSimulation(data)
          .force("link", d3.forceLink().distance(chainLength))
          .force("charge", d3.forceManyBody().strength(-100))
          .force("center", d3.forceCenter(250, 150));
  
        const link = svg.selectAll("line")
          .data([{ source: data[0], target: data[1] }])
          .join("line")
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
  
        const circle = svg.selectAll("circle")
          .data(data)
          .join("circle")
          .attr("r", radius);
  
        simulation.on("tick", () => {
          circle.attr("cx", d => d.x)
            .attr("cy", d => d.y);
  
          link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        });
  
        simulation.alpha(1).restart();
}
