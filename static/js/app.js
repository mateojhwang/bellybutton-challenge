const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function (data) {
    console.log(data);
});

function init() {
    // Fetch the JSON data and console log it
    d3.json(url).then(function (data) {
        console.log(data);

        // code to populate the dropdown menu
        let dropdownMenu = d3.select("#selDataset");

        // put all otu_ids into variable named 'samplenames'
        let samplenames = data.names

        // create a for loop that will run through samplenames
        for (let i = 0; i < samplenames.length; i++) {
            dropdownMenu.append("option").text(samplenames[i])
                .property("value", samplenames[i])
        }
        // call function buildCharts on the 0th index of samplenames
        buildCharts(samplenames[0])
        buildMetadata(samplenames[0])
    });


}

// create a function for optionChanged to change data when new id is picked
function optionChanged(newsample) {
    buildCharts(newsample)
    buildMetadata(newsample)
} 

// This function is called when a dropdown menu item is selected
function buildCharts(sampleID) {
    // Fetch the JSON data and console log it
    d3.json(url).then(function (data) {
        console.log(data);

        // put the data from sample array into a variable called samples
        let samples = data.samples

        // filter and console log it
        let result = samples.filter(sampleObject => sampleObject.id == sampleID)[0]
        console.log(result)
        
        // put otu_ids data into a variable called otu_ids
        let otu_ids = result.otu_ids

        // put otu_labels data into a variable called otu_labels
        let otu_labels = result.otu_labels

        // put sample_values data into a variable called otu_sampleValues
        let otu_sampleValues = result.sample_values

        // horizontal graph of 10 OTU's
        data = [{
            x: otu_sampleValues.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(otu_id => 'OTU ' + otu_id).reverse(),
            type: "bar",
            orientation: "h",
            // creates the hovertext with information in otu_labels
            text: otu_labels.slice(0,10).reverse()
        }];

        // plot the chart from data into location "bar"
        Plotly.newPlot("bar", data);

        // bubble chart 
        data2 = [{
            x: otu_ids,
            y: otu_sampleValues,
            mode: "markers",
            marker: {
                color: otu_ids,
                size: otu_sampleValues
            },
            // creates the hovertext with information in otu_labels
            text: otu_labels,
        }];

        // layout information
        layout_bub = {
            // creates an x axis label
            xaxis: {
                title: {
                    text: 'OTU ID',
                },
            },
        }
        // plot the chart from data into location "bubble"
        Plotly.newPlot("bubble", data2, layout_bub);   

    });
};

// function to gather and place metadata in correct location on dashboard
function buildMetadata(sampleID) {

    // Fetch the JSON data and console log it
    d3.json(url).then(function (data) {
        console.log(data);

        // put the data from sample array into a variable called metadataV
        let metadataV = data.metadata

        // filter and console log it
        let result_meta = metadataV.filter(sampleObject => sampleObject.id == sampleID)[0];
        console.log(result_meta)

        // clear out previous metadata
        d3.select("#sample-metadata").html("");

        // add dictionary information containing the metadata
        Object.entries(result_meta).forEach(([k,v]) => {

            // place metadata into correct location
            d3.select("#sample-metadata").append("h5").text(`${k}: ${v}`);
        });
    });
};

// call the init() function
init();
