/**
 * Created by eugene on 12/20/16.
 */
"use strict";
const projects = {
    smokeAndFireDetector: {
        cost: 100000,
        success: 0.5,
        failure: 0.5,
        payoff: 900000
    },
    motionDetector: {
        cost: 10000,
        success: 0.8,
        failure: 0.2,
        payoff: 390000
    }
}

const certifications = {
    commercialGrade: {
        success: 0.3,
        payoff: 995000,
        used: true,
        certEV: null

    },
    residentialGrade: {
        success: 0.6,
        payoff: 795000,
        certEV: null
    },
    cost: 5000,
    failure: 0.1,
    success: function() {
        // console.log('THIS');
        // console.log(this);
        return 1 - certifications.failure
    },
    projectEV: null
}


function projectEstimatedValue({success: success, cost: cost, payoff: payoff}) {
    // let success = obts.success;
    let failure = 1 - success;
    certifications.projectEV =  (payoff * success ) + (-cost * failure);
    return (payoff * success ) + (-cost * failure);
};

projectEstimatedValue(projects.motionDetector);

// console.log(certifications.projectEV);

function certificationEV(opts) {
    let overallCertSuccess = opts.success;
    let certCost = opts.cost;
    if (opts.commercialGrade.used) {
    let {success, payoff} = opts.commercialGrade;
        // let commercialGradeSuccess = overallCertSuccess() - success;
        let obj = {
            success: success,
            cost: certCost,
            payoff: payoff
        }
        // console.log(payoff);
         console.log(projectEstimatedValue(obj));
    }
}

certificationEV(certifications);




