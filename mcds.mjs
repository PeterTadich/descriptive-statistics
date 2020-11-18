//mcds = matrix computation descriptive statistics

//ECMAScript module

/*
to do:
   - fix matrix_transpose_statistics() in dm_deviation()
   - 'percentiles()' needs checking for when n = 12 see 'ex19_p34.js'
*/

//helper (absolute)
function abs(scr){
    return scr.map((cur, idx, scr)=>([Math.abs(scr[idx])]))
}

//helper (pow)
function pow(scr,exponent){
    return scr.map((cur, idx, scr)=>([Math.pow(scr[idx],exponent)]))
}

//ref: /LFD/PLA.js
function printDesignMatrix(a){
    //[m,n] = getDimensions(a);
    var m; var n;
    [m,n] = [a.length,a[0].length];
    console.log("[m,n] = [" + m + "," + n + "]");
    var str = "";
    for(var i=0;i<m;i=i+1){
        for(var j=0;j<n;j=j+1){
            if(j === (n-1)) str = str + a[i][j].toFixed(4);
            else str = str + a[i][j].toFixed(4) + ", ";
        }
        if(i < (m-1)) str = str + "\n";
    }
    console.log(str);
    return(str);
}

//ref: /LFD/PLA.js
function printVector(b){
    //[m,n] = getDimensions(b);
    var m; var n;
    [m,n] = [b.length,b[0].length];
    var vectorType = 'col';
    if(typeof(n) === 'undefined'){
        vectorType = 'row';
        n = m;
        m = 1;
    }
    
    switch(vectorType){
        case 'col':
            console.log("column vector [m,n] = [" + m + "," + n + "]");
            var str = "";
            for(var i=0;i<m;i=i+1){
                if(i === (m-1)) str = str + b[i][0].toFixed(4) + "\n";
                else str = str + b[i][0].toFixed(4) + ", ";
            }
            break;
        case 'row':
            console.log("row vector [m,n] = [" + m + "," + n + "]");
            var str = "";
            for(var i=0;i<n;i=i+1){
                if(i === (n-1)) str = str + b[i].toFixed(4) + "\n";
                else str = str + b[i].toFixed(4) + ", ";
            }
            break;
        default:
            console.log("WARNING: unknown vector type.");
            break;
    }
    console.log(str);
    return(str);
}


//ref: matrixAlgebra.js
function matrix_transpose_statistics(A,std){
	var m = A.length;    //rows
	var n = A[0].length; //columns
	
	var B = undefined_matrix_statistics(n,m);
	
	for(var i=0;i<m;i=i+1){
		for(var j=0;j<n;j=j+1){
			if(typeof std === 'undefined') B[j][i] = [A[i][j]]; //<-- IMPORTANT: every row becomes a column vector
            else B[j][i] = A[i][j];
		}
    }
	
	return B;
}

//ref: matrixAlgebra.js
function undefined_matrix_statistics(m,n){
	var A = new Array(m);
	for(var i=0;i<A.length;i=i+1){
		A[i] = new Array(n);
	}
	return A;
}

//   - min
/*
//column vector
var x = [[0.0],[1.0],[2.0],[3.0],[4.0],[5.0],[6.0],[7.0],[8.0],[9.0],[10.0]];
console.log("min: " + x.reduce(min));
//design matrix
console.log("min: " + dm_min(x));
*/
//ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
function min(acc, cur, idx, scr){
    return Math.min(acc, scr[idx][0]);
}
function dm_min(A){
    var A = matrix_transpose_statistics(A);
    
    var m; var n;
    [m,n] = [A.length,A[0].length];
    //console.log("[m,n] = [" + m + "," + n + "]");
    
    var smallest = [];
    for(var i=0;i<m;i=i+1){
        smallest.push(A[i].reduce(min));
    }
    
    return smallest;
}

//   - max
/*
var x = [[0.0],[1.0],[2.0],[3.0],[4.0],[5.0],[6.0],[7.0],[8.0],[9.0],[10.0]];
console.log("max: " + x.reduce(max));
//design matrix
console.log("max: " + dm_max(x));
*/
//ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
function max(acc, cur, idx, scr){
    return Math.max(acc, scr[idx][0]);
}
function dm_max(A){
    var A = matrix_transpose_statistics(A);
    
    var m; var n;
    [m,n] = [A.length,A[0].length];
    //console.log("[m,n] = [" + m + "," + n + "]");
    
    var largest = [];
    for(var i=0;i<m;i=i+1){
        largest.push(A[i].reduce(max));
    }
    
    return largest;
}

