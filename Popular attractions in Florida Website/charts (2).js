document.addEventListener('DOMContentLoaded', function () {
    generateCharts();
});

function generateCharts() {
    generateBeachExpensesChart();
    generateAverageBeachExpensesChart();
    generateMagicKingdomAttendanceChart();
    generateUniversalOrlandoAttendanceChart();
    generateSeaWorldAttendanceChart();
    generateLegolandAttendanceChart();
    generatePopulationDistributionChart();
    generateLandAreaDistributionChart();
}

function generateBeachExpensesChart() {
    const beachData = {
        labels: ['Marco Island', 'Sanibel Island', 'Key West', 'Delray Beach', 'Fort Myers Beach', 'Islamorada', 'Anna Maria Island', 'Key Largo', 'Sarasota', 'St. Pete Beach', 'Miami Beach', 'Palm Beach', 'Marathon', 'Fort Lauderdale', 'Pompano Beach', 'Pensacola Beach', 'Clearwater Beach', 'Panama City Beach', 'St. Augustine', 'Daytona Beach'],
        datasets: [{
            label: 'Expenses (USD)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: [302, 287, 254, 253, 214, 198, 197, 184, 183, 181, 178, 164, 162, 152, 147, 123, 116, 78, 71, 64]
        }]
    };

    const beachOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    const ctx = document.getElementById('beachExpensesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: beachData,
        options: beachOptions
    });
}

function generateAverageBeachExpensesChart() {
    const averageBeachExpensesData = {
        labels: ['Sunscreen', 'Water', 'Beer', 'Ice Cream', 'Lunch', 'Facility Fee'],
        datasets: [{
            label: 'Average Expense (USD)',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', // Red
                'rgba(54, 162, 235, 0.2)', // Blue
                'rgba(255, 206, 86, 0.2)', // Orange
                'rgba(75, 192, 192, 0.2)', // Teal
                'rgba(255, 140, 0, 0.2)', // Dark orange
                'rgba(153, 102, 255, 0.2)' // Purple
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)', // Red
                'rgba(54, 162, 235, 1)', // Blue
                'rgba(255, 206, 86, 1)', // Orange
                'rgba(75, 192, 192, 1)', // Teal
                'rgba(255, 140, 0, 1)', // Dark orange
                'rgba(153, 102, 255, 1)' // Purple
            ],
            borderWidth: 1,
            data: [
                9.02, // Average Sunscreen expense
                1.83, // Average Water expense
                4.62, // Average Beer expense
                2.48, // Average Ice Cream expense
                25.61, // Average Lunch expense
                16.22 // Average Facility Fee expense
            ]
        }]
    };

    const averageBeachExpensesOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    const ctx = document.getElementById('averageBeachExpensesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: averageBeachExpensesData,
        options: averageBeachExpensesOptions
    });
}

function generateMagicKingdomAttendanceChart() {
    const magicKingdomAttendanceData = {
        labels: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Magic Kingdom Attendance (Millions)',
            data: [17.23, 16.97, 17.14, 17.54, 18.59, 19.33, 20.49, 20.40, 20.45, 20.86, 20.96, 6.94, 12.69, 17.13],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    const magicKingdomAttendanceOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    const ctx = document.getElementById('magicKingdomAttendanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: magicKingdomAttendanceData,
        options: magicKingdomAttendanceOptions
    });
}

function generateUniversalOrlandoAttendanceChart() {
    const universalOrlandoAttendanceData = {
        labels: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Universal Studios Orlando Attendance (Millions)',
            data: [5.53, 5.93, 6.04, 6.20, 7.06, 8.26, 9.59, 10, 10.20, 10.71, 10.92, 4.10, 8.99, 10.75],
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
        }]
    };

    const universalOrlandoAttendanceOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    const ctx = document.getElementById('universalOrlandoAttendanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: universalOrlandoAttendanceData,
        options: universalOrlandoAttendanceOptions
    });
}

function generateSeaWorldAttendanceChart() {
    const seaworldAttendanceData = {
        labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'SeaWorld Attendance (Thousands)',
            data: [22433, 23631, 24391, 23391, 22399, 22471, 22000, 20798, 22582, 22624, 6373, 20203, 21939],
            backgroundColor: 'rgba(99, 132, 132, 0.5)',
            borderColor: 'rgba(99, 132, 132, 1)',
            borderWidth: 1
        }]
    };

    const seaworldAttendanceOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    const ctx = document.getElementById('seaworldAttendanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: seaworldAttendanceData,
        options: seaworldAttendanceOptions
    });
}

