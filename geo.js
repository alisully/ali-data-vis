
const body = d3.select("body");

const svg = body.append("svg")
            .attr("width", 1000)
            .attr("height", 700)
            .style("border", "1px solid white")
            .attr("class", "left")
            .attr("class", "column")
            .attr("class", "container")


d3.json("Road_Area.geojson").then(data => {

    console.log(data.features);

    const projection = d3.geoMercator().scale(500000).center([-78.4867, 38.0483]);
    const pathGenerator = d3.geoPath().projection(projection)

    const roadPaths = svg.selectAll(".road-path")
            .data(data.features)
            .join("path")
            .attr("class", "road-path")
            .attr("d", pathGenerator)
            .style("fill", "none")
            .style("stroke", "grey")
            .style("opacity", .6)


    })

d3.json("Planning_Neighborhood_Area.geojson").then(data => {

    console.log(data.features);

    const projection = d3.geoMercator().scale(500000).center([-78.4867, 38.0483]);
    const pathGenerator = d3.geoPath().projection(projection)

    const neighborhood = svg.selectAll(".neighborhood")
            .data(data.features)
            .join("path")
            .attr("class", "neighborhood")
            .attr("d", pathGenerator)
            .style("fill", "none")
            .style("stroke", "grey")
            .style("opacity", .2)
    
    })

d3.json("Bicycle_Lane_Lines.json").then( (data) => {

    console.log(data.features);

    const projection = d3.geoMercator().scale(500000).center([-78.4867, 38.0483]);
    const pathGenerator = d3.geoPath().projection(projection)
    const bikePaths = svg.selectAll(".bike-path")
            .data(data.features)
            .join("path")
            .attr("class", "bike-path")
            .attr("d", pathGenerator)
            .style("fill", "none")
            .style("stroke-width", 5)
            .style("stroke", d=>d.properties.FacilityStatus=='PROPOSED' ? "#bc5090" : "#ffa600")  
            .on("mouseover",function() {
                d3.select(this).style("opacity", .5)
                })
            .on("mouseout", function() {
                d3.select(this).style("opacity", 1)
                    })
    
         let complexTip = d3.select("body").append("div")
            .attr("id", "complex-tooltip")
            .style("position", "absolute")
            .style("font-family", "Roboto")
            .style("background-color", "white")
            .style("padding", "10px")
            .style("border", "2px solid grey")
            .style("opacity", 0)
         

        
        let ctFacilityStatus = complexTip.append("div")
                            .text("Facility status: ")


        let ctFacilityStatusSpan = ctFacilityStatus.append("span").style("font-weight", 600)
        
        let ctStreetName = complexTip.append("div")
                            .text("Street name: ")


        let ctStreetNameSpan = ctStreetName.append("span").style("font-weight", 600)
            
        bikePaths.on("mouseover", function() {
            let thisData = d3.select(this).data()[0]
            ctFacilityStatus.text("Facility status: " + thisData.properties.FacilityStatus)
            ctStreetNameSpan.text(thisData.properties.RoadSegment)
            complexTip.style("opacity", 1)
            complexTip.style("color", "#003f5c")
            d3.select(this).style("opacity", .4)
        })

        bikePaths.on("mouseout", function() {
            complexTip.style("opacity", 0)
            d3.select(this).style("opacity", 1)
        })

        bikePaths.on("mousemove", function(event) {
            complexTip.style("left", d3.pointer(event)[0] + 'px')
                    .style("top", d3.pointer(event)[1]+300+"px")
                    .style("pointer-events", "none")
        })


    
})