//   - summation
/*
var x = [[0.0],[1.0],[2.0],[3.0],[4.0],[5.0],[6.0],[7.0],[8.0],[9.0],[10.0]];
var initialValue = 0.0;
var total = x.reduce(summation, initialValue);
console.log("total: " + total);
//design matrix
console.log("total: " + dm_summation(x));
*/
//ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
function summation(acc, cur, idx, scr){
    return(acc + scr[idx][0]);
}
function dm_summation(A){
    var A = matrix_transpose_statistics(A);
    
    var m; var n;
    [m,n] = [A.length,A[0].length];
    //console.log("[m,n] = [" + m + "," + n + "]");
    
    var total = [];
    for(var i=0;i<m;i=i+1){
        total.push(A[i].reduce(summation, 0.0)); //initialValue = 0.0, force idx to start at 0
    }
    
    return total;
}

//   - count
/*
var x = [[0.0],[1.0],[2.0],[3.0],[4.0],[5.0],[6.0],[7.0],[8.0],[9.0],[10.0]];
console.log("count: " + count(x));
//design matrix
console.log("count: " + dm_count(x));
*/
function count(a){
    return a.length;
}
function dm_count(A){
    var A = matrix_transpose_statistics(A);
    
    var m; var n;
    [m,n] = [A.length,A[0].length];
    //console.log("[m,n] = [" + m + "," + n + "]");
    
    var tally = [];
    for(var i=0;i<m;i=i+1){
        tally.push(count(A[i]));
    }
    return tally;
}

/*
//test n = 14 (page 9)
var xp = percentiles(ex1p4p9,[0.25,0.5,0.75,0.81]);
console.log(ex1p4p9); //check 'ex1p4p9' is NOT sorted
console.log(xp);
//test n = 7 (page 9)
ex1p4p9.sort((a,b)=>(a-b)); //take the lower 7
var lower7 = ex1p4p9.slice(0,7);
var xp = percentiles(lower7,[0.25,0.5,0.75,0.81]);
console.log(xp);

var brown = [
    [80.0000],
    [85.0000],
    [80.0000],
    [87.0000],
    [68.0000],
    [75.0000],
    [75.0000],
    [83.0000],
    [81.0000]
];
var xp_check = percentiles(brown,[0.25,0.5,0.75]);
console.log(xp_check);
*/
//ref: boxPlot.html
function percentiles(c,p){ //c - column vector, p - percentiles
    var debug = 0;
    
    var np; var xp = []; var idx; var A = []; var d;
    
    //count
    var n = c.length;
    
    //copy by value
    for(var i=0;i<n;i=i+1){
        A[i] = c[i];
    }
    //var A = c.slice(0);
    
    //sort
    A.sort((a,b)=>(a-b));
    
    //even increment on percentiles
    /*
    var p;
    for(var i=1;i<=n;i=i+1){
        p = (i-0.5)/n;
        np = n*p;
        if(np%1 != 0){ //if np is not an integer
            idx = (np + 0.5 - 1);
            d = A[idx];
            //console.log("np not int.: xp[" + idx + "] = " + d);
            xp.push(d);
        } else { //if np is an integer
            idx = np;
            d = (A[idx - 1] + A[(idx + 1 - 1)])/2.0;
            //console.log("np is int.: xp[" + idx + "] = " + d);
            xp.push(d);
        }
        console.log("p: " + p.toFixed(2) + ", np: " + np + ", index: " + idx + ", data point: " + d);
    }
    console.log(xp);
    */
    //extract the required percentiles
    //var p = [0.25,0.5,0.75];
    //method as to page 8 Into Statistics
    for(var i=0;i<p.length;i=i+1){
        np = n*p[i];
        if(np%1 != 0){ //if np is not an integer
            idx = (np + 0.5 - 1);
            idx = (idx - Math.floor(idx)) > 0.5 ? Math.round(idx) : Math.floor(idx);
            //d = A[idx];
            d = A[idx][0];
            if(debug) console.log("np not int.: xp[" + idx + "] = " + d);
            xp.push(d);
        } else { //if np is an integer
            idx = np;
            //d = (A[idx - 1] + A[(idx + 1 - 1)])/2.0;
            d = (A[idx - 1][0] + A[(idx + 1 - 1)][0])/2.0;
            if(debug) console.log("np is int.: xp[" + idx + "] = " + d);
            xp.push(d);
        }
        if(debug) console.log("p: " + p[i] + ", np: " + np + ", index: " + idx + ", data point: " + d);
    }
    
    if(debug) console.log(xp);
    return(xp);
}
function dm_percentiles(A,p){
    var A = matrix_transpose_statistics(A);
    
    var m; var n;
    [m,n] = [A.length,A[0].length];
    //console.log("[m,n] = [" + m + "," + n + "]");
    
    var xp = [];
    for(var i=0;i<m;i=i+1){
        xp.push(percentiles(A[i],p));
    }
    return xp;
}

