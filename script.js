function main() {
    d3.select("body")
        .transition()
        .duration(1000)
        .style("background-color", "#0f095e");
        
    const canvas = d3.select("canvas").node();
    const context = canvas.getContext("2d");
    const radius = 50;
    let x = radius;
    let y = radius;
    let dx = 1;
    let dy = 1;

    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.stroke();

        x += dx;
        y += dy;

        if (x + radius >= canvas.width || x - radius <= 0) {
            dx = -dx;
        }
        if (y + radius >= canvas.height || y - radius <= 0) {
            dy = -dy;
        }

        requestAnimationFrame(animate);
    }

    animate();
}
