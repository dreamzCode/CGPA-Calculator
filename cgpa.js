// CALCULATE COURSE
var calculateCourse = (function() {
    
    var courseReg = function(cC, cL, sc) {
        this.cC = cC;
        this.cL = cL;
        this.sc = sc;
    };
    
    
    var data = {
        
        unitPoint: [],
        unitScore: [],
        points: [],
        totals: 0,
        totalCourseLoad: 0
        
    }
    
    courseReg.prototype.getScore = function() {
        var perScore;
        if (this.sc === 'A') {
            perScore = 5;
        } else if(this.sc === 'B') {
            perScore = 4;
        } else if(this.sc === 'C') {
            perScore = 3;
        } else if(this.sc === 'D') {
            perScore = 2;
        } else if(this.sc === 'E') {
            perScore = 1;
        } else if(this.sc === 'F') {
            perScore = 0;
        }
        data.points.push(this.cL * perScore);
    };
    
     
    var currentGPA = function() {
        
        return (data.totals / data.totalCourseLoad).toFixed(2);
    };
    
    
    return {
        
        addCourse: function(cc,cl,sc) {
            var unitCourse, totals;
               unitCourse  = new  courseReg(cc,cl,sc);
               data.unitPoint.push(unitCourse.cL);
               data.unitScore.push(unitCourse.sc);
               unitCourse.getScore();
               data.totals  = data.points.reduce(function(prev, cur) {
                    return prev + cur;
                });
               data.totalCourseLoad = data.unitPoint.reduce(function(prev, cur) {
                   return prev + cur;
               });
            
            
            //console.log(unitCourse);
            return unitCourse;
        },
        
        getGPA: function() {
        
        return currentGPA();
        },
        
        testing: function() {
            
            console.log(data);
            
        }
                    
    
    }
    
    
    
    
    
    
})();

// DISPLAY COURSE
var displayCourse = (function () {
    
    var Domstrings = {

        code: '.course-code',
        load: '.credit-load',
        result: '.result',
        submitBtn: '.add-btn',
        courseContainer: '.course-container'
    }
    
    
    
    return {
        
        getInput: function() {
            
            
               return {
                   
                    code: document.querySelector(Domstrings.code).value,
                    load: parseFloat(document.querySelector(Domstrings.load).value),
                    score: document.querySelector(Domstrings.result).value
               } ;

           },
        
        addListCourse: function(obj) {
            var html, newCourse, element;
            
            element = Domstrings.courseContainer;
            
            html = '<div class="item clearfix" id="income-1"> <div class="item__description">%code%</div><div class="right clearfix"><div class="item__value">%score%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            
            newCourse = html.replace('%code%', obj.cC);
            newCourse = newCourse.replace('%score%', obj.sc);
            
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newCourse);
            console.log(newCourse);
        },
        
        clearFields: function() {
            var fields, arrFields;
            
            fields = document.querySelectorAll(Domstrings.code + ', ' + Domstrings.load + ', ' + Domstrings.result);
            
            
            arrFields = Array.prototype.slice.call(fields);
            
            arrFields.forEach(function(current, index, array) {
               
                current.value = "";
            });
        },
        
        getDomstrings: function() {
            return Domstrings;
        }
            
        
    }
        
    
    
    
    
    
})();


// COURSE CONTROLLER
var ctrlCourse = (function(calcCourse, showCourse) {
    var input, DOM, inputValues;
    
    function setupEventListener() {
        document.querySelector(DOM.submitBtn).addEventListener('click', ctrlAddCourse);
    };
    
     DOM = showCourse.getDomstrings();
    
    function ctrlAddCourse () {
        
        // 1. Get the filed input data
        input = showCourse.getInput()
        // 2. Add the course to the calculate course
        inputValues = calcCourse.addCourse(input.code, input.load, input.score);
        
        // 3. Add the course to the UI
        
        showCourse.addListCourse(inputValues);
        
        // Clear the fields
        showCourse.clearFields();
        
        // 5. Calculate the course
        gp = calcCourse.getGPA();
        document.querySelector('.cgpa-value').innerHTML = gp;
        calcCourse.testing();
        // 6. Display the cgpa on the UI
    }
    
    
    
    return {
        
        init: function() {
            console.log('Application has started');
            setupEventListener();
        }
    }
    
    
})(calculateCourse, displayCourse);




ctrlCourse.init();