function summary_statistics(c){ //c - column vector
    var q1; var q2; var q3;
    var p = [0.25,0.5,0.75];
    [q1,q2,q3] = percentiles(c,p);
    
    //interquartile range
    var iqr = q3 - q1;
    console.log("   - interquartile range: " + iqr.toFixed(2));
    
    //mild outliers
    var A = [(q1 - 1.5*iqr),(q3 + 1.5*iqr)];
    console.log("   - mild outliers (inner fences): [" + A[0].toFixed(2) + "," + A[1].toFixed(2) + "]");
    //extreme outliers
    var B = [(q1 - 3.0*iqr),(q3 + 3.0*iqr)];
    console.log("   - extreme outliers (outer fences): [" + B[0].toFixed(2) + "," + B[1].toFixed(2) + "]");
    
    //count
    var n = c.length;
    
    //copy by value
    var c_copy = [];
    for(var i=0;i<n;i=i+1){
        c_copy[i] = c[i];
    }
    //var c_copy = c.slice(0);
    
    //sort
    c_copy.sort((a,b)=>(a-b));
    
    //find mild outliers
    var mol =[]; var mou = []; var non_outliers = []; var outliers = [];
    c_copy.forEach((d,i)=>{
        if(d < A[0]) mol.push(d);
        else if(d > A[1]) mou.push(d);
        else non_outliers.push(d);
    });
    outliers = mol.concat(mou);
    
    return(
        {
            q1:q1,
            median:q2,
            q3:q3,
            non_outliers:non_outliers,
            outliers:outliers
        }
    );
}
function dm_summary_statistics(A){
    var A = matrix_transpose_statistics(A);
    
    var m; var n;
    [m,n] = [A.length,A[0].length];
    //console.log("[m,n] = [" + m + "," + n + "]");
    
    var summary = [];
    for(var i=0;i<m;i=i+1){
        summary.push(summary_statistics(A[i]));
    }
    return summary;
}

//measure of central tendency
//   - mean
/*
var x = [[0.0],[1.0],[2.0],[3.0],[4.0],[5.0],[6.0],[7.0],[8.0],[9.0],[10.0]];
console.log("mean: " + mean(x));
//design matrix
console.log("mean: " + dm_mean(x));
*/
function mean(scr){
    return(scr.reduce(summation, 0.0)/scr.length); //initialValue = 0.0, force idx to start at 0
}
function dm_mean(A){
    /*
    //check
    var average = [];
    var total = dm_summation(A);
    var tally = dm_count(A);
    total.forEach((d,i)=>average.push(total[i]/tally[i]));
    return average;
    */
    var A = matrix_transpose_statistics(A);
    
    var m; var n;
    [m,n] = [A.length,A[0].length];
    //console.log("[m,n] = [" + m + "," + n + "]");
    
    var average = [];
    for(var i=0;i<m;i=i+1){
        average.push(mean(A[i]));
    }
    return average;
}

//   - mode

//   - median

//measure of spread (dispersion)
//   - range
/*
var x = [[0.0],[1.0],[2.0],[3.0],[4.0],[5.0],[6.0],[7.0],[8.0],[9.0],[10.0]];
console.log("range: " + range(x));
//design matrix
console.log("range: " + dm_range(x));
*/
function range(scr){
    return(scr.reduce(max) - scr.reduce(min));
}
function dm_range(A){
    var A = matrix_transpose_statistics(A);
    
    var m; var n;
    [m,n] = [A.length,A[0].length];
    //console.log("[m,n] = [" + m + "," + n + "]");
    
    var spread = [];
    for(var i=0;i<m;i=i+1){
        spread.push(range(A[i]));
    }
    return spread;
}