function generateLegolandAttendanceChart() {
    const legolandAttendanceData = {
        labels: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [{
            label: 'Legoland Worldwide Attendance (Millions)',
            data: [7.90, 10.50, 11.50, 12.70, 12.70, 12.90, 15.30, 15.60, 15.70, 5, 9.40, 15.80],
            backgroundColor: 'rgba(255, 165, 0, 0.5)',
            borderColor: 'rgba(255, 165, 0, 1)',
            borderWidth: 1
        }]
    };

    const legolandAttendanceOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    const ctx = document.getElementById('legolandAttendanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: legolandAttendanceData,
        options: legolandAttendanceOptions
    });
}

function generatePopulationDistributionChart() {
    const populationDistributionData = {
        labels: ['Jacksonville', 'Miami', 'Orlando', 'Tampa', 'St. Petersburg', 'Fort Lauderdale', 'Hialeah', 'Cape Coral', 'Tallahassee', 'Port St. Lucie'],
        datasets: [{
            label: 'Population Distribution (%)',
            data: [28.4, 13.2, 11.5, 7.7, 5.9, 5.8, 5.5, 6.1, 6.7, 5.2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', // Red
                'rgba(54, 162, 235, 0.2)', // Blue
                'rgba(255, 206, 86, 0.2)', // Orange
                'rgba(75, 192, 192, 0.2)', // Teal
                'rgba(255, 140, 0, 0.2)', // Dark orange
                'rgba(153, 102, 255, 0.2)', // Purple
                'rgba(204, 0, 0, 0.2)', // Dark red
                'rgba(0, 153, 0, 0.2)', // Green
                'rgba(128, 0, 128, 0.2)', // Purple
                'rgba(0, 0, 255, 0.2)' // Blue
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)', // Red
                'rgba(54, 162, 235, 1)', // Blue
                'rgba(255, 206, 86, 1)', // Orange
                'rgba(75, 192, 192, 1)', // Teal
                'rgba(255, 140, 0, 1)', // Dark orange
                'rgba(153, 102, 255, 1)', // Purple
                'rgba(204, 0, 0, 1)', // Dark red
                'rgba(0, 153, 0, 1)', // Green
                'rgba(128, 0, 128, 1)', // Purple
                'rgba(0, 0, 255, 1)' // Blue
            ],
            borderWidth: 1
        }]
    };

    const populationDistributionOptions = {
        // Add any additional options you might need
    };

    const ctx = document.getElementById('piechart1').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: populationDistributionData,
        options: populationDistributionOptions
    });
}

function generateLandAreaDistributionChart() {
    const landAreaDistributionData = {
        labels: ['Jacksonville', 'Miami', 'Orlando', 'Tampa', 'St. Petersburg', 'Fort Lauderdale', 'Hialeah', 'Cape Coral', 'Tallahassee', 'Port St. Lucie'],
        datasets: [{
            label: 'Land Area Distribution (%)',
            data: [51.5, 13.2, 11.5, 7.7, 5.9, 5.8, 5.5, 2.5, 2.4, 1.5],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', // Red
                'rgba(54, 162, 235, 0.2)', // Blue
                'rgba(255, 206, 86, 0.2)', // Orange
                'rgba(75, 192, 192, 0.2)', // Teal
                'rgba(255, 140, 0, 0.2)', // Dark orange
                'rgba(153, 102, 255, 0.2)', // Purple
                'rgba(204, 0, 0, 0.2)', // Dark red
                'rgba(0, 153, 0, 0.2)', // Green
                'rgba(128, 0, 128, 0.2)', // Purple
                'rgba(0, 0, 255, 0.2)' // Blue
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)', // Red
                'rgba(54, 162, 235, 1)', // Blue
                'rgba(255, 206, 86, 1)', // Orange
                'rgba(75, 192, 192, 1)', // Teal
                'rgba(255, 140, 0, 1)', // Dark orange
                'rgba(153, 102, 255, 1)', // Purple
                'rgba(204, 0, 0, 1)', // Dark red
                'rgba(0, 153, 0, 1)', // Green
                'rgba(128, 0, 128, 1)', // Purple
                'rgba(0, 0, 255, 1)' // Blue
            ],
            borderWidth: 1
        }]
    };

    const landAreaDistributionOptions = {
        // Add any additional options you might need
    };

    const ctx = document.getElementById('piechart2').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: landAreaDistributionData,
        options: landAreaDistributionOptions
    });
}