//   - deviation
/*
var x = [[0.0],[1.0],[2.0],[3.0],[4.0],[5.0],[6.0],[7.0],[8.0],[9.0],[10.0]];
console.log("deviation: " + deviation(x));
//design matrix
var difference = dm_deviation(x);
console.log("deviation:");
printDesignMatrix(difference);
*/
function deviation(scr){
    var average = mean(scr);
    var difference = scr.map((cur, idx, scr)=>(scr[idx][0] - average));
    return difference;
}
function dm_deviation(A){
    var A = matrix_transpose_statistics(A);
    
    var m; var n;
    [m,n] = [A.length,A[0].length];
    //console.log("[m,n] = [" + m + "," + n + "]");
    
    var difference = [];
    for(var i=0;i<m;i=i+1){
        difference.push(deviation(A[i]));
    }
    
    return matrix_transpose_statistics(difference,1);
}

//   - mean deviation
/*
var x = [[0.0],[1.0],[2.0],[3.0],[4.0],[5.0],[6.0],[7.0],[8.0],[9.0],[10.0]];
console.log("mean deviation: " + mean_deviation(x));
//design matrix
console.log("mean deviation: " + dm_mean_deviation(x));
*/
function mean_deviation(scr){
    var absolute_difference = abs(deviation(scr));
    /*
    //check
    var initialValue = 0;
    var total = absolute_difference.reduce((acc, cur, idx, scr)=>{console.log("idx: " + idx + ", " + scr[idx][0]); return(acc + cur[0])},initialValue);
    console.log("mean deviation (check): " + total/scr.length);
    */
    return(mean(absolute_difference));
}
function dm_mean_deviation(A){
    var A = matrix_transpose_statistics(A);
    
    var m; var n;
    [m,n] = [A.length,A[0].length];
    //console.log("[m,n] = [" + m + "," + n + "]");
    
    var average_deviation = [];
    for(var i=0;i<m;i=i+1){
        average_deviation.push(mean_deviation(A[i]));
    }
    
    return average_deviation;
}

//   - sample variance
/*
var x = [[0.0],[1.0],[2.0],[3.0],[4.0],[5.0],[6.0],[7.0],[8.0],[9.0],[10.0]];
console.log("sample variance: " + sample_variance(x));
//design matrix
console.log("sample variance: " + dm_sample_variance(x));
*/
function sample_variance(scr){
    var squared = pow(deviation(scr),2.0);
    var variance = squared.reduce(summation, 0.0)/(squared.length - 1); //initialValue = 0.0, force idx to start at 0
    return(variance);
}
function dm_sample_variance(A){
    var A = matrix_transpose_statistics(A);
    
    var m; var n;
    [m,n] = [A.length,A[0].length];
    //console.log("[m,n] = [" + m + "," + n + "]");
    
    var example_variance = [];
    for(var i=0;i<m;i=i+1){
        example_variance.push(sample_variance(A[i]));
    }
    
    return example_variance;
}

//   - sample standard deviation
/*
var x = [[0.0],[1.0],[2.0],[3.0],[4.0],[5.0],[6.0],[7.0],[8.0],[9.0],[10.0]];
console.log("sample standard deviation: " + sample_standard_deviation(x));
//design matrix
console.log("sample standard deviation: " + dm_sample_standard_deviation(x));
*/
function sample_standard_deviation(scr){
    return(Math.pow(sample_variance(scr),0.5));
}
function dm_sample_standard_deviation(A){
    var A = matrix_transpose_statistics(A);
    
    var m; var n;
    [m,n] = [A.length,A[0].length];
    //console.log("[m,n] = [" + m + "," + n + "]");
    
    var example_standard_deviation = [];
    for(var i=0;i<m;i=i+1){
        example_standard_deviation.push(sample_standard_deviation(A[i]));
    }
    
    return example_standard_deviation;
}

export {
    abs,
    pow,
    printDesignMatrix,
    printVector,
    min,
    dm_min,
    max,
    dm_max,
    summation,
    dm_summation,
    count,
    dm_count,
    percentiles,
    dm_percentiles,
    summary_statistics,
    dm_summary_statistics,
    mean,
    dm_mean,
    range,
    dm_range,
    deviation,
    dm_deviation,
    mean_deviation,
    dm_mean_deviation,
    sample_variance,
    dm_sample_variance,
    sample_standard_deviation,
    dm_sample_standard_deviation
